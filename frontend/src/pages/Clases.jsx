import React from "react";
import { Link } from "react-router-dom";

const clasesSimuladas = [
    {
        id: "1",
        titulo: "Introducción a AWS Lambda",
        descripcion: "Veremos cómo crear funciones sin servidor y conectarlas con API Gateway.",
        tecnologias: ["AWS Lambda", "API Gateway", "Node.js"]
    },
    {
        id: "2",
        titulo: "Bases de datos con DynamoDB",
        descripcion: "Aprende a diseñar tablas NoSQL y consultar datos con SDKs.",
        tecnologias: ["DynamoDB", "AWS SDK", "NoSQL"]
    },
    {
        id: "3",
        titulo: "Autenticación con Cognito",
        descripcion: "Implementaremos login y roles de usuario usando Amazon Cognito.",
        tecnologias: ["Cognito", "OAuth2", "React"]
    }
];

function Clases() {
    return (
        <div>
            <h1>Clases disponibles</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {clasesSimuladas.map((clase) => (
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
