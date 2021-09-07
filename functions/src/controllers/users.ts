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
  User.find({}, (error, users: any) => {
    if(error) {
      return res.status(500).json(error.message)
    }

    const result:any[] = Array.from(users).map((user:any) => {
      const obj = user.toJSON()
      delete obj._id
      
      return obj
    })
    
    return res.status(200).json(result)
  })
}

export { getUsers }