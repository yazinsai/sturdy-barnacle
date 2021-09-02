import * as admin from "firebase-admin"
import * as express from 'express';

// Good reference: https://dev.to/emeka/securing-your-express-node-js-api-with-firebase-auth-4b5f

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
    res.locals.userId = decoded.uid
    res.locals.email = decoded.email
    res.locals.authenticated = true
    return next()
  } catch(e) {
    return error(`Unable to decode the provided token: "${token}"`)
  }
}

const verifyToken = async (token: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    const {decodedToken} = await admin.auth().verifyIdToken(token)
    return decodedToken
  } catch(error) {
    throw error.message
  }
}

export { verifyToken, validateWithToken }