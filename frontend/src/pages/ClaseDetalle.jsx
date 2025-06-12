import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";

function ClaseDetalle() {
    const { id } = useParams();
    const [clase, setClase] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const obtenerClase = async () => {
        try {
            const response = await axios.get(
            `https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases/${id}` 
            );
            setClase(response.data);
        } catch (error) {
            console.error("Error al obtener los detalles de la clase:", error);
        } finally {
            setLoading(false);
        }
        };

        obtenerClase();
    }, [id]);


    useEffect(() => {
        const fetchClase = async () => {
        try {
            const res = await axios.get(`https://7sfofp87oh.execute-api.us-east-1.amazonaws.com/dev/clases/${id}`);
            setClase(res.data);
        } catch (err) {
            console.error("Error al obtener detalle de la clase:", err);
        }
        };

        fetchClase();
    }, [id]);

    if (loading) return <p style={{ padding: "2rem" }}>Cargando detalles...</p>;
    if (!clase) return <p style={{ padding: "2rem" }}>Clase no encontrada.</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>{clase.titulo}</h2>
            <p><strong>📄 Descripción:</strong> {clase.descripcion}</p>
            <p><strong>📅 Fecha:</strong> {clase.fecha}</p>
            <p><strong>⏰ Hora:</strong> {clase.hora}</p>
            <p><strong>📍 Lugar:</strong> {clase.lugar}</p>
            <p><strong>💡 Tecnologías:</strong> {clase.tecnologias?.join(", ")}</p>
            <p><strong>🔗 Meetup:</strong> <a href={clase.enlaceMeetup} target="_blank" rel="noopener noreferrer">Confirmar Asistencia en MeetUp</a></p>
        </div>
    );
}

export default ClaseDetalle;
