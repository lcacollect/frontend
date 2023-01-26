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
        metaFields: [
          {
            id: 'building_type',
            label: 'Building Type',
            options: [
              'Office Building',
              'Residential - Detached house',
              'Residential - Multi-story building',
              'Residential - Row-housing',
              'Commercial',
              'Logistic',
              'Production',
              'Hotel',
              'Other',
            ],
          },
          { id: 'gross_area', label: 'Gross Area (m²)', type: 'number' },
          { id: 'construction_type', label: 'Construction Type' },
          { id: 'floors_above_ground', label: 'Floors above ground', type: 'number' },
          { id: 'floors_below_ground', label: 'Floors below ground', type: 'number' },
          { id: 'finished_date', label: 'Construction finished in', type: 'year' },
        ],
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
