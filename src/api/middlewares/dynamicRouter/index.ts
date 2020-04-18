import { Router } from 'express'
import { cachedClientsRouter } from '../../../shared/cachedClients'

const dynamicRouter = Router()

dynamicRouter.use('/service', (req, res, next) => {
  cachedClientsRouter(req, res, next)
})

export default dynamicRouter
