import { Response } from "express"
import { User } from "../models";

type UserType = {
  name: string,
  email: string
}

type Request = {
  body: UserType,
  params: { userId: string }
}

const getUsers = async (req: Request, res: Response) => {
  User.find({}, (error, users) => {
    if(error) {
      return res.status(500).json(error.message)
    }
    
    return res.status(200).json(users)
  })
}

export { getUsers }