import React from "react";
import { useParams, Link } from "react-router-dom";
import clasesMock from "../services/clasesMock";

function ClaseDetalle() {
    const { id } = useParams();
    const clase = clasesMock.find((c) => c.id === id);

    if (!clase) {
        return <h2>Clase no encontrada</h2>;
    }

    return (
        <div>
        <h1>{clase.titulo}</h1>
        <p>{clase.descripcion}</p>
        <p><strong>Tecnologías:</strong> {clase.tecnologias.join(", ")}</p>
        <a href={clase.enlaceMeetup} target="_blank" rel="noreferrer">
            Confirmar asistencia (Meetup)
        </a>
        <br /><br />
        <Link to="/clases">← Volver a la lista de clases</Link>
        </div>
    );
}

export default ClaseDetalle;
