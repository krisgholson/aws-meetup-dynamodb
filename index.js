/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk'),
    api = new ApiBuilder(),
    docClient = new AWS.DynamoDB.DocumentClient(),
    uuid = require('uuid');

module.exports = api;

/**
 * Create a new product
 */
api.post('/product', function (request) {
    'use strict';
    var product, params;

    product = request.body;
    product.Id = uuid.v4();

    params = {
        TableName: 'ProductCatalog',
        Item: product
    };
    // return my own custom message
    return docClient.put(params).promise()
        .then(function () {
            return {
                id: product.Id,
                message: 'Successfully created product.'
            };
        });
}, {success: 201}); // Return HTTP status 201 - Created when successful

// /**
//  * Update an new product
//  */
// api.put('/product/{id}', function (request) {
//     'use strict';
//     var product, params;
//
//     product = request.body;
//     product.Id = request.pathParams.id;
//
//     // YEAR is a reserved word .. http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
//     // thus the need to substitute it using ExpressionAttributeName
//     params = {
//         TableName: 'ProductCatalog',
//         Key: {Id: product.Id},
//         UpdateExpression: 'set #Year = :Year, Color = :Color, Price = :Price',
//         ExpressionAttributeNames: {'#Year' : 'Year'},
//         ExpressionAttributeValues: {
//             ':Year' : product.Year,
//             ':Color' : product.Color,
//             ':Price' : product.Price
//         }
//     };
//
//     return docClient.update(params).promise()
//         .then(function () {
//             return {
//                 id: product.Id,
//                 message: 'Successfully updated product.'
//             };
//         });
// });

/**
 * If I am just going to trust the client blindly - I could do the update using docClient.put
 *
 */
api.put('/product/{id}', function (request) {
    'use strict';
    var product, params;

    product = request.body;
    product.Id = request.pathParams.id;

    params = {
        TableName: 'ProductCatalog',
        Item: product
    };

    return docClient.put(params).promise()
        .then(function () {
            return {
                id: product.Id,
                message: 'Successfully updated product.'
            };
        });
});

/**
 * Get all products in table
 */
api.get('/products', function (request) {
    'use strict';
    var params;
    // Get the id from the pathParams
    params = {
        TableName: 'ProductCatalog'
    };

    // post-process dynamo result before returning
    return docClient.scan(params).promise();
});

/**
 * Find products by category
 */
api.get('/products/search', function (request) {
    'use strict';
    var params, category;

    category = request.queryString.category;

    // Think about what your users will frequently need to query by
    // and define those as Global Secondary Indexes
    params = {
        TableName: 'ProductCatalog',
        IndexName: 'CategoryIndex',
        KeyConditionExpression: 'ProductCategory = :category',
        ExpressionAttributeValues: {
            ':category': category
        }
    };

    return docClient.query(params).promise();
});

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

    // return the dynamodb result - no mods
    return docClient.get(params).promise();
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
    return docClient.delete(params).promise()
        .then(function () {
            return 'Deleted product with id "' + id + '"';
        });
}, {success: {contentType: 'text/plain'}});

