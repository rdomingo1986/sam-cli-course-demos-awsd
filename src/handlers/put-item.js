const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
    endpoint: 'http://172.17.0.2:8000'
});

const tableName = process.env.TABLE;

exports.putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    const body = JSON.parse(event.body)
    
    const id = body.id;
    
    const name = body.name;

    var params = {
        TableName : tableName,
        Item: { id : {S:id}, name: {S:name} }
    };

    const result = await dynamodb.putItem(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;
}
