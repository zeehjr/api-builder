import { ObjectID } from 'mongodb'

export interface FilterConfig {
  field: string
  type: 'string' | 'number' | 'date'
}

export interface PaginationConfig {
  defaultLimit?: number
  maxLimit?: number
}

export interface ResourceFindConfig {
  filter?: boolean | FilterConfig[]
  pagination?: boolean | PaginationConfig
  sorting?: boolean
}

export interface ClientResourceConfig {
  find?: boolean | ResourceFindConfig
  detail?: boolean
  create?: boolean
  update?: boolean
  destroy?: boolean
}

export interface ClientResource {
  prefix: string
  collection: string
  config?: ClientResourceConfig
}

export default interface Client {
  _id: ObjectID
  name: string
  prefix: string
  resources: ClientResource[]
}
