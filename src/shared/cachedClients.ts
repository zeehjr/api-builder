import { CachedClient } from '../interfaces/CachedClient'
import { Router } from 'express'
import { generateRouterByCachedClients } from '../api/helpers/dynamicRouting/generateRouter'

let cachedClients: CachedClient[] = []
export let cachedClientsRouter: Router = generateRouterByCachedClients(cachedClients)

export const getCachedClients = (): CachedClient[] => cachedClients

export const setCachedClients = (newValue: CachedClient[]): void => {
  cachedClients = newValue
  cachedClientsRouter = generateRouterByCachedClients(newValue)
}
