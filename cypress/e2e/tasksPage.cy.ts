import { GraphQlProjectMember, GraphQlTask, schema, TaskStatus } from '../../src/dataAccess'
import projectMembersData from '../fixtures/getProjectMembers'
import projectsData from '../fixtures/getProjects'
import reportingSchemasData from '../fixtures/getSchemaForTasksPage'
import tasksData from '../fixtures/getTasks'
import { OPERATIONS } from '../support/operations'

/// <reference types="cypress" />
describe('Project Tasks Page', () => {
  const existingTask = tasksData.data.tasks[0]
  const existingProjectMember = projectMembersData.data.projectMembers[0] as GraphQlProjectMember
  const newTask = {
    id: 'newTaskId',
    name: 'New Task Name',
    description: 'New Task Description',
    assignee: {
      id: 'newAssigneeId',
      name: 'New Assignee Name',
    },
    status: TaskStatus.Pending,
    comments: [{
      id: 'newCommentId',
      text: 'New Comment Text',
      added: '2020-02-02',
      authorId: ''
    }],
    author: existingTask.author

  } as GraphQlTask

  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })

    cy.mockGraphql(schema)
      .mockGraphqlOps<OPERATIONS, 'getCommentsForTask', OPERATIONS['getCommentsForTask']>('getCommentsForTask', {
        resolver: ({ variables: taskId }) => ({
          comments: existingTask.comments
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getSingleProject', OPERATIONS['getSingleProject']>('getSingleProject', {
        resolver: ({ variables: projectId }) => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjects', OPERATIONS['getProjects']>('getProjects', {
        resolver: () => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectGroups', OPERATIONS['getProjectGroups']>('getProjectGroups', {
        resolver: ({ variables: { projectId } }) => ({
          projectGroups: existingProjectMember.projectGroups,
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectMembers', OPERATIONS['getProjectMembers']>('getProjectMembers', {
        resolver: ({ variables: { projectId } }) => ({
          projectMembers: [existingProjectMember],
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getSingleTask', OPERATIONS['getSingleTask']>('getSingleTask', {
        resolver: ({ variables: { taskId, reportingSchemaId } }) => ({
          tasks: tasksData.data.tasks.slice(0, 1),
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getTasksForTasksPage', OPERATIONS['getTasksForTasksPage']>('getTasksForTasksPage', {
        resolver: ({ variables: { reportingSchemaId } }) => tasksData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'addComment', OPERATIONS['addComment']>('addComment', {
        resolver: ({ variables: { taskId, text } }) => ({
          addComment: { ...newTask.comments[0] },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'addTask', OPERATIONS['addTask']>('addTask', {
        resolver: ({ variables: { reportingSchemaId, dueDate, name, item, description, status, assignee } }) => ({
          addTask: { id: newTask.id },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'updateTask', OPERATIONS['updateTask']>('updateTask', {
        resolver: ({ variables: { taskId, name, description, status, assignee } }) => ({
          updateTask: { id: newTask.id },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSchemasWithCategories', OPERATIONS['getProjectSchemasWithCategories']>(
        'getProjectSchemasWithCategories',
        {
          resolver: ({ variables: { projectId } }) => ({
            reportingSchemas: reportingSchemasData.data.reportingSchemas,
          }),
        },
      )

    cy.visit(`/projects/${projectsData.data.projects[0].id}/tasks`)
  })

  it('should render a list of tasks', () => {
    cy.contains('Tasks')
    cy.get('[data-testid=tasks-table]').contains(existingTask.name)
  })

  it('should be possible to navigate to building components page', () => {
    cy.get(`[data-id=${existingTask.id}]`).within(() => {
      cy.get('[data-testid=LinkIcon]').click()
    })
    cy.url().should('include', 'components')
  })
  
  it('should be possible to edit a task', () => {
    // Open Dialog
    cy.get(`[data-id=${existingTask.id}]`).click()
    // Title
    cy.get(`input[value='${existingTask.name}']`).type('{selectall}{backspace}').type(newTask.name)
    // Desc.
    cy.get(`input[value='${existingTask.description}']`).type('{selectall}{backspace}').type(newTask.description)
    // Assigned To
    cy.get('[data-testid=ArrowDropDownIcon]').click()
    cy.get('li[data-option-index=1]').click()
    // Status
    cy.get('h3:contains("Status") + div > button > div > div[title="Pending"]').click()
    // Comment
    cy.get('input[placeholder="Add new comment"]').type(newTask.comments[0].text)
    cy.get('[data-testid=SendIcon]').click()
    // Done
    cy.get('button > p:contains("Done")').click()
  })
})
