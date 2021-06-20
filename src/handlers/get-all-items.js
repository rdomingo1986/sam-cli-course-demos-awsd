const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
    endpoint: 'http://172.17.0.2:8000'
});

const tableName = process.env.TABLE;

exports.getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    var params = {
        TableName : tableName
    };

    const data = await dynamodb.scan(params).promise();
    
    const items = data.Items;

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;
}
