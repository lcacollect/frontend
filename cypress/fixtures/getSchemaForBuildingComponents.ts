import { Unit } from '../../src/dataAccess'

export default {
  data: {
    reportingSchemas: [
      {
        id: '6350d5ca-550f-4ddb-ab71-358402174eb4',
        projectId: 'COWI 1',
        name: 'Reporting Schema name',
        categories: [
          {
            id: '689dea13-cd9c-47e6-a8ca-21aca8331932',
            name: '1 | Bygningsbasis',
            path: '/',
            description: '',
            reportingSchemaId: '6350d5ca-550f-4ddb-ab71-358402174eb4',
            elements: [],
            depth: 0,
          },
          {
            id: '64b4ad8f-0d22-4004-b9a7-aa9b7553b8a5',
            name: '10 | Terræn',
            path: '/689dea13-cd9c-47e6-a8ca-21aca8331932',
            description: '',
            reportingSchemaId: '6350d5ca-550f-4ddb-ab71-358402174eb4',
            elements: [],
            depth: 1,
          },
          {
            id: '4853d83d-54f0-4ba7-8db9-48df0673b2c4',
            name: '10x | Terræn',
            path: '/689dea13-cd9c-47e6-a8ca-21aca8331932/64b4ad8f-0d22-4004-b9a7-aa9b7553b8a5',
            description: '',
            reportingSchemaId: '6350d5ca-550f-4ddb-ab71-358402174eb4',
            elements: [
              {
                id: '6dccd98e-cd7d-4c62-afb6-72f646056e8f',
                name: 'Wall 0',
                quantity: 2,
                unit: Unit.Kg,
                description: 'This is my wall 0',
                schemaCategory: {
                  id: '4853d83d-54f0-4ba7-8db9-48df0673b2c4',
                  name: '10x | Terræn',
                  path: '/689dea13-cd9c-47e6-a8ca-21aca8331932/64b4ad8f-0d22-4004-b9a7-aa9b7553b8a5',
                },
              },
              {
                id: 'f469dfe9-7df7-4f36-99c9-eebbe6cc7ba0',
                name: 'Wall 1',
                quantity: 5,
                unit: Unit.M,
                description: 'This is my wall 1',
                schemaCategory: {
                  id: '4853d83d-54f0-4ba7-8db9-48df0673b2c4',
                  name: '10x | Terræn',
                  path: '/689dea13-cd9c-47e6-a8ca-21aca8331932/64b4ad8f-0d22-4004-b9a7-aa9b7553b8a5',
                },
              },
              {
                id: '96c47a7a-1607-4e83-9357-399df4d7f82b',
                name: 'Wall 2',
                quantity: 8,
                unit: Unit.M2,
                description: 'This is my wall 2',
                schemaCategory: {
                  id: '4853d83d-54f0-4ba7-8db9-48df0673b2c4',
                  name: '10x | Terræn',
                  path: '/689dea13-cd9c-47e6-a8ca-21aca8331932/64b4ad8f-0d22-4004-b9a7-aa9b7553b8a5',
                },
              },
            ],
            depth: 2,
          },
          {
            id: 'bb945391-3208-4f53-85d5-6aed9d653bfa',
            name: '103 | Spunsvægge',
            path: '/689dea13-cd9c-47e6-a8ca-21aca8331932/64b4ad8f-0d22-4004-b9a7-aa9b7553b8a5',
            description: '',
            reportingSchemaId: '6350d5ca-550f-4ddb-ab71-358402174eb4',
            elements: [
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
            depth: 2,
          },
        ],
      },
    ],
  },
}
