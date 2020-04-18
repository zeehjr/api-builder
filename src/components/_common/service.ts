import { ObjectId, ObjectID } from 'mongodb'
import { Collection } from 'mongoose'

export const findAll = (col: Collection) => async (config: {
  filter: any
  pagination: any
  sorting: any
}): Promise<any[]> => {
  const result = col.find(config.filter ?? {})
  if (config.sorting) {
    result.sort(config.sorting)
  }
  if (config.pagination) {
    result.skip(Number(config.pagination.offset ?? 0))
    result.limit(Number(config.pagination.limit ?? 100))
  }

  return result.toArray()
}

export const create = (col: Collection) => async (doc: any): Promise<any> => col.insertOne(doc)
export const update = (col: Collection) => async (doc: any): Promise<any> => {
  const { _id, ...withoutId } = doc
  return col.replaceOne({ _id: new ObjectId(_id) }, withoutId)
}
export const destroy = (col: Collection) => async (key: ObjectID | string): Promise<any> =>
  col.deleteOne({ _id: new ObjectId(key) })

export const findOne = (col: Collection) => (key: ObjectID | string): Promise<any> =>
  col.findOne({ _id: new ObjectId(key) })
