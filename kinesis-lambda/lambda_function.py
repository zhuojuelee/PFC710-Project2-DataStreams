import ast
import base64
import boto3
import json
import logging

from botocore.config import Config

clientConfig = Config(
    region_name='us-east-1'
)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('pod-data')
pk = 'projectId'
sk = 'dataId'

MESSAGES = {
    'NO_RECORD': 'No Records found in kinesis stream',
    'NO_KINESIS_ENTRY': 'Kinesis data not found in record',
    'NO_DATA': 'Data entry not found',
    'SUCCESS': 'Successfully pushed kinesis record to DynamoDB'
}

def lambda_handler(event, context):
    if 'Records' not in event:
        logging.error(MESSAGES['NO_RECORD'])
        return {
            'statusCode': 500,
            'body': MESSAGES['NO_RECORD']
        }

    for record in event['Records']:
        if 'kinesis' not in record:
            logging.error(MESSAGES['NO_KINESIS_ENTRY'])
            return {
                'statusCode': 500,
                'body': MESSAGES['NO_KINESIS_ENTRY']
            }
        
        if 'data' not in record['kinesis']:
            logging.error(MESSAGES['NO_DATA'])
            return {
                'statusCode': 500,
                'body': MESSAGES['NO_DATA']
            }

        base64EncodedPayload = record['kinesis']['data'] # base64 encoded
        decodedBytes = base64.b64decode(base64EncodedPayload)
        decodedString = decodedBytes.decode('utf-8')
        jsonPayload = ast.literal_eval(decodedString)

        print('Received data:')
        print(jsonPayload)

        itemToPut = {
            "pk": 'todoApp',
            "sk": f'todoApp#{jsonPayload["timestamp"]}',
            "podData": json.dumps(jsonPayload['podData'])
        }

        try:
            table.put_item(
                Item=itemToPut
            )
        except:
            print('Failed to put item into DynamoDB')
            return {
                'statusCode': 500,
                'body': 'Failed to put item into DynamoDB'
            }

    logging.info(MESSAGES['SUCCESS'])
    return {
        'statusCode': 200,
        'body': 'Processed successfully'
    }