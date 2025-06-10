import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Clases from "./pages/Clases";
import ClaseDetalle from "./pages/ClaseDetalle";
import ConfirmarAsistencia from "./pages/ConfirmarAsistencia";
import AdminPanel from "./pages/AdminPanel";


function App() {
  return (
    <div className="App">
      <Router>
        <header style={{ padding: "10px", background: "#282c34", color: "white" }}>
          <h2>ClassTrack</h2>
          <nav style={{ marginTop: "10px" }}>
            <Link to="/" style={{ marginRight: "15px", color: "white" }}>Inicio</Link>
            <Link to="/clases" style={{ marginRight: "15px", color: "white" }}>Clases</Link>
            <Link to="/admin" style={{ color: "white" }}>Admin</Link>
          </nav>
        </header>

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/clase/:id" element={<ClaseDetalle />} />
            <Route path="/confirmar/:id" element={<ConfirmarAsistencia />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
