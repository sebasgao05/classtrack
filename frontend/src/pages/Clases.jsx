import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Clases = () => {
    const [clases, setClases] = useState([]);

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

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Listado de Clases</h2>
        <ul>
            {clases.map((clase) => (
            <li key={clase.id} style={{ marginBottom: "1rem" }}>
                <h3>{clase.titulo}</h3>
                <p><strong>📅 Fecha:</strong> {clase.fecha}</p>
                <p><strong>⏰ Hora:</strong> {clase.hora}</p>
                <p><strong>📍 Lugar:</strong> {clase.lugar}</p>
                <Link to={`/clase/${clase.id}`}>Ver detalles</Link>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Clases;
