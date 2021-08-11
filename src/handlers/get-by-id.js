var AWS = require("aws-sdk");

const tableName = process.env.TABLE;

var dynamodb = new AWS.DynamoDB();
if(tableName == 'localTable') {
    dynamodb = new AWS.DynamoDB({
        endpoint: 'http://172.17.0.2:8000',
        region: 'us-west-2'
    });
}

exports.getByIdHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);
  
    const id = event.pathParameters.id;

    var params = {
        TableName : tableName,
        Key: { id: {S: id} },
    };
    
    const data = await dynamodb.getItem(params).promise();
    
    const item = data.Item;
  
    const response = {
        statusCode: 200,
        body: JSON.stringify(item)
    };
  
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    
    return response;
}
