import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createNotiEmail(event, context) {
  const { university, email } = JSON.parse(event.body);
  const now = new Date();

  const notiEmail = {
    id: uuid(),
    university,
    email,
    createdAt: now.toISOString,
    modifiedAt: now.toISOString
  };

  try {
    await dynamodb.put({
      TableName: process.env.EMAILS_TABLE_NAME,
      Item: notiEmail,
    }).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(notiEmail),
  };
}

export const handler = commonMiddleware(createNotiEmail)


