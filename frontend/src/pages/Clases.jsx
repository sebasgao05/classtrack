import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Clases = () => {
    const [clases, setClases] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerClases = async () => {
        try {
            const respuesta = await axios.get(
            "https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases"
            );
            setClases(respuesta.data);
        } catch (err) {
            console.error("Error al obtener las clases:", err);
            setError("No se pudieron cargar las clases.");
        } finally {
            setCargando(false);
        }
        };

    obtenerClases();
    }, []);

    if (cargando) return <p>Cargando clases...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
        <h2>Lista de Clases</h2>
        {clases.length === 0 ? (
            <p>No hay clases disponibles.</p>
        ) : (
            <ul>
            {clases.map((clase) => (
                <li key={clase.id}>
                <h3>{clase.titulo}</h3>
                <p>{clase.descripcion}</p>
                <strong>Tecnologías:</strong> {clase.tecnologias.join(", ")}
                <br />
                <Link to={`/clase/${clase.id}`}>Ver detalles</Link>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default Clases;
