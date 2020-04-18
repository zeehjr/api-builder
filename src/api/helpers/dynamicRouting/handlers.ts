import { Collection } from 'mongoose'
import qs from 'qs'
import { RequestHandler } from 'express'
import { ObjectID } from 'mongodb'
import { generateMongoFilter } from '../advancedListing/generateMongoFilter'
import { Resource } from '../../../interfaces/Resource'
import { generateMongoPagination } from '../advancedListing/generateMongoPagination'
import { generateMongoSorting } from '../advancedListing/generateMongoSorting'

export const list = (collection: Collection, resource: Resource): RequestHandler => async (req, res): Promise<any> => {
  const q = qs.parse(qs.stringify(req.query))

  const filter = generateMongoFilter(resource, q)
  const pagination = generateMongoPagination(resource, q)
  const sorting = generateMongoSorting(resource, q)

  const mongoQuery = collection.find(filter)
  if (sorting) {
    mongoQuery.sort(sorting)
  }
  if (pagination.offset) {
    mongoQuery.skip(pagination.offset)
  }
  if (pagination.limit) {
    mongoQuery.limit(pagination.limit)
  }

  const result = await mongoQuery.toArray()

  return res.json(result)
}

export const retrieve = (collection: Collection): RequestHandler => async (req, res): Promise<any> => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(400).json({ error: 'The specified ID is not valid.' })
  }

  const result = await collection.findOne({ _id: new ObjectID(id) })

  if (!result) {
    return res.status(404).json({ error: 'Item not found.' })
  }

  return res.json(result)
}

export const create = (collection: Collection): RequestHandler => async (req, res): Promise<any> => {
  const result = await collection.insertOne(req.body)

  if (result.insertedCount === 0) {
    return res.status(500).send()
  }

  return res.status(200).json({ insertedId: result.insertedId })
}

export const update = (collection: Collection): RequestHandler => async (req, res): Promise<any> => {
  if (!req.body._id) {
    return res.status(400).json({ error: 'Your body need to include the _id field to perform an update.' })
  }

  if (!ObjectID.isValid(req.body._id)) {
    return res.status(400).json({ error: 'The specified _id in your body is not valid.' })
  }

  const newDoc = { ...req.body, _id: undefined }

  const result = await collection.replaceOne({ _id: new ObjectID(req.body._id) }, newDoc)

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: 'Item not found.' })
  }

  if (result.modifiedCount === 0) {
    return res.status(304).json({ error: 'Not modified' })
  }

  return res.status(200).send()
}

export const destroy = (collection: Collection): RequestHandler => async (req, res): Promise<any> => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({ error: 'The specified ID is not valid.' })
  }

  const result = await collection.deleteOne({ _id: new ObjectID(req.params.id) })

  if (result.deletedCount === 0) {
    return res.status(404).send()
  }

  return res.status(200).send()
}
