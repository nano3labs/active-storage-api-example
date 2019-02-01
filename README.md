# Active Storage API Example

This project demonstrates how to use the Active Storage as a RESTful API for uploading files from a Single Page React Application.

We are using uppy.io for the uploader and S3 direct upload option. So you will need to have an AWS account and s3 bucket.

Note you can use this concepts to a GraphQL API as well. Open activestrorage source `bundle open activestorage` and find the direct upload controller. Extract some of the code there into your GraphQL resolver.

## Setup

### Client - React App

Install dependencies

```bash
cd client
yarn install
```

### Server - Rails App

1. Install dependencies

```bash
cd server
bundle install
```

2. Setup your secrets

```bash
cd server
EDITOR=vim rails credentials:edit
```

Your file should look like this with `<value>` replaced with your keys

```yml
aws:
  access_key_id: <value>
  secret_access_key: <value>
  region: <value>
  bucket: <value>

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: <value>
```
## Running

```bash
cd client
yarn start
```

In another terminal

```bash
cd server
rails s -p 3001
```

Note: client needs to be on port 3000 and server on port 3001 to work
