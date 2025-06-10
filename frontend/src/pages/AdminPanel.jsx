import React, { useState } from "react";

function AdminPanel() {
    const [clase, setClase] = useState({
        titulo: "",
        descripcion: "",
        tecnologias: "",
        enlaceMeetup: ""
    });

    const [clasesCreadas, setClasesCreadas] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClase((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaClase = {
        ...clase,
        id: Date.now().toString(),
        tecnologias: clase.tecnologias.split(",").map(t => t.trim())
        };
        setClasesCreadas((prev) => [...prev, nuevaClase]);
        setClase({ titulo: "", descripcion: "", tecnologias: "", enlaceMeetup: "" });
    };

    return (
        <div>
        <h1>Panel de Administración</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
            <div>
            <label>Título:</label><br />
            <input type="text" name="titulo" value={clase.titulo} onChange={handleChange} required />
            </div>
            <div>
            <label>Descripción:</label><br />
            <textarea name="descripcion" value={clase.descripcion} onChange={handleChange} required />
            </div>
            <div>
            <label>Tecnologías (separadas por coma):</label><br />
            <input type="text" name="tecnologias" value={clase.tecnologias} onChange={handleChange} required />
            </div>
            <div>
            <label>Enlace de Meetup:</label><br />
            <input type="url" name="enlaceMeetup" value={clase.enlaceMeetup} onChange={handleChange} required />
            </div>
            <button type="submit" style={{ marginTop: "10px" }}>Crear clase</button>
        </form>

        <h2>Clases creadas</h2>
        <ul>
            {clasesCreadas.map((c) => (
            <li key={c.id} style={{ marginBottom: "10px" }}>
                <strong>{c.titulo}</strong> – {c.descripcion}  
                <br /> Tecnologías: {c.tecnologias.join(", ")}  
                <br /> <a href={c.enlaceMeetup} target="_blank" rel="noreferrer">Meetup</a>
            </li>
            ))}
        </ul>
        </div>
    );
    }

    export default AdminPanel;
