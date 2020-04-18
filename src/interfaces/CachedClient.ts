import { ResourceRoutes } from './ResourceRoutes'

export interface CachedClient {
  prefix: string
  resources: ResourceRoutes[]
}
