Doing Some CRUD with DynamoDB
=============================

Prerequisites
-------------
1. Download DynamoDB local
2. Run it local using $ ./run-dynamodb-local.sh
3. Install Node Version Manager
4. $ nvm install v4.3.2 (version that AWS Lambda uses .. http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html) 
5. $ nvm use v4.3.2
6. $ npm install
7. $ npm run create

List Tables
-----------
aws dynamodb list-tables --endpoint-url http://localhost:8000

Create Tables
-------------
aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-product-catalog.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-forum.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-thread.json --endpoint-url http://localhost:8000
aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-reply.json --endpoint-url http://localhost:8000

Delete Tables
-------------
aws dynamodb delete-table --table-name ProductCatalog --endpoint-url http://localhost:8000
aws dynamodb delete-table --table-name Forum --endpoint-url http://localhost:8000
aws dynamodb delete-table --table-name Thread --endpoint-url http://localhost:8000
aws dynamodb delete-table --table-name Reply --endpoint-url http://localhost:8000

Load Table Data
---------------
aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/ProductCatalog.json --endpoint-url http://localhost:8000
aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/Forum.json --endpoint-url http://localhost:8000
aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/Thread.json --endpoint-url http://localhost:8000
aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/Reply.json --endpoint-url http://localhost:8000


List Data
---------
aws dynamodb scan --table-name ProductCatalog --endpoint-url http://localhost:8000
aws dynamodb scan --table-name Forum --endpoint-url http://localhost:8000
aws dynamodb scan --table-name Thread --endpoint-url http://localhost:8000
aws dynamodb scan --table-name Reply --endpoint-url http://localhost:8000

Notes
-----
Best description of hash and range keys file:///Users/kris/AWS/DynamoDB%20Core%20Components%20-%20Amazon%20DynamoDB.htm







