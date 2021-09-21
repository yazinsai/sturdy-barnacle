import * as admin from "firebase-admin"
import * as express from 'express';
import database from "../database";
import { User } from "../models/user";

// Good reference: https://dev.to/emeka/securing-your-express-node-js-api-with-firebase-auth-4b5f

// You can apply this middleware to all routes using:
// > app.use(validateWithToken)

// or to individual routes using:
// > app.post('/entries', validateWithToken, addEntry)

const validateWithToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = (msg: string) => res.status(401).send({ error: msg })

  // Extract the token
  const authHeader: string = req.get('authorization') ?? ''
  if(authHeader.length == 0) return error('Authorization header missing')
  
  let [scheme, token] = authHeader.split(' ')
  if(scheme != "Bearer" || token.length == 0) return error('Malformed Authorization header')

  // Validate the token
  try {
    const decoded = await verifyToken(token)
    if(!decoded.email_verified) throw("auth/unverified-email")

    // Lookup userId by the email address
    const record = await database.collection<User>('users').findOne({ email: decoded.email, isActive: true })
    if(record == null) throw("auth/user-not-found")

    // Populate the details
    res.locals.authenticated = true
    res.locals.userId = record._id
    res.locals.email = decoded.email
    return next()
  } catch(e) {
    let message = `Unable to decode the provided token: "${token}". Code: "${e}"`
    switch(e) {
      case "auth/unverified-email":
        message = "You must verify your email address before using this token"
        break
      case "auth/user-not-found":
        message = "Unable to find an active, registered user with this email"
        break
      case "auth/id-token-expired":
        message = "The token has expired. Please sign in, and try again"
        break
    }
    
    return error(message)
  }
}

const verifyToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    const decoded = await admin.auth().verifyIdToken(token)
    return decoded
  } catch(error) {
    throw error.errorInfo.code
  }
}

export { verifyToken, validateWithToken }