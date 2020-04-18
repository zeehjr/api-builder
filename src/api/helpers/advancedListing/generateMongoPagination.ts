import { Resource } from '../../../interfaces/Resource'

export const generateMongoPagination = (
  resource: Resource,
  query: any
): { offset: number | null; limit: number | null } => {
  if (resource.listingConfig.pagination === false) {
    return { offset: null, limit: null }
  }

  const offset = query.offset ? Number(query.offset) : null
  const limit = query.limit ? Number(query.limit) : null

  return { offset, limit }
}
