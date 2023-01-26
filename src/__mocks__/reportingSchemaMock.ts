import { GetReportingSchemasDocument } from '@lcacollect/project'
import { MockedResponse } from '@apollo/client/testing'
import {
  AddReportingSchemaFromTemplateDocument,
  GetSchemaTemplatesDocument,
  GetProjectSchemasDocument,
} from '../dataAccess'

export const reportingSchemaMock: MockedResponse[] = [
  {
    request: {
      query: GetReportingSchemasDocument,
      variables: { id: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785' },
    },
    result: {
      data: {
        reportingSchemas: [{ id: 'ghi789' }, { id: 'jkl012' }, { id: 'mno345' }],
      },
    },
  },
  {
    request: {
      query: AddReportingSchemaFromTemplateDocument,
      variables: {
        templateId: 'abc123',
        name: 'My Reporting Schema',
        projectId: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785',
      },
    },
    result: {
      data: {
        addReportingSchemaFromTemplate: {
          id: 'ghi789',
          name: 'My Reporting Schema',
        },
      },
    },
  },
  {
    request: {
      query: GetSchemaTemplatesDocument,
    },
    result: {
      data: {
        schemaTemplates: [
          {
            id: 'abc123',
            name: 'Template 1',
            schema: {
              name: 'Schema 1',
              id: 'def456',
            },
          },
          {
            id: 'ghi789',
            name: 'Template 2',
            schema: {
              name: 'Schema 2',
              id: 'jkl012',
            },
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetProjectSchemasDocument,
      variables: {
        projectId: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785',
      },
    },
    result: {
      data: {
        reportingSchemas: [
          {
            id: 'ghi789',
            name: 'Schema 1',
          },
          {
            id: 'jkl012',
            name: 'Schema 2',
          },
          {
            id: 'mno345',
            name: 'Schema 3',
          },
        ],
      },
    },
  },
]
