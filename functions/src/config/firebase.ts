import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
      projectId: functions.config().project.id,
      clientEmail: functions.config().client.email,
    }),
  })
}

export { initFirebase }
