import { Router } from 'express'
import clients from '../mocks/clients'
import { generateCrudRouter } from './crudRouter'
import { ClientResource } from '../types/client/Client'

const cachedResourcesRoutes = clients.map((client) => {
  const router = Router()

  client.resources.forEach((resource: ClientResource) => {
    const crudRouter = generateCrudRouter(client.prefix, resource.prefix, resource.collection, resource.config)
    router.use(crudRouter)
  })

  return { _id: client._id, prefix: client.prefix, router }
})

const generateRoutes = (): Router => {
  const r = Router()

  cachedResourcesRoutes.forEach((resource) => {
    r.use(`/${resource.prefix}`, resource.router)
  })

  return r
}

const dynamicRouter = Router()

dynamicRouter.use((req, res, next) => {
  return generateRoutes()(req, res, next)
})

export default dynamicRouter
