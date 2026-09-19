import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";

const Projects = lazy(() => import("./pages/projects"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <div className="container">

      <h1>React Hooks & Router Practical</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Suspense fallback={<div className="card"><h3>Loading page...</h3></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;