import { Resource } from '../../../interfaces/Resource'

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

export const generateMongoFilter = (resource: Resource, query: any): any => {
  if (!resource.config.list || !resource.listingConfig.filter || resource.listingConfig.filterFields.length === 0) {
    return {}
  }

  // eslint-disable-next-line @typescript-eslint/camelcase
  const filterQueryFields = { ...query, order_by: undefined, offset: undefined, limit: undefined }

  const filterKeys = Object.keys(filterQueryFields).filter((queryField) =>
    resource.listingConfig.filterFields.some((filterField) => filterField.field === queryField)
  )

  if (filterKeys.length === 0) return {}

  const conditions = filterKeys.map((filterKey) => {
    const queryValue = query[filterKey]
    const type = resource.listingConfig.filterFields.find((field) => field.field === filterKey)?.type || 'string'

    return { [filterKey]: typeCastValues(queryValue, type) }
  })

  if (conditions.length === 0) return {}

  return { $and: conditions }
}
