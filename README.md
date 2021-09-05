## Environment Variables

**Required:**

- `project.id`: *see note below*
- `private.key`: *see note below*
- `client.email`: *see note below*
- `DATABASE_URL`: The Database URL to MongoDB. We're currently using the MongoDB Atlas hosted cloud

Set these keys using `firebase functions:config:set key1="val1" key2="val2" ...`

These **need to match** the configuration used in the Flutter client app for generating the tokens user authentication tokens.

For instructions on how to get these values, check out this video [here](https://youtu.be/T8SZv6h2WbY?t=1232).

## Debugging

```sh
npm run build:watch # In VS code terminal
firebase emulators:start --inspect-functions
```

Then run the `debug` launch profile in VS Code (detailed instructions [here](https://medium.com/firebase-developers/debugging-firebase-functions-in-vs-code-a1caf22db0b2))

## Deploying

```sh
firebase deploy --only functions
```