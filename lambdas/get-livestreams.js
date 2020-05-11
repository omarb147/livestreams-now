
const headers = require("../utils/headers");
module.exports.handler = (event, context, callback) => {
    console.log('CAN WE WORK PLS');
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify('Getting Livestream Data'),
    }

}
