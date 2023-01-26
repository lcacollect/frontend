import { MockedResponse } from '@apollo/client/testing'
import { GetSingleProjectDocument } from '../dataAccess'
import getSingleProjectResponse from './getSingleProject'

const projectId = getSingleProjectResponse.data.projects[0].id

export const projectMock: MockedResponse[] = [
  {
    request: {
      query: GetSingleProjectDocument,
      variables: { id: projectId },
    },
    result: getSingleProjectResponse,
  },
]
