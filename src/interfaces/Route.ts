import { RequestHandler } from 'express'

export interface Route {
  path: string
  method: 'get' | 'post' | 'put' | 'delete'
  handler: RequestHandler
}
