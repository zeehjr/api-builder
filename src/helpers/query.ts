import { ClientResourceConfig, PaginationConfig, FilterConfig } from '../types/client/Client'

const ensureHasOperator = (key: string): string => (key.startsWith('$') ? key : '$' + key)

const typeCastValue = (value: string, type: string): Date | string | number | undefined => {
  if (type === 'string') {
    return value
  }
  if (type === 'number') {
    return Number(value)
  }
  if (type === 'date') {
    return new Date(value)
  }
}

const typeCastValues = (obj: any, type: string): any => {
  if (typeof obj === 'string') {
    console.log('is OBJ')
    return typeCastValue(obj, type)
  }
  return Object.keys(obj).reduce((prev, curr) => {
    return { ...prev, [ensureHasOperator(curr)]: typeCastValue(obj[curr], type) }
  }, {})
}

const extractFilters = (filter?: FilterConfig[] | boolean, query?: any): any => {
  if (filter == null || !Array.isArray(filter)) return null

  const filterKeys = Object.keys(query).filter((key) => filter.some((field) => field.field === key))

  const conditions = filterKeys.map((filterKey) => {
    const queryValue = query[filterKey]
    const type = filter.find((field) => field.field === filterKey)?.type || 'string'

    return { [filterKey]: typeCastValues(queryValue, type) }
  })

  if (conditions.length === 0) return {}

  return { $and: conditions }
}

const extractPagination = (pagination?: PaginationConfig | boolean, query?: any): { offset: number; limit: number } => {
  if (pagination === false) {
    return { offset: 0, limit: 100 }
  }
  if (pagination === true || pagination === null) {
    return { offset: query.offset ?? 0, limit: query.limit ?? 100 }
  }

  const defaultLimit = pagination?.defaultLimit ?? 100
  const maxLimit = pagination?.maxLimit ?? 100
  const queryLimit = query.limit ?? defaultLimit
  if (pagination === false) return { offset: 0, limit: defaultLimit }
  const limit = Math.min(maxLimit, queryLimit)
  return { offset: query.offset, limit }
}

const extractSorting = (sorting?: boolean, query?: any): any => {
  if (!sorting) return null
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

export const generateMongoFilterByQuery = (
  resourceConfig: ClientResourceConfig,
  reqQuery: any
): { filter: any; pagination: { offset: number; limit: number }; sorting: any } => {
  if (resourceConfig.find == null || resourceConfig.find === true || resourceConfig.find === false) {
    return { filter: {}, pagination: { offset: 0, limit: 100 }, sorting: {} }
  }

  const filter = extractFilters(resourceConfig.find.filter, reqQuery)
  const pagination = extractPagination(resourceConfig.find.pagination, reqQuery)
  const sorting = extractSorting(resourceConfig.find.sorting, reqQuery)

  return { filter, pagination, sorting }
}
