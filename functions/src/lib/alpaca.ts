import Frisbee from "frisbee"
import { isProduction } from "../config/constants"
const Cabin = require('cabin');
const cabin = new Cabin();

const URL = {
  sandbox: 'https://broker-api.sandbox.alpaca.markets/v1/',
  production: 'https://broker-api.alpaca.markets/v1/'
}

const api = new Frisbee({
  baseURI: isProduction ? URL.production: URL.sandbox,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  auth: `${process.env.ALPACA_API_KEY}:${process.env.ALPACA_API_SECRET}`,
  logRequest: (path, opts) => {
    if(!isProduction) cabin.info('fetch request', { path, opts });
  }
})

const login = async () => {
  try {
    const res = await api.get('/accounts')
    if(res.err) throw res.err
    
    return res.body
  } catch (error) {
    console.error(error)
  }
}

export { login }