import random
import time
import boto3
import json

from datetime import datetime
from botocore.config import Config

def generateK8Metrics(pods_per_node=3):
    cluster_metrics = {
        "timestamp": int(datetime.now().timestamp()),
        "podData": {
            "pod": "todoApp",
            "cpu_usage_cores": round(random.uniform(0.01, 1.0), 3),
            "memory_usage_mb": random.randint(50, 1024),
            "network_rx_bytes": random.randint(100_000, 2_000_000),
            "network_tx_bytes": random.randint(100_000, 2_000_000),
        }
    }

    return cluster_metrics


clientConfig = Config(
    region_name='us-east-1'
)
kinesisClient = boto3.client('kinesis', config=clientConfig)
streamName = 'pfc710-data-stream'
partitionKey = 'StreamData'
streamArn = 'arn:aws:kinesis:us-east-1:392175866244:stream/pfc710-data-stream'

def sendData():
    while True:
        data = generateK8Metrics()

        print(data)

        kinesisClient.put_record(
            StreamName=streamName,
            Data=json.dumps(data),
            PartitionKey=partitionKey,
            StreamARN=streamArn,
        )
        time.sleep(2)

sendData()
