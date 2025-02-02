import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./css/Code.css";

const Code = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("apiKey");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const questions = [
    "What is Python?",
    "How do you declare a variable in Python?",
    "What is a Python function?",
    "What are Python libraries?",
    "What is Python used for?",
  ];

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const formatResponse = (text) => {
    let formattedText = text.replace(
      /\*\*\*(.*?)\*\*\*/g,
      '<strong class="heading">$1</strong>'
    );
    formattedText = formattedText.replace(/\n/g, "<br />");
    return formattedText;
  };

  const renderCodeEditor = (code) => {
    return (
      <CodeMirror
        value={code}
        options={{
          mode: "javascript", // or another mode like 'python'
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {}}
      />
    );
  };

  const fetchAnswer = async (question) => {
    try {
      const response = await fetch("https://skc-backend-pm9w.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      const answerType = data.answerType; // Assuming answerType can be 'code' or 'text'
      
      if (answerType === "code") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: renderCodeEditor(data.answer) },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: formatResponse(data.answer) },
        ]);
      }
    } catch (error) {
      console.error("Error fetching the answer:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        { sender: "user", text: input },
        { sender: "bot", text: "..." },
      ]);
      setInput(""); // Clear the input field

      try {
        const response = await fetch("https://skc-backend-pm9w.onrender.com/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });
        const data = await response.json();
        const answerType = data.answerType;

        if (answerType === "code") {
          setMessages([
            ...messages,
            { sender: "user", text: input },
            { sender: "bot", text: renderCodeEditor(data.answer) },
          ]);
        } else {
          setMessages([
            ...messages,
            { sender: "user", text: input },
            { sender: "bot", text: formatResponse(data.answer) },
          ]);
        }
      } catch (error) {
        console.error("Error fetching the answer:", error);
      }
    }
  };

  const name = localStorage.getItem("username")


  return (
    <>
      <Navbar />
      <div className="user"> Welcome {name} !</div>
      <div className="code-container">
        <div className="questions-container">
          {questions.map((question, index) => (
            <button
              key={index}
              className="question-button"
              onClick={() => {
                setMessages([
                  ...messages,
                  { sender: "user", text: question },
                  { sender: "bot", text: "..." },
                ]);
                fetchAnswer(question);
              }}
            >
              {question}
            </button>
          ))}
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {typeof msg.text === "string" ? (
                  <p dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Ask something..."
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Code;
