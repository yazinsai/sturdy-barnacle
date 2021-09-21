require('dotenv').config()

import * as functions from "firebase-functions";
import express from "express";
import paginate from "express-paginate";
import { initFirebase } from "./config/firebase";
import { validateWithToken } from "./middlewares/auth";
import { isProduction } from "./config/constants";
import db from "./database";
import Cabin from 'cabin';

import { login } from "./lib/alpaca"
import { getUsers } from "./controllers/users";
import { getPortfolioById, getPortfolios } from "./controllers/portfolios";

console.info(`Running in ${isProduction ? 'production': 'dev'} environment`)

const app = express()

// Setup logging
const cabin = new Cabin();
app.use(cabin.middleware);

// Routes
app.use(validateWithToken) // on all routes
app.use(paginate.middleware(20, 100)) // default page size is 20; max 100
app.get('/', async (req, res) => res.status(200).send({ message: "👋" }))
app.get('/users', getUsers)
app.get('/portfolios', getPortfolios)
app.get('/portfolios/:id', getPortfolioById)
app.get('/accounts', async (req, res) => {
  const accounts = await login()
  return res.status(200).send({ accounts: accounts })
})

// Setup
const setup = async () => {
  initFirebase()
  await db.connect()
}

// Teardown
const cleanup = (event) => {
  db.disconnect()
  console.log("✅ DB gracefully shutdown")
  process.exit() // Exit with default success-code '0'.
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Have express handle our requests
setup()
exports.app = functions.https.onRequest(app)