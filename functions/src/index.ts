import * as functions from "firebase-functions";
import express from "express";
import { initFirebase } from "./config/firebase";
import { getUsers } from "./controllers/users";
import { validateWithToken } from "./middlewares/auth";
const db = require("./config/database");

require('dotenv').config()

const app = express()
app.use(validateWithToken) // require authentication on all routes
app.get('/', (req, res) => res.status(200).send({ message: "👋" }))
app.get('/users', getUsers)

const onLaunch = async () => {
  initFirebase()
  await db.connect()
}

onLaunch()
exports.app = functions.https.onRequest(app)