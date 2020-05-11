const middy = require("/opt/middy-wrapper");
const headers = require("../utils/headers");

const main = async () => {
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({message: 'Livestreams Successfully Received Retrieved'})
    };
}
exports.handler = middy(main);
