import { Router } from 'express'
import { ResourceRoutes } from '../../../interfaces/ResourceRoutes'
import { CachedClient } from '../../../interfaces/CachedClient'

export const generateRouterByResourceRoutes = (routes: ResourceRoutes): Router => {
  const r = Router()

  routes.routes.forEach((route) => {
    if (route.method === 'get') {
      return r.get(route.path, route.handler)
    }
    if (route.method === 'post') {
      return r.post(route.path, route.handler)
    }
    if (route.method === 'put') {
      return r.put(route.path, route.handler)
    }
    if (route.method === 'delete') {
      return r.delete(route.path, route.handler)
    }
  })

  return r
}

export const generateRouterByResourcesList = (resources: ResourceRoutes[]): Router => {
  const r = Router()

  resources.forEach((resource) => {
    const resourceRouter = generateRouterByResourceRoutes(resource)

    r.use(`/${resource.resource}`, resourceRouter)
  })

  return r
}

export const generateRouterByCachedClients = (clients: CachedClient[]): Router => {
  const r = Router()

  clients.forEach((client) => {
    const clientRouter = generateRouterByResourcesList(client.resources)

    r.use(client.prefix, clientRouter)
  })

  return r
}
