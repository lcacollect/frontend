import { Unit } from '../../src/dataAccess'

export default {
  data: {
    reportingSchemas: [
      {
        id: 'd519dfd1-6c3b-481f-b46b-c756d7f9b98c',
        projectId: 'COWI 1',
        name: 'Reporting Schema name',
        categories: [
          {
            id: '655d79b1-2fd0-4750-8c0f-e6a5a2266fc3',
            name: 'Category Name 1',
            path: '/',
            depth: 0,
          },
          {
            id: '919a0c2a-88fa-4600-82d0-12600deb9ab9',
            name: 'NestedCategory 1',
            path: '/655d79b1-2fd0-4750-8c0f-e6a5a2266fc3',
            depth: 1,
          },
          {
            id: '7fd7b94c-a470-4945-a11d-ab46b92ebc36',
            name: 'Subcategory of NestedCategory 1',
            path: '/655d79b1-2fd0-4750-8c0f-e6a5a2266fc3/919a0c2a-88fa-4600-82d0-12600deb9ab9',
            depth: 2,
            elements: [
              {
                id: '6dccd98e-cd7d-4c62-afb6-72f646056e8f',
                name: 'Wall 0',
                quantity: 2,
                unit: Unit.Kg,
                description: 'This is my wall 0',
              },
              {
                id: 'f469dfe9-7df7-4f36-99c9-eebbe6cc7ba0',
                name: 'Wall 1',
                quantity: 5,
                unit: Unit.M,
                description: 'This is my wall 1',
              },
              {
                id: '96c47a7a-1607-4e83-9357-399df4d7f82b',
                name: 'Wall 2',
                quantity: 8,
                unit: Unit.M2,
                description: 'This is my wall 2',
              },
              {
                id: '15a4b0e6-b26d-4e5e-8a03-e2d9934f1c1a',
                name: 'Wall 3',
                quantity: 0.12,
                unit: Unit.M3,
                description: 'This is my wall 3',
              },
              {
                id: 'f98c33f0-0b41-429e-b9d5-61199c5c6144',
                name: 'Wall 4',
                quantity: 0.34,
                unit: Unit.None,
                description: 'This is my wall 4',
              },
              {
                id: '562eab6b-3407-4c71-a8c6-a35d2402fc7b',
                name: 'Wall 5',
                quantity: 0.56,
                unit: Unit.Pcs,
                description: 'This is my wall 5',
              },
            ],
          },
          {
            id: '2d3992cf-4ec4-4ce0-85f4-82c1977056ca',
            name: 'Category Name 2',
            path: '/',
            depth: 0,
          },
          {
            id: '59749f2c-0f60-4c41-b6d8-1286ce3888cd',
            name: 'NestedCategory 2',
            path: '/2d3992cf-4ec4-4ce0-85f4-82c1977056ca',
            depth: 1,
          },
        ],
      },
    ],
  },
}
