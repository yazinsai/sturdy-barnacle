import * as functions from "firebase-functions";
import express from "express";
import { addEntry, getEntries } from "./controllers/entry";
import { validateWithToken } from "./middlewares/auth";
import { connectDb } from "./models";

require('dotenv').config()

const app = express()
app.use(validateWithToken) // require authentication on all routes
app.get('/', (req, res) => res.status(200).send({ 
  message: "You've successfully authenticated with the Amal API"
}))

app.post('/entries', addEntry)
app.get('/entries', getEntries)

const onLaunch = async () => {
  await connectDb()
}

exports.app = functions.https.onRequest(app)
onLaunch()