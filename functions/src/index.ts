require('dotenv').config()

import * as functions from "firebase-functions";
import express from "express";
import { initFirebase } from "./config/firebase";
import { getUsers } from "./controllers/users";
import { validateWithToken } from "./middlewares/auth";
import { isProduction } from "./config/constants";
import db from "./database";
import Cabin from 'cabin';

import { login } from "./lib/alpaca"

console.info(`Running in ${isProduction ? 'production': 'dev'} environment`)

const app = express()

// Setup logging
const cabin = new Cabin();
app.use(cabin.middleware);

// Routes
if(isProduction) app.use(validateWithToken) // on all routes
app.get('/', (req, res) => res.status(200).send({ message: "👋" }))
app.get('/users', getUsers)
app.get('/accounts', async (req, res) => {
  const accounts = await login()
  return res.status(200).send({ accounts: accounts })
})

// Setup
initFirebase()
db.connect()

// Have express handle our requests
exports.app = functions.https.onRequest(app)