import { Response } from "express"
import { db } from "../config/firebase"

type EntryType = {
  title: string,
  text: string
}

type Request = {
  body: EntryType,
  params: { entryId: string }
}

const getEntries = async (req: Request, res: Response) => {
  try {
    const allEntries: EntryType[] = []
    const snapshot = await db.collection('entries').get()
    snapshot.forEach((doc: any) => allEntries.push(doc.data()))
    return res.status(200).json(allEntries)
  } catch(error) {
    return res.status(500).json(error.message)
  }
}

const addEntry = async (req: Request, res: Response) => {
  const { title, text} = req.body
  try {
    const entry = db.collection('entries').doc()
    const entryObject = {
      id: entry.id,
      title,
      text 
    }

    entry.set(entryObject)

    res.status(200).send({
      status: 'success',
      message: 'entry added',
      data: entryObject
    })
  } catch(error) {
    res.status(500).json(error.message)
  }
}

export { addEntry, getEntries }