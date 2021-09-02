import * as admin from "firebase-admin"
import * as express from 'express';

const validateWithToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("validateWithToken()")
  const fail = (msg: string) => 
    res.status(401).send(JSON.stringify({ error: msg }))

  // Extract the token
  const authHeader: string = req.get('authorization') ?? ''
  if(authHeader.length == 0) return fail('Authorization header missing')
  
  let [scheme, token] = authHeader.split(' ')
  if(scheme != "Bearer" || token.length == 0) return fail('Malformed Authorization header')

  // Validate the token
  try {
    const decoded:string = await verifyToken(token)
    res.locals.auth = JSON.parse(decoded)
    res.locals.authenticated = true
  } catch(e) {
    return fail(`Unable to decode the provided token: "${token}"`)
  }

  return next()
}

const verifyToken = async (token: string) => {
  try {
    const {decodedToken} = await admin.auth().verifyIdToken(token)
    return decodedToken
  } catch(error) {
    throw error.message
  }
}

export { verifyToken, validateWithToken }