import { Response } from 'express'
import { Portfolio, PortfolioShape } from '../models/portfolio'
import db from '../database'
import paginate from "express-paginate"

const getPortfolios = async (req: any, res: Response) => {
  const portfolios = db.collection<Portfolio>('portfolios')
  const [portfoliosArray, itemCount] = await Promise.all([
    portfolios.find({ userId: [null, req.locals.userId], 
      limit: req.limit, skip: req.skip }).project(PortfolioShape).toArray(),
    portfolios.find({ userId: [null, req.locals.userId]}).count()
  ])
  const pageCount = Math.ceil(itemCount / req.query.limit);

  return res.status(200).json({
    object: 'list',
    hasMore: paginate.hasNextPages(req)(pageCount),
    data: portfoliosArray
  })
}

const getPortfolioById = async (req: any, res: Response) => {
  const id = req.params?.id?.toString()
  if(!id || id.length == 0) return res.status(422).json({ error: 'Missing id' })

  // Find the portfolio among the users' portfolios, or the public ones
  // Include the portfolio's items in the response
  const portfolio = await db.collection<Portfolio>('portfolios').findOne({ 
    _id: id, userId: [null, req.locals.userId], $include: ['items'] })
  if(!portfolio) return res.status(404).json({ error: 'Portfolio not found' })

  return res.status(200).json(portfolio)
}

export { getPortfolios, getPortfolioById }
