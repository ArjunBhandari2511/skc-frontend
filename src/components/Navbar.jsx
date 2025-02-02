import React from "react";
import { Menubar } from "primereact/menubar";
import { Link } from "react-router-dom";
import "../pages/css/Navbar.css";

const Navbar = () => {
  const start = (
    <Link to="/" className="navbar-logo">
      <h2>AIPy.</h2>
    </Link>
  );

  const end = (
    <div className="nav-links">
      <Link to="/code" className="nav-item">Playground</Link>
      <Link to="/api" className="nav-item">API</Link>
      <Link to="/assignments" className="nav-item">Assignments</Link>
    </div>
  );

  return <Menubar className="custom-navbar" start={start} end={end} />;
};

export default Navbar;
