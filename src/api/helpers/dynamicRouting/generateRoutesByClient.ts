import { Client } from '../../../interfaces/Client'
import generateRoutesByResource from './generateRoutesByResource'
import { ResourceRoutes } from '../../../interfaces/ResourceRoutes'

export default (client: Client): ResourceRoutes[] => {
  const routes: ResourceRoutes[] = []

  client.resources.forEach((resource) => {
    const resourceRoutes = generateRoutesByResource(client.prefix, resource)

    routes.push({ resource: resource.prefix, routes: resourceRoutes })
  })

  return routes
}
