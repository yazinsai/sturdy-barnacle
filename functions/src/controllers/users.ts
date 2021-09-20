import { Response } from "express"
import { User, UserShape } from "../models/user"
import db from "../database"

type UserType = {
  name: string,
  email: string
}

type Request = {
  body: UserType,
  params: { userId: string }
}

const getUsers = async (req: Request, res: Response) => {
  const users = db.collection<User>('users')
  const usersArray = await users.find({}).project(UserShape).toArray()
  return res.status(200).json(usersArray)
}

export { getUsers }