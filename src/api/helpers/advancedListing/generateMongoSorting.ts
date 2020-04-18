import { Resource } from '../../../interfaces/Resource'

export const generateMongoSorting = (resource: Resource, query: any): any => {
  if (!resource.listingConfig.sorting) return null
  if (!query.order_by) return null

  if (typeof query.order_by === 'string') {
    return { [query.order_by]: 1 }
  }

  const sort = query.order_by

  Object.keys(sort).forEach((key) => {
    sort[key] = sort[key].toLowerCase() === 'desc' ? -1 : 1
  })

  return sort
}
