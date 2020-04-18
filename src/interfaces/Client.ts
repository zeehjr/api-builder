import { Resource } from './Resource'

export interface Client {
  name: string
  prefix: string
  resources: Resource[]
}
