import * as functions from "firebase-functions";
import * as express from "express";
import { addEntry, getEntries } from "./controllers/entry";
import { validateWithToken } from "./middlewares/auth";

const app = express()
app.get('/', (req, res) => res.status(200).send('Hi!'))
app.post('/entries',validateWithToken, addEntry)
app.get('/entries', getEntries)

exports.app = functions.https.onRequest(app)