# Livestreams Now Backend

> Backend for the Livestreams Now web app which provides information on upcoming and recent livestreams

## Setup

- clone the repo
- run yarn install (make sure you are running the correct version of node)
- then set up your aws and serverless

### Aws cli setup

First you need to install the AWS CLI

```
MacOS
brew install awscli

Linux/Unix
sudo pip install awscli
```

then you need to setup an AWS profile using:

```
aws configure
```

Then we need to install serverless globally

```
npm install serverless -g
```

## Running Locally

To run locally run the command line function

```
serverless invoke local --aws-profile {{AWS_PROFILE_NAME}} --function {{FUNCTION_NAME}} --path {{PATH_TO_MOCK}}
```

## Deploying to server

To deploy too the server run the commmand

> note that if you don't input a stage option it will deploy to the dev stage by default, currently we are only working with prod and dev stages

```
serverless deploy --aws-profile {{AWS_PROFILE_NAME}} --stage {{STAGE}}
```

to deploy a single function use the

```
serverless deploy --aws-profile {{AWS_PROFILE_NAME}} --stage {{STAGE}} --f {{function-name}}
```
