import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Clases = () => {
    const [clases, setClases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerClases = async () => {
        try {
            const response = await axios.get("https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases");
            setClases(response.data);
        } catch (error) {
            console.error("Error al obtener las clases:", error);
        } finally {
            setLoading(false);
        }
        };

        obtenerClases();
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Lista de Clases</h2>
        {loading ? (
            <p>Cargando clases...</p>
        ) : clases.length === 0 ? (
            <p>No hay clases disponibles.</p>
        ) : (
            <ul>
            {clases.map((clase) => (
                <li key={clase.id} style={{ marginBottom: "1rem" }}>
                <h3>{clase.titulo}</h3>
                <p>{clase.descripcion}</p>
                <p><strong>Tecnologías:</strong> {clase.tecnologias.join(", ")}</p>
                <Link to={`/clase/${clase.id}`}>Ver detalles</Link>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default Clases;
