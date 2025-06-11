import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tecnologias, setTecnologias] = useState("");
    const [enlaceMeetup, setEnlaceMeetup] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaClase = {
        titulo,
        descripcion,
        tecnologias: tecnologias.split(",").map(t => t.trim()),
        enlaceMeetup
        };

        try {
        const response = await axios.post(
            "https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases", 
            nuevaClase
        );
        console.log("Clase creada:", response.data.clase);
        alert("Clase creada exitosamente ✅");

        // Limpia el formulario
        setTitulo("");
        setDescripcion("");
        setTecnologias("");
        setEnlaceMeetup("");
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
        </div>
    );
};

export default AdminPanel;
