import { Resource } from '../../../interfaces/Resource'
import { Route } from '../../../interfaces/Route'
import database from '../../../config/database'
import * as handlers from './handlers'

export default (clientDatabase: string, resource: Resource): Route[] => {
  const collection = database.useDb(clientDatabase).collection(resource.collection)

  const routes: Route[] = []

  if (resource.config.list) {
    routes.push({ path: '/', method: 'get', handler: handlers.list(collection, resource) })
  }
  if (resource.config.retrieve) {
    routes.push({ path: '/:id', method: 'get', handler: handlers.retrieve(collection) })
  }
  if (resource.config.create) {
    routes.push({ path: '/', method: 'post', handler: handlers.create(collection) })
  }
  if (resource.config.update) {
    routes.push({ path: '/', method: 'put', handler: handlers.update(collection) })
  }
  if (resource.config.destroy) {
    routes.push({ path: '/:id', method: 'delete', handler: handlers.destroy(collection) })
  }

  return routes
}
