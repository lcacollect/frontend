import { GetReportingSchemasDocument } from '@lcacollect/project'
import { MockedResponse } from '@apollo/client/testing'
import {
  AddReportingSchemaFromTemplateDocument,
  GetSchemaTemplatesDocument,
  GetProjectSchemasDocument,
} from '../dataAccess'
import getReportingSchemasResponse from './getReportingSchemas'
import getSchemaTemplatesResponse from './getSchemaTemplates'
import getProjectSchemasResponse from './getProjectSchemas'
import addReportingSchemaFromTemplateResponse from './addReportingSchemaFromTemplate'

export const reportingSchemaErrorMock: MockedResponse[] = [
  {
    request: {
      query: GetReportingSchemasDocument,
      variables: { projectId: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785' },
    },
    error: new Error('An error occurred'),
  },
  {
    request: {
      query: AddReportingSchemaFromTemplateDocument,
      variables: {
        templateId: 'asdf54321',
        name: 'My Reporting Schema',
        projectId: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785',
      },
    },
    error: new Error('An error occurred'),
  },
  {
    request: {
      query: GetSchemaTemplatesDocument,
    },
    error: new Error('An error occurred'),
  },
  {
    request: {
      query: GetProjectSchemasDocument,
      variables: {
        projectId: 'acfa456f-6628-4c0d-a0c8-1a53b1a46785',
      },
    },
    error: new Error('An error occurred'),
  },
]
