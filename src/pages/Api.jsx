import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "primeflex/primeflex.css"; // PrimeFlex for layout
import Navbar from "../components/Navbar";

const Api = () => {
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedKey = localStorage.getItem("apiKey");
    if (storedKey) {
      navigate("/code"); // Redirect if key is already stored
    }
  }, [navigate]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("apiKey", apiKey);
      navigate("/code"); // Redirect user to Code.jsx
    } else {
      alert("Please enter a valid API key.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex align-items-center justify-content-center min-h-screen bg-cover bg-center"
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        }}
      >
        <Card className="p-5 w-25rem text-center border-round-lg shadow-6 glass-card">
          <h2 className="text-2xl font-bold text-black mb-4">Enter Your API Key</h2>
          <div className="p-fluid">
            <InputText
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="p-inputtext-lg text-center mb-3"
            />
            <Button label="Save & Continue" icon="pi pi-check" onClick={handleSaveKey} className="w-full p-button-rounded p-button-success" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Api;
