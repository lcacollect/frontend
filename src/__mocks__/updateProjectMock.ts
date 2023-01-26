import { MockedResponse } from '@apollo/client/testing'
import { UpdateProjectDocument } from '../dataAccess'

export const updateProjectMock: MockedResponse[] = [
  {
    request: {
      query: UpdateProjectDocument,
      variables: {
        id: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785',
        name: 'My Project',
        projectId: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785',
        client: 'John Smith',
        address: '123 Main St',
        city: 'New York',
        country: 'USA',
        domain: 'residential',
        metaFields: {
          squareFootage: 1000,
          numberOfRooms: 5,
        },
        file: null,
      },
    },
    error: new Error('An error occurred'),
    // result: {
    //   data: {
    //     updateProject: {
    //       name: 'Project Name',
    //       imageUrl: 'https://example.com/image.jpg',
    //     },
    //   },
    // },
  },
]
