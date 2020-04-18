import { Router, Request, Response } from 'express'
import database from '../config/database'
import * as commonService from '../components/_common/service'
import { ObjectID } from 'mongodb'
import qs from 'qs'
import { generateMongoFilterByQuery } from '../helpers/query'
import { ClientResourceConfig } from '../types/client/Client'

const DEFAULT_ENDPOINTS = { find: true, detail: true, create: true, update: true, destroy: true }

export const generateCrudRouter = (
  clientPrefix: string,
  resourcePrefix: string,
  collection: string,
  config: ClientResourceConfig = DEFAULT_ENDPOINTS
): Router => {
  config = { ...DEFAULT_ENDPOINTS, ...config }

  const col = database.useDb(clientPrefix).collection(collection) // CHANGE TO SOMETHING MORE CONFIGURABLE

  const r = Router()

  if (config.find !== false) {
    r.get(`/${resourcePrefix}`, async (req: Request, res: Response) => {
      const q = qs.parse(qs.stringify(req.query))

      const mongoFilter = generateMongoFilterByQuery(config, q)

      return res.json(await commonService.findAll(col)(mongoFilter))
    })
  }

  if (config.detail) {
    r.get(`/${resourcePrefix}/:id`, async (req, res) => {
      if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ error: 'The specified id is not valid' })
      }
      const id = new ObjectID(req.params.id)
      return res.json(await commonService.findOne(col)(id))
    })
  }

  if (config.create) {
    r.post(`/${resourcePrefix}`, async (req, res) => {
      return res.json(await commonService.create(col)(req.body))
    })
  }

  if (config.update) {
    r.put(`/${resourcePrefix}`, async (req, res) => {
      return res.json(await commonService.update(col)(req.body))
    })
  }

  if (config.destroy) {
    r.delete(`/${resourcePrefix}/:id`, async (req, res) => {
      return res.json(await commonService.destroy(col)(req.params.id))
    })
  }

  return r
}
