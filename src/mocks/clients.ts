export default [
  {
    _id: '1',
    name: 'ClientOne',
    prefix: 'client-one',
    resources: [
      {
        collection: 'people',
        prefix: 'people',
        routes: {
          detail: false,
          find: {
            filter: [
              { field: 'name', type: 'string' },
              { field: 'age', type: 'number' }
            ]
          }
        }
      }
    ]
  },
  {
    _id: '2',
    name: 'ClientTwo',
    prefix: 'client-two',
    resources: [
      {
        collection: 'cars',
        prefix: 'cars',
        routes: null
      }
    ]
  }
]
