import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tecnologias, setTecnologias] = useState("");
    const [enlaceMeetup, setEnlaceMeetup] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [lugar, setLugar] = useState("");

    const [clases, setClases] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    const limpiarFormulario = () => {
        setTitulo("");
        setDescripcion("");
        setTecnologias("");
        setEnlaceMeetup("");
        setFecha("");
        setHora("");
        setLugar("");
        setEditandoId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaClase = {
        titulo,
        descripcion,
        tecnologias: tecnologias
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0),
        enlaceMeetup,
        fecha,
        hora,
        lugar,
        };

        try {
        if (editandoId) {
            await axios.put(
            `https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases/${editandoId}`,
            nuevaClase
            );
            alert("Clase actualizada ✅");
        } else {
            await axios.post(
            "https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases",
            nuevaClase
            );
            alert("Clase creada ✅");
        }
        limpiarFormulario();
        fetchClases();
        } catch (error) {
        console.error("Error al enviar clase:", error);
        alert("❌ Ocurrió un error");
        }
    };

    const fetchClases = async () => {
        try {
        const res = await axios.get(
            "https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases"
        );
        setClases(res.data);
        } catch (err) {
        console.error("Error al obtener clases:", err);
        }
    };

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Seguro deseas eliminar?");
        if (!confirmar) return;

        try {
        await axios.delete(
            `https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases/${id}`
        );
        alert("Clase eliminada ✅");
        setClases(clases.filter((c) => c.id !== id));
        } catch (error) {
        console.error("Error al eliminar clase:", error);
        alert("❌ No se pudo eliminar");
        }
    };

    const cargarClaseParaEditar = (clase) => {
        setTitulo(clase.titulo);
        setDescripcion(clase.descripcion);
        setTecnologias(clase.tecnologias?.join(", ") || "");
        setEnlaceMeetup(clase.enlaceMeetup);
        setFecha(clase.fecha || "");
        setHora(clase.hora || "");
        setLugar(clase.lugar || "");
        setEditandoId(clase.id);
    };

    useEffect(() => {
        fetchClases();
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Panel de Administración</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Título:</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </div>
            <div>
            <label>Descripción:</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            </div>
            <div>
            <label>Tecnologías (coma):</label>
            <input type="text" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} />
            </div>
            <div>
            <label>Enlace de Meetup:</label>
            <input type="url" value={enlaceMeetup} onChange={(e) => setEnlaceMeetup(e.target.value)} />
            </div>
            <div>
            <label>Fecha:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div>
            <label>Hora:</label>
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
            </div>
            <div>
            <label>Lugar:</label>
            <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)} />
            </div>
            <br />
            <button type="submit">{editandoId ? "Actualizar Clase" : "Crear Clase"}</button>
        </form>

        <hr />

        <h3>Clases existentes</h3>
        <ul>
            {clases.map((clase) => (
            <li key={clase.id} style={{ marginBottom: "1rem" }}>
                <strong>{clase.titulo}</strong> - {clase.descripcion}
                <br />
                📅 {clase.fecha} ⏰ {clase.hora} 📍 {clase.lugar}
                <br />
                <button onClick={() => cargarClaseParaEditar(clase)}>✏️ Editar</button>{" "}
                <button onClick={() => handleEliminar(clase.id)}>🗑️ Eliminar</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default AdminPanel;
