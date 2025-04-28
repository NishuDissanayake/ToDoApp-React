import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Todo App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<UpdateTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
