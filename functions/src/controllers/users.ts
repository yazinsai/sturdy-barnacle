import { Response } from "express"
import db from "../database"

type UserType = {
  name: string,
  email: string
}

type Request = {
  body: UserType,
  params: { userId: string }
}

interface User {
  name: string;
  email: string;
}

const getUsers = async (req: Request, res: Response) => {
  const users = db.collection<User>('users')
  const cursor = users.find({})

  // convert cursor to array
  const usersArray = await cursor.toArray()
  return res.status(200).json(usersArray)
}

export { getUsers }