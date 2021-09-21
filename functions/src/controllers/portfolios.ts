import { Response } from 'express'
import { Portfolio, PortfolioShape } from '../models/portfolio'
import db from '../database'

const getPortfolios = async (req: any, res: Response) => {
  const portfolios = db.collection<Portfolio>('portfolios')
  const portfoliosArray = await portfolios.find({ userId: req.locals.userId }).project(PortfolioShape).toArray()
  return res.status(200).json(portfoliosArray)
}

export { getPortfolios }
