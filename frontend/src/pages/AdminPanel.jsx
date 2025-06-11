import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tecnologias, setTecnologias] = useState("");
    const [enlaceMeetup, setEnlaceMeetup] = useState("");
    const [clases, setClases] = useState([]);

    // Obtener clases existentes al cargar el componente
    useEffect(() => {
        const fetchClases = async () => {
        try {
            const res = await axios.get("https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases");
            setClases(res.data);
        } catch (err) {
            console.error("Error al obtener clases:", err);
        }
        };
        fetchClases();
    }, []);

    // Eliminar clase
    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta clase?");
        if (!confirmar) return;

        try {
        await axios.delete(`https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases/${id}`);
        alert("Clase eliminada ✅");
        setClases(clases.filter((c) => c.id !== id));
        } catch (error) {
        console.error("Error al eliminar clase:", error);
        alert("Ocurrió un error al eliminar la clase ❌");
        }
    };

    // Crear clase
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
        };

        try {
        const respuesta = await axios.post(
            "https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases",
            nuevaClase
        );
        console.log("Clase creada:", respuesta);

        if (respuesta.status === 200) {
            alert("Clase creada exitosamente ✅");

            setTitulo("");
            setDescripcion("");
            setTecnologias("");
            setEnlaceMeetup("");

            setClases([...clases, respuesta.data.clase]);
        } else {
            alert("Respuesta no esperada del servidor ❌");
        }
        } catch (error) {
        console.error("Error al crear la clase:", error);
        alert("Ocurrió un error al enviar la clase ❌");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Panel de Administración</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Título:</label><br />
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Descripción:</label><br />
            <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Tecnologías (separadas por coma):</label><br />
            <input
                type="text"
                value={tecnologias}
                onChange={(e) => setTecnologias(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Enlace de Meetup:</label><br />
            <input
                type="url"
                value={enlaceMeetup}
                onChange={(e) => setEnlaceMeetup(e.target.value)}
                required
            />
            </div>
            <br />
            <button type="submit">Crear Clase</button>
        </form>

        <hr />
        <h3>Clases existentes</h3>
        <ul>
            {clases.map((clase) => (
            <li key={clase.id} style={{ marginBottom: "1rem" }}>
                <strong>{clase.titulo}</strong> - {clase.descripcion}
                <br />
                <button onClick={() => handleEliminar(clase.id)}>🗑️ Eliminar</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default AdminPanel;
