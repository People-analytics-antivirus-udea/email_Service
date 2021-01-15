import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getNotiEmailByUni(event, context) {
  const { prefix_uni } = event.queryStringParameters;

  let emails;

  try {
    const result = await dynamodb
      .scan({
        TableName: process.env.EMAILS_TABLE_NAME,
        FilterExpression: 'u_prefix = :this_u_prefix',
        ExpressionAttributeValues : { ':this_u_prefix' : prefix_uni}
      })
      .promise();

    emails = result.Items;
  } catch (err) {
    console.error(err);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(emails),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}

export const handler = commonMiddleware(getNotiEmailByUni);
