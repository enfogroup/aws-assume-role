# Introduction

When building using for example Bitbucket Pipelines you might find yourself in a situation where you want to deploy to multiple AWS accounts. This package allows you to easily switch to an AWS role in a different account. 

## Installation

```bash
npm install @enfo/aws-assume --save-dev
```

## Usage

Add a role specific role to your package.json

```json
{
  "scripts": {
    "assume:test": "./node_modules/.bin/aws-assume ROLE_ARN_HERE"
  }
  ...
}
```

The package will print variables on the format "export AWS_ACCESS_KEY_ID=AKI..." so in your build pipelines you have to run eval on the output. The silent flag suppresses npm script output which would ruin the command.

```bash
eval $(npm run assume:test --silent)
```

## Configuration

It takes two parameters - role ARN and session duration. The role ARN is mandatory and if one is not supplied an error will be thrown. The duration is in seconds and optional, the default value is 900 seconds (15 minutes). Example:

```bash
./node_modules/.bin/aws-assume arn:aws:iam::111122223333:role/Some-Fancy-Role 1800
```
