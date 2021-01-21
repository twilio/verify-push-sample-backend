<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

This project provides a sample backend to use instead of your own app backend to build a basic Verify Push implementation as explained in the [Verify Push Quickstart](https://www.twilio.com/docs/verify/quickstarts/push-android). The sample backend is also designed to be used with the [Android sample app](https://github.com/twilio/twilio-verify-android/blob/main/README.md#UsingSampleApp) and [iOS sample app](https://github.com/twilio/twilio-verify-ios/blob/main/README.md#UsingSampleApp) 

# Twilio Verify Push Factor Sample Backend

---
**NOTE**

The endpoint that provides access tokens should NOT be used in a production environment. This backend supports seamlessly getting started with the sample app, and while convenient, the provided endpoints are not secure enough for production environments. You should use an authentication provider to securely provide access tokens to your client applications.

---

**NOTE**

We recommend you to [request a Secondary Token](https://www.twilio.com/console/project/settings) for this sample backend and after your tests are finished, delete the token

---

This sample project demonstrates how to use Twilio APIs in a Node.js web
application. Once the app is up and running, check out [the home page](http://localhost:3000)
to see which demos you can run.

Let's get started!

## Configure the sample backend

To run the application, you'll need to gather your Twilio account credentials and configure them
in a file named `.env`. To create this file from an example template, do the following in your
Terminal.

```bash
cp .env.sample .env
```

Open `.env` in your favorite text editor and configure the following values.

### Configure account information

Every sample in the demo requires some basic credentials from your Twilio account. Configure these first.

| Config Value         | Description                                                                                                           |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `TWILIO_ACCOUNT_SID` | Your primary Twilio account identifier - find this [in the console here](https://www.twilio.com/console).             |
| `TWILIO_AUTH_TOKEN`  | Your primary Twilio account authentication token - find this [in the console here](https://www.twilio.com/console).   |

### Configuring Twilio Verify Push Factor

You will need to create a Verify Service.

* Configure or select a Push Credential
  * Android: https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-push-credential
  * iOS: https://www.twilio.com/docs/verify/quickstarts/push-ios#create-a-push-credential
* Configure a Verify Service
  * Android: https://www.twilio.com/docs/verify/quickstarts/push-android#create-a-verify-service-and-add-the-push-credential
  * iOS: https://www.twilio.com/docs/verify/quickstarts/push-ios#create-a-verify-service-and-add-the-push-credential

| Config Value                | Where to get one.                                                                                                      |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `TWILIO_VERIFY_SERVICE_SID` | Verify service Sid. Put this in your `.env` file. |
| `HASH_IDENTITY` | By default, the identity will be hashed to prevent PII. You can change the configuration, adding `false` or `true` |

Once you've done that, run the application and [open a browser](localhost:3000/)!

## Run the sample application

Now that the application is configured, we need to install our dependencies from npm.

```bash
npm install
# or
yarn install
```

Now we should be all set! Run the application using the `node` command.

```bash
npm start
# or
yarn start
```

Your application should now be running at [http://localhost:3000/](http://localhost:3000/).

Check your config values, and follow the links to the sample apps!

## Running the Sample Backend for mobile apps

If you are going to connect to this project with a mobile app (and you should try it out!), your phone won't be able to access localhost directly. You'll need to create a publicly accessible URL using a tool like [ngrok](https://ngrok.com/) to send HTTP/HTTPS traffic to a server running on your localhost. Use HTTPS to make web connections that retrieve a Twilio access token.

```bash
ngrok http 3000
```

You can deploy to Heroku or create your own backend.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/twilio/verify-push-sample-backend/tree/main)

## Meta

- No warranty expressed or implied. Software is as is. Diggity.
- [Apache License 2.0](LICENSE)
- Lovingly crafted by Twilio
