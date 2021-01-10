import AWS from 'aws-sdk';
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();


async function changeNotiEmail(event, context) {

    const { id } = event.pathParameters;
    const { email } = event.body;

    const params = {
      TableName: process.env.EMAILS_TABLE_NAME,
      Key: { id },
      UpdateExpression: 'set email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
      ReturnValues: 'ALL_NEW',
    };

    let updatedNotiEmail;

    try {
      const result = await dynamodb.update(params).promise();
      updatedNotiEmail = result.Attributes;
    } catch(error) {
      console.error(error);
      throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedNotiEmail),
      };
}

export const handler = commonMiddleware(changeNotiEmail);