/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk'),
    api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient(),
    uuid = require('uuid');

module.exports = api;

/**
 * Create a new product
 */
api.post('/product', function (request) {
    'use strict';
    var params = {
        TableName: 'ProductCatalog',
        Item: {
            Id: uuid.v4(),
            Title: request.body.title,
            ProductCategory: request.body.productCategory
        }
    };
    // return dynamo result directly
    return dynamoDb.put(params).promise();
}, {success: 201}); // Return HTTP status 201 - Created when successful

/**
 * Get product for {id}
 */
api.get('/product/{id}', function (request) {
    'use strict';
    var id, params;
    // Get the id from the pathParams
    id = request.pathParams.id;
    params = {
        TableName: 'ProductCatalog',
        Key: {
            Id: id
        }
    };

    // post-process dynamo result before returning
    return dynamoDb.get(params).promise().then(function (response) {
        return response.Item;
    });
});

/**
 * Delete product with {id}
 */
api.delete('/product/{id}', function (request) {
    'use strict';
    var id, params;
    // Get the id from the pathParams
    id = request.pathParams.id;
    params = {
        TableName: 'ProductCatalog',
        Key: {
            Id: id
        }
    };
    // return a completely different result when dynamo completes
    return dynamoDb.delete(params).promise()
        .then(function () {
            return 'Deleted product with id "' + id + '"';
        });
}, {success: {contentType: 'text/plain'}});

