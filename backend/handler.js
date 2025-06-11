"use strict";

const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

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

module.exports.crearClase = async (event) => {
    const datos = JSON.parse(event.body);
    const id = Date.now().toString();

    const nuevaClase = {
        id,
        ...datos
    };

    await dynamo.put({
        TableName: "Clases",
        Item: nuevaClase
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Clase creada", clase: nuevaClase })
    };
};

module.exports.getClases = async () => {
    try {
        const resultado = await dynamo.scan({ TableName: "Clases" }).promise();

        return {
        statusCode: 200,
        body: JSON.stringify(resultado.Items),
        };
    } catch (error) {
        console.error("Error al obtener clases:", error);
        return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error al obtener las clases" }),
        };
    }
};

module.exports.getClaseById = async (event) => {
    const { id } = event.pathParameters;

    try {
        const resultado = await dynamo.get({
        TableName: "Clases",
        Key: { id }
        }).promise();

        if (!resultado.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: "Clase no encontrada" }),
        };
        }

        return {
        statusCode: 200,
        body: JSON.stringify(resultado.Item),
        };
    } catch (error) {
        console.error("Error al obtener la clase:", error);
        return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error al obtener la clase" }),
        };
    }
};
