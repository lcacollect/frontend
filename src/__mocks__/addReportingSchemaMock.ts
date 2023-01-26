// // addReportingSchemaFromTemplate(templateId: $templateId, name: $name, projectId: $projectId) {
// //     id
// //     name
// //   }
// import { MockedResponse } from '@apollo/client/testing'
// export const membersTableMock: MockedResponse[] = [
//     {
//       request: {
//         query: GetSingleProjectDocument,
//         variables: { id: projectId },
//       },
//       result: getSingleProjectResponse,
//     },
//     {
//       request: {
//         query: GetAccountDocument,
//       },
//       result: getAccountResponse,
//     },
//   ]

// import {
//   GetAccountDocument,
//   GetProjectGroupsDocument,
//   GetProjectMembersDocument,
//   GetSingleProjectDocument,
// } from '../dataAccess'
// import getAccountResponse from './getAccount'
// import getProjectGroupsResponse from './getProjectGroups'
// import getProjectMembersResponse from './getProjectMembers'
// import GetReportingSchemasDocument from './getSingleProject'

// export const membersTableMock: MockedResponse[] = [
//   {
//     request: {
//       query: GetReportingSchemasDocument,
//       variables: { id: '' },
//     },
//     result: getSingleProjectResponse,
//   },
//   {
//     request: {
//       query: GetAccountDocument,
//     },
//     result: getAccountResponse,
//   },
//   {
//     request: {
//       query: GetProjectMembersDocument,
//       variables: { projectId: projectId },
//     },
//     result: getProjectMembersResponse,
//   },
//   {
//     request: {
//       query: GetProjectGroupsDocument,
//       variables: { projectId: projectId },
//     },
//     result: getProjectGroupsResponse,
//   },
// ]
