import {
  useAddCommentMutation,
  useAddProjectSourceMutation,
  useAddSchemaElementFromSourceMutation,
  useAddSchemaElementMutation,
  useAddTaskMutation,
  useDeleteProjectSourceMutation,
  useDeleteSchemaElementMutation,
  useExportReportingSchemaQuery,
  useGetCommentsForTaskQuery,
  useGetProjectNameQuery,
  useGetProjectSchemasQuery,
  useGetProjectSchemasWithCategoriesQuery,
  useGetProjectSourceDataQuery,
  useGetProjectSourcesQuery,
  useGetSchemaElementsQuery,
  useGetSchemaTemplatesQuery,
  useGetSingleTaskQuery,
  useGetTasksForTasksPageQuery,
  useGetTasksQuery,
  useUpdateProjectSourceInterpretationMutation,
  useUpdateSchemaElementMutation,
  useUpdateTaskMutation,
} from '@lcacollect/documentation'
import { MutationFN, QueryFN } from '@lcacollect/e2e-testing'
import {
  useAddProjectGroupMutation,
  useAddProjectMemberMutation,
  useAddProjectMembersToGroupMutation,
  useAddProjectMutation,
  useDeleteProjectGroupMutation,
  useDeleteProjectMemberMutation,
  useGetAccountQuery,
  useGetLifeCycleStagesQuery,
  useGetProjectGroupsQuery,
  useGetProjectMembersQuery,
  useGetProjectsQuery,
  useGetProjectStagesQuery,
  useGetSingleProjectQuery,
  useUpdateProjectGroupMutation,
} from '@lcacollect/project'
import { useAddProjectEpdsMutation, useGetAccountRolesQuery, useGetEpdsQuery } from '../../src/dataAccess'
import { useGetProjectEpdsQuery, useGetProjectEpdQuery, useGetAssembliesQuery } from '@lcacollect/assembly'

export interface OPERATIONS {
  exportReportingSchema: QueryFN<typeof useExportReportingSchemaQuery>
  getAccount: QueryFN<typeof useGetAccountQuery>
  getAccountRoles: QueryFN<typeof useGetAccountRolesQuery>
  getCommentsForTask: QueryFN<typeof useGetCommentsForTaskQuery>
  getLifeCycleStages: QueryFN<typeof useGetLifeCycleStagesQuery>
  getProjects: QueryFN<typeof useGetProjectsQuery>
  getProjectGroups: QueryFN<typeof useGetProjectGroupsQuery>
  getProjectMembers: QueryFN<typeof useGetProjectMembersQuery>
  getProjectName: QueryFN<typeof useGetProjectNameQuery>
  getProjectSchemasWithCategories: QueryFN<typeof useGetProjectSchemasWithCategoriesQuery>
  getProjectSchemas: QueryFN<typeof useGetProjectSchemasQuery>
  getProjectSources: QueryFN<typeof useGetProjectSourcesQuery>
  getProjectSourceData: QueryFN<typeof useGetProjectSourceDataQuery>
  getProjectStages: QueryFN<typeof useGetProjectStagesQuery>
  getSchemaElements: QueryFN<typeof useGetSchemaElementsQuery>
  getSchemaTemplates: QueryFN<typeof useGetSchemaTemplatesQuery>
  getSingleProject: QueryFN<typeof useGetSingleProjectQuery>
  getSingleTask: QueryFN<typeof useGetSingleTaskQuery>
  getTasks: QueryFN<typeof useGetTasksQuery>
  getTasksForTasksPage: QueryFN<typeof useGetTasksForTasksPageQuery>
  getProjectEpds: QueryFN<typeof useGetProjectEpdsQuery>
  getProjectEpd: QueryFN<typeof useGetProjectEpdQuery>
  getEpds: QueryFN<typeof useGetEpdsQuery>
  getAssemblies: QueryFN<typeof useGetAssembliesQuery>
  addComment: MutationFN<typeof useAddCommentMutation>
  addProject: MutationFN<typeof useAddProjectMutation>
  addProjectMember: MutationFN<typeof useAddProjectMemberMutation>
  addProjectMembersToGroup: MutationFN<typeof useAddProjectMembersToGroupMutation>
  addProjectGroup: MutationFN<typeof useAddProjectGroupMutation>
  addProjectSource: MutationFN<typeof useAddProjectSourceMutation>
  addSchemaElement: MutationFN<typeof useAddSchemaElementMutation>
  addSchemaElementFromSource: MutationFN<typeof useAddSchemaElementFromSourceMutation>
  addTask: MutationFN<typeof useAddTaskMutation>
  addProjectEpds: MutationFN<typeof useAddProjectEpdsMutation>
  deleteProjectGroup: MutationFN<typeof useDeleteProjectGroupMutation>
  deleteProjectMember: MutationFN<typeof useDeleteProjectMemberMutation>
  deleteProjectSource: MutationFN<typeof useDeleteProjectSourceMutation>
  deleteSchemaElement: MutationFN<typeof useDeleteSchemaElementMutation>
  updateProjectGroup: MutationFN<typeof useUpdateProjectGroupMutation>
  updateSchemaElement: MutationFN<typeof useUpdateSchemaElementMutation>
  updateTask: MutationFN<typeof useUpdateTaskMutation>
  updateProjectSourceInterpretation: MutationFN<typeof useUpdateProjectSourceInterpretationMutation>
}
