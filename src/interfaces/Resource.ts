export interface ListingConfigField {
  field: string
  type: 'string' | 'number' | 'date'
}

export interface ListingConfig {
  filter: boolean
  filterFields: ListingConfigField[]
  pagination: boolean
  sorting: boolean
}

export interface ResourceConfig {
  list: boolean
  create: boolean
  retrieve: boolean
  update: boolean
  destroy: boolean
}

export interface Resource {
  collection: string
  prefix: string
  config: ResourceConfig
  listingConfig: ListingConfig
}
