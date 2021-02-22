#!/usr/bin/env node

const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts')

const [_, _2, region, arn, duration] = process.argv

if (!arn) {
  throw new Error('Missing AWS role ARN')
}

if (!region) {
  throw new Error('Missing AWS region')
}

const client = new STSClient({ region })
const command = new AssumeRoleCommand({
  RoleArn: process.argv[2],
  RoleSessionName: `pipelines-assume-${Date.now()}`,
  DurationSeconds: duration ? Number(duration) : 900
})

client.send(command, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const { AccessKeyId, SecretAccessKey, SessionToken } = data.Credentials
  console.log(`export AWS_ACCESS_KEY_ID="${AccessKeyId}"`)
  console.log(`export AWS_SECRET_ACCESS_KEY="${SecretAccessKey}"`)
  console.log(`export AWS_SESSION_TOKEN="${SessionToken}"`)
})
