"use strict";

const clasesMock = [
    {
        id: "1",
        titulo: "Introducción a AWS Lambda",
        descripcion: "Clases simuladas desde Lambda",
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
