import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function deleteNotiEmailById(event, context) {
    const { id } = event.queryStringParameters;

    const params = {
      TableName: process.env.EMAILS_TABLE_NAME,
      Key: { id },
    };

    let deletedNotiEmail;

    try {
      const result = await dynamodb.delete(params).promise();
      deletedNotiEmail = result;
    } catch(error) {
      console.error(error);
      throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: 'Eliminado correctamente',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      };
}

export const handler = commonMiddleware(deleteNotiEmailById);