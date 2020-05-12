const middy = require("/opt/middy-wrapper");
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({
    region: 'eu-west-2'
});

const main = async (event, context) => {
    console.log('Lamba-Scheduler Hit');
    const urls = ['https://jambase.com/livestreams', 'https://discover.ticketmaster.co.uk/music/our-guide-to-finding-the-best-live-stream-gigs-49794/'];
    const params = {
        FunctionName: 'arn:aws:lambda:eu-west-2:043708065677:function:scrapper-lambda-dev-scraper-function',
        Payload: JSON.stringify({
                "queryStringParameters": {
                    "url": "https://jambase.com/livestreams"
                }
            }
        ),
        InvocationType: 'Event'
    };
    console.log('Params: ', params);
    lambda.invoke(params, function (error, data) {
        console.log('Data: ', data);
        if (error) {
            context.done('error', error);
        }
        if (data.Payload) {
            context.succeed(data.Payload)
        }
    });


}
exports.handler = middy(main);

async function invokveScraper(urls, context) {
    urls.forEach(url => {
        console.log('URL: ', url);
        const params = {
            FunctionName: 'scraper-function',
            Payload: JSON.stringify(url, null, 2)
        };
        console.log('Params: ', params);
        lambda.invoke(params, function (error, data) {
            console.log('Data: ', data);
            if (error) {
                context.done('error', error);
            }
            if (data.Payload) {
                context.succeed(data.Payload)
            }
        });
    });
}
