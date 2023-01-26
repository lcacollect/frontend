import { MockedResponse } from '@apollo/client/testing'
import { GetSingleProjectDocument } from '../dataAccess'

export const projectMock: MockedResponse[] = [
  {
    request: {
      query: GetSingleProjectDocument,
      variables: { id: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785' },
    },
    result: {
      data: {
        projects: [
          {
            id: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785',
            projectId: 'COWI 1',
            name: 'My Project',
            client: 'Arkitema',
            domain: null,
            address: null,
            city: null,
            country: null,
          },
        ],
      },
    },
  },
]
