# Introduction

When building using for example Bitbucket Pipelines you might find yourself in a situation where you want to deploy to multiple AWS accounts. This package allows you to easily switch to an AWS role in a different account. 

## Installation

```bash
npm install @enfo/aws-assume --save-dev
```

## Usage

Let us say you have two accounts: A and B. In your build pipelines you have AWS keys configured for deployments to account A. If you want to deploy to B you need to setup a role that the deploying account A role can assume. Then you can set it up as follows:

```json
{
  "scripts": {
    "assume:test": "npx aws-assume ACCOUNT_B_ARN_HERE"
  }
  ...
}
```

The package will print variables on the format "export AWS_ACCESS_KEY_ID=ASIA..." so in your build pipelines you have to run eval on the output. The silent flag suppresses npm script output which would otherwise ruin the command.

```bash
eval $(npm run assume:test --silent)
```

## Configuration

It takes two parameters - role ARN and session duration.

* The role ARN is mandatory and if one is not supplied an error will be thrown
* The duration is in seconds and optional, the default value is 900 seconds (15 minutes). Example:

```bash
npx aws-assume arn:aws:iam::111122223333:role/Some-Fancy-Role 1800
```
