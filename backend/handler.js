"use strict";

const clasesMock = [
    {
        id: "1",
        titulo: "Introducción a AWS Lambda",
        descripcion: "Clase simulada desde Lambda",
        tecnologias: ["AWS Lambda", "API Gateway"],
        enlaceMeetup: "https://meetup.com/evento1"
    },
    {
        id: "2",
        titulo: "Bases de datos con DynamoDB",
        descripcion: "Otra clase interesante",
        tecnologias: ["DynamoDB", "AWS SDK"],
        enlaceMeetup: "https://meetup.com/evento2"
    }
    ];

module.exports.getClases = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify(clasesMock),
    };
};

module.exports.getClaseById = async (event) => {
    const { id } = event.pathParameters;
    const clase = clasesMock.find(c => c.id === id);

    if (!clase) {
        return {
        statusCode: 404,
        body: JSON.stringify({ mensaje: "Clase no encontrada" })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(clase)
    };
};

module.exports.crearClase = async (event) => {
    const body = JSON.parse(event.body);

    const nuevaClase = {
        id: Date.now().toString(),
        titulo: body.titulo,
        descripcion: body.descripcion,
        tecnologias: body.tecnologias,
        enlaceMeetup: body.enlaceMeetup
    };

    console.log("Clase recibida:", nuevaClase);

    return {
        statusCode: 201,
        body: JSON.stringify({
        mensaje: "Clase creada exitosamente",
        clase: nuevaClase
        })
    };
};
