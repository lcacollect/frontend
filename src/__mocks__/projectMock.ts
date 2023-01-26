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
              { id: 'heated_area', label: 'Heated Area (m²)', type: 'number' },
              { id: 'heat_usage', label: 'Heat use (kWh/m²/yr)', type: 'number' },
              { id: 'electricity_usage', label: 'Electricity use (kWh/m²/yr)', type: 'number' },
              { id: 'electricity_exported', label: 'Electricity exported to grid (kWh/m²/yr)', type: 'number' },
              {
                id: 'heat_source',
                label: 'Heating source',
                options: [
                  'Grid Power - Projection 2020 - 2040',
                  'District Heating - Projection 2020 - 2040',
                  'Gas - Projection 2020 - 2040',
                ],
              },
              {
                id: 'electricity_source',
                label: 'Electricity source',
                options: ['Grid Power - Projection 2020 - 2040'],
              },
            ],
            file: null,
          },
        ],
      },
    },
  },
]
