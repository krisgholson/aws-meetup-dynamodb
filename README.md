Doing Some CRUD with DynamoDB
=============================

https://docs.google.com/presentation/d/1Q899QIJoVIr5VrJLtEyyBsxFBKz08tAFXxMbHQWNEEI/edit?usp=sharing

Credit
------
The sample code in index.js was derived from the excellent example project at https://github.com/claudiajs/example-projects.

Prerequisites
-------------
1. Download DynamoDB local
2. Run it local using $ ./run-dynamodb-local.sh
3. Install Node Version Manager
4. $ nvm install v4.3.2 (version that AWS Lambda uses .. http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html) 
5. $ nvm use v4.3.2
6. $ npm install
7. $ npm run create (after initial upload .. $ npm run update)

List Tables
-----------
aws dynamodb list-tables --endpoint-url http://localhost:8000

Create Tables
-------------
* aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-product-catalog.json --endpoint-url http://localhost:8000
* aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-forum.json --endpoint-url http://localhost:8000
* aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-thread.json --endpoint-url http://localhost:8000
* aws dynamodb create-table --cli-input-json file://src/main/resources/create-table-reply.json --endpoint-url http://localhost:8000

Update Tables
-------------
* aws dynamodb update-table --cli-input-json file://src/main/resources/update-table-product-catalog-add-category-index.json --endpoint-url http://localhost:8000

Delete Tables
-------------
* aws dynamodb delete-table --table-name ProductCatalog --endpoint-url http://localhost:8000
* aws dynamodb delete-table --table-name Forum --endpoint-url http://localhost:8000
* aws dynamodb delete-table --table-name Thread --endpoint-url http://localhost:8000
* aws dynamodb delete-table --table-name Reply --endpoint-url http://localhost:8000

Load Table Data
---------------
* aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/ProductCatalog.json --endpoint-url http://localhost:8000
* aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/Forum.json --endpoint-url http://localhost:8000
* aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/Thread.json --endpoint-url http://localhost:8000
* aws dynamodb batch-write-item --request-items file://src/main/resources/sampledata/Reply.json --endpoint-url http://localhost:8000


List Data
---------
* aws dynamodb scan --table-name ProductCatalog --endpoint-url http://localhost:8000
* aws dynamodb scan --table-name Forum --endpoint-url http://localhost:8000
* aws dynamodb scan --table-name Thread --endpoint-url http://localhost:8000
* aws dynamodb scan --table-name Reply --endpoint-url http://localhost:8000

List all products using the API
-------------------------------

curl <API-URL>/products

Search products by category (uses the index added above from update-table-product-catalog-add-category-index.json)

curl <API-URL>/products/search?category=Book
curl <API-URL>/products/search?category=Bicycle


Create a product using the API
------------------------------

curl -H "Content-Type: application/json" -X POST --data @src/main/resources/sampledata/ProductCatalog-odyssey.json <API-URL>/product

Read the newly added product using the API
------------------------------------------

curl <API-URL>/product/{id}


Update the product using the API
--------------------------------

curl -H "Content-Type: application/json" -X PUT --data @src/main/resources/sampledata/ProductCatalog-odyssey-updated.json <API-URL>/product/{id}


Delete the new product using the API
------------------------------------

curl -X DELETE <API-URL>/product/{id}








