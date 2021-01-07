import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

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

  await dynamodb.put({
    TableName: 'EmailsTable',
    Item: notiEmail,
  }).promise();


  return {
    statusCode: 200,
    body: JSON.stringify(notiEmail),
  };
}

export const handler = createNotiEmail;


