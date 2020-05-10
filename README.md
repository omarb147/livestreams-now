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

To deploy to the server run the commmand

> note that the --stage variable should only be used when deploying to prod, and if you don't have the variable `STACK_NAME = {{MY_STACK_NAME}}` in your .env file the deployment will default to the dev stage.

```
serverless deploy --aws-profile {{AWS_PROFILE_NAME}}
```

to deploy a single function use the

```
serverless deploy --aws-profile {{AWS_PROFILE_NAME}}  --f {{function-name}}
```
