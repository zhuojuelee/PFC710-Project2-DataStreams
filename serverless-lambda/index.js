	
import cors from 'cors';
import serverless from 'serverless-http';
import express from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const PORT = 8080;

// DynamoDB
const TableName = 'pod-data';
const projectId = 'todoApp';
const client = new DynamoDBClient({
  region: 'us-east-1',
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// express app setup
const app = express();

// middleware
if (process.env.ENV === 'dev') {
  app.use(cors());
}
app.use(express.json());

// routes
app.get('/', function (req, res) {
  res.send('Server is running!');
});

app.get('/podData', async (req, res) => {
  let data = {};
  const queryParams = {
    TableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": projectId
    },
    ScanIndexForward: false,
    Limit: 60
  }

  try {
    const response = await ddbDocClient.send(new QueryCommand(queryParams));
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error({ message: 'Failed to query data' });
    }

    const formattedData = response.Items.map(data => ({
      timestamp: data['sk'].split('#')[1], // Format: todoApp#1753811495
      podData: JSON.parse(data['podData']),
    }))
    data = { data: formattedData.slice(-60).reverse() };
    res.status(200).send(data);
  } catch (e) {
    data = { error: `Failed to get data: ${e.message}`, data: [] };
    res.status(500).send(data);
  }
});

if (process.env.ENV === 'dev') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
}
 
export const handler = serverless(app);
