import React from "react";
import { Link } from "react-router-dom";
import clasesMock from "../services/clasesMock";

function Clases() {
    return (
        <div>
            <h1>Clases disponibles</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {clasesMock.map((clase) => (
                    <li key={clase.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "15px", borderRadius: "8px" }}>
                        <h2>{clase.titulo}</h2>
                        <p>{clase.descripcion}</p>
                        <p><strong>Tecnologías:</strong> {clase.tecnologias.join(", ")}</p>
                        <Link to={`/clase/${clase.id}`}>Ver detalles</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Clases;
