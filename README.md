## Environment Variables

**Required:**

- `project.id`
- `private.key`
- `client.email`

Set these keys using `firebase functions:config:set project.id="PROJECT_ID" private.key="PRIVATE_KEY" client.email="CLIENT_EMAIL"`

These **need to match** the configuration used in the Flutter client app for generating the tokens user authentication tokens.

For instructions on how to get these values, check out this video [here](https://youtu.be/T8SZv6h2WbY?t=1232).

## Debugging

```sh
npm run build:watch # In VS code terminal
firebase emulators:start --inspect-functions
```

Then run the `debug` launch profile in VS Code

## Deploying

```sh
firebase deploy --only functions
```