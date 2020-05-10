const AWS = require("aws-sdk");

const client = AWS.DynamoDB.DocumentClient();

module.exports = {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
};
