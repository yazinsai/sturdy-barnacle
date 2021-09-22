require('dotenv').config()

import express from "express";
import paginate from "express-paginate";
import { initFirebase } from "./config/firebase";
// import { validateWithToken } from "./middlewares/auth";
import { isProduction } from "./config/constants";
import db from "./database";
import Cabin from 'cabin';

import { getUsers } from "./controllers/users";
import { createPortfolio, getPortfolioById, getPortfolios } from "./controllers/portfolios";

console.info(`Running in ${isProduction ? 'production': 'dev'} environment`)

const app = express()
const cabin = new Cabin();

// Middleware
app.use(cabin.middleware); // logging
// app.use(validateWithToken) // on all routes
app.use(paginate.middleware(20, 100)) // default page size is 20; max 100

// Routes
app.get('/', async (req, res) => res.status(200).send({ message: "I'm still alive" }))
app.get('/users', getUsers)
app.get('/portfolios', getPortfolios)
app.post('/portfolios', createPortfolio)
app.get('/portfolios/:id', getPortfolioById)

// Setup
const setup = async () => {
  initFirebase()
  await db.connect()
}
setup()

// Teardown
const cleanup = (event) => {
  db.disconnect()
  console.log("✅ DB gracefully shutdown")
  process.exit() // Exit with default success-code '0'.
}
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Have express handle our requests
app.listen(3000, () => {
  console.log("✅ Express server listening on port 3000")
})