import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getNotiEmailByUni(event, context) {
  const { prefix_uni } = event.pathParameters;

  let emails;

  try {
    const result = await dynamodb
      .scan({
        TableName: process.env.EMAILS_TABLE_NAME,
        FilterExpression: 'university = :this_university',
        ExpressionAttributeValues : { ':this_university' : prefix_uni}
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
  };
}

export const handler = commonMiddleware(getNotiEmailByUni);
