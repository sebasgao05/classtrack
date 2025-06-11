import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ConfirmarAsistencia = () => {
    const { id } = useParams();
    const [clase, setClase] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerClase = async () => {
        try {
            const response = await axios.get(
            `https://<TU-ENDPOINT>.execute-api.us-east-1.amazonaws.com/dev/clases/${id}` // 🔁 Reemplaza con tu URL real
            );
            setClase(response.data);
        } catch (error) {
            console.error("Error al obtener la clase:", error);
        } finally {
            setLoading(false);
        }
        };

        obtenerClase();
    }, [id]);

    if (loading) return <p style={{ padding: "2rem" }}>Cargando clase...</p>;
    if (!clase) return <p style={{ padding: "2rem" }}>Clase no encontrada.</p>;

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Confirmar asistencia a:</h2>
        <h3>{clase.titulo}</h3>
        <p>{clase.descripcion}</p>

        <a
            href={clase.enlaceMeetup}
            target="_blank"
            rel="noopener noreferrer"
            style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "10px 20px",
            backgroundColor: "#0077b5",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px"
            }}
        >
            Confirmar asistencia en Meetup
        </a>
        </div>
    );
};

export default ConfirmarAsistencia;
