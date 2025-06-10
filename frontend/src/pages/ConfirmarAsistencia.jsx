import React from "react";
import { useParams, Link } from "react-router-dom";
import clasesMock from "../services/clasesMock";

function ConfirmarAsistencia() {
    const { id } = useParams();
    const clase = clasesMock.find((c) => c.id === id);

    if (!clase) {
        return <h2>Clase no encontrada</h2>;
    }

    return (
        <div>
            <h1>🎉 ¡Asistencia confirmada!</h1>
            <p>Has confirmado tu participación en:</p>
            <h2>{clase.titulo}</h2>
            <p><strong>Descripción:</strong> {clase.descripcion}</p>
            <p><strong>Tecnologías:</strong> {clase.tecnologias.join(", ")}</p>
            <p>Gracias por participar. Nos vemos en el evento 🙌</p>
            <br />
            <Link to="/clases">← Volver a clases</Link>
        </div>
    );
}

export default ConfirmarAsistencia;
