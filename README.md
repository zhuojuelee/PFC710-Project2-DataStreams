# PFC710 Project 2

This project practices using AWS Kinesis to stream data to an AWS Lambda to be consumed and uploading it to DynamoDB.

## Breakdown

This repo consist of 3 parts:

- `client`: The Dashboard UI for observing the data
- `kinesis-lambda`: The code that runs the Kinesis stream and the Lambda code for consuming the stream
- `serverless-lambda`: A severless ExpressJS lambda that fetches data

## Setup

You need the following:

- `Python3`
- `NodeJS`
- `AWS CLI`

Get your AWS Credentials from the AWS console and modify your `~/.aws/credentials`

### Client

Go into the client root `cd client`:

- `yarn install`
- `yarn dev`

### Generating data for the Kinesis Stream

Make sure AWS credentials are setup correctly

Go into the kinesis stream root `cd kinesis-stream`:

- `python3 -m venv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
- `python kinesis-stream.py`

### Serverless Lambda (ExpressJS)

Make sure AWS credentials are setup correctly

Go into the server root `cd serverless-lambda`

- `yarn install`
- `yarn dev`

## Building the Lambdas

Follow the instructions below to build the Lambda and Zip it to be uploaded th AWS Lambda

### Kinesis Consumer Lambda

At the `kinesis-lambda` root, run:

- `zip -r kinesis_lambda.zip ./`

Then upload the zip file `kinesis_lambda.zip` to the AWS Lambda function

### Server Lambda

At the `serverless-lambda` root, run:

- `yarn install`
- `yarn zip`

Then upload the zip file `server-lambda.zip` to the AWS Lambda function
