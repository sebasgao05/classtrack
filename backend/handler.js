const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Clases";

module.exports.crearClase = async (event) => {
    try {
        const datos = JSON.parse(event.body);

        const nuevaClase = {
            id: uuidv4(),
            titulo: datos.titulo,
            descripcion: datos.descripcion,
            tecnologias: datos.tecnologias,
            enlaceMeetup: datos.enlaceMeetup,
            fecha: datos.fecha,
            hora: datos.hora,
            lugar: datos.lugar
        };

        const params = {
            TableName: "Clases",
            Item: nuevaClase,
        };

        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mensaje: "Clase creada",
                clase: nuevaClase,
            }),
        };
    } catch (error) {
        console.error("Error al crear clase:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mensaje: "Error al crear clase" }),
        };
    }
};

module.exports.getClases = async () => {
    try {
        const params = {
        TableName: TABLE_NAME,
        };

        const resultado = await dynamoDb.scan(params).promise();

        return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resultado.Items),
        };
    } catch (error) {
        console.error("Error al obtener clases:", error);
        return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: "Error al obtener clases" }),
        };
    }
};

module.exports.getClaseById = async (event) => {
    try {
        const id = event.pathParameters.id;

        const params = {
        TableName: TABLE_NAME,
        Key: { id },
        };

        const resultado = await dynamoDb.get(params).promise();

        if (!resultado.Item) {
        return {
            statusCode: 404,
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ mensaje: "Clase no encontrada" }),
        };
        }

        return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resultado.Item),
        };
    } catch (error) {
        console.error("Error al obtener clase por ID:", error);
        return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: "Error al obtener clase por ID" }),
        };
    }
};

module.exports.eliminarClase = async (event) => {
    const id = event.pathParameters.id;

    console.log("Eliminando clase con ID:", id);

    const params = {
    TableName: "Clases",
    Key: { id },
    };

    try {
    await dynamoDb.delete(params).promise();

    return {
        statusCode: 200,
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: "Clase eliminada" }),
    };
    } catch (error) {
    console.error("Error al eliminar clase:", error);
    return {
        statusCode: 500,
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: "Error al eliminar clase" }),
    };
    }
};

module.exports.actualizarClase = async (event) => {
    const id = event.pathParameters.id;
    const datos = JSON.parse(event.body);

    const params = {
        TableName: "Clases",
        Key: { id },
        UpdateExpression: "set titulo = :t, descripcion = :d, tecnologias = :tec, enlaceMeetup = :e, fecha = :f, hora = :h, lugar = :l",
        ExpressionAttributeValues: {
        ":t": datos.titulo,
        ":d": datos.descripcion,
        ":tec": datos.tecnologias,
        ":e": datos.enlaceMeetup,
        ":f": datos.fecha,
        ":h": datos.hora,
        ":l": datos.lugar,
        },
        ReturnValues: "ALL_NEW",
    };

    try {
        const result = await dynamoDb.update(params).promise();
        return {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
        };
    } catch (error) {
        console.error("Error al actualizar clase:", error);
        return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error al actualizar la clase" }),
        };
    }
};
