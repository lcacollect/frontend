import {
  GraphQlProjectMember,
  GraphQlProjectMemberGraphQlProjectGroup,
  GraphQlSchemaElement,
  GraphQlTask,
  schema,
  TaskStatus,
  Unit,
} from '../../src/dataAccess'
import adminAccountData from '../fixtures/getAdminAccount'
import projectMembersData from '../fixtures/getProjectMembers'
import projectsData from '../fixtures/getProjects'
import projectSourcesData from '../fixtures/getProjectSources'
import reportingSchemasData from '../fixtures/getSchemaForBuildingComponents'
import { OPERATIONS } from '../support/operations'

/// <reference types="cypress" />
describe(
  'Building Components Page',
  {
    viewportWidth: 1400,
    viewportHeight: 1000,
  },
  () => {
    const existingProjectMember = projectMembersData.data.projectMembers[0] as GraphQlProjectMember
    const existingCategory = reportingSchemasData.data.reportingSchemas[0].categories[0]
    const existingNestedCategory = reportingSchemasData.data.reportingSchemas[0].categories[1]
    const existingNestedCategoryWithElements = reportingSchemasData.data.reportingSchemas[0].categories[2]
    const existingSources = projectSourcesData.data.projectSources
    const existingSourceWithValidInterpretation = projectSourcesData.data.projectSources[1]
    const existingSourceFile = projectSourcesData.data.projectSources[1].data
    const newSchemaElement = {
      id: '403d48c1-f93c-4a3c-b93a-23c77e4a5df1',
      name: 'New Element Name',
      quantity: 123,
      unit: Unit.Pcs,
      description: 'New Element Description',
      schemaCategory: {
        id: existingNestedCategoryWithElements.id,
        name: existingNestedCategoryWithElements.name,
      },
    } as GraphQlSchemaElement
    const existingTask = {
      id: '5c71c6f6-4278-41ab-953d-588fe1e5ccbe',
      name: 'Element Task 1',
      description: 'Element Task 1 Description',
      status: TaskStatus.Approved,
      reportingSchemaId: '6350d5ca-550f-4ddb-ab71-358402174eb4',
      dueDate: '2020-02-02',
      authorId: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
      author: {
        __typename: 'GraphQLProjectMember',
        id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
        name: 'Author 1',
      } as GraphQlProjectMemberGraphQlProjectGroup,
      assignee: {
        __typename: 'GraphQLProjectMember',
        name: 'Assignee 1 (Member)',
        id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
      } as GraphQlProjectMemberGraphQlProjectGroup,
      item: {
        __typename: 'GraphQLSchemaElement',
        id: '6dccd98e-cd7d-4c62-afb6-72f646056e8f',
        name: 'Element Task Item 1',
      },
      comments: [
        {
          id: '0921f829-246d-4ba4-80d1-67ab4c228f07',
          added: '2022-11-11',
          text: 'Comment text',
          author: {
            id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
            name: 'Author 1',
          },
          task: {
            id: '5c71c6f6-4278-41ab-953d-588fe1e5ccbe',
          },
        },
      ],
    } as GraphQlTask
    const newTask = {
      id: 'newTaskId',
      name: 'New Task Name',
      description: 'New Task Description',
      assignee: {
        id: 'newAssigneeId',
        name: 'New Assignee Name',
      },
      status: TaskStatus.Pending,
      comments: [
        {
          id: 'newCommentId',
          text: 'New Comment Text',
          added: '2020-02-02',
          authorId: '',
        },
      ],
      author: existingTask.author,
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
        .mockGraphqlOps<OPERATIONS, 'getAccount', OPERATIONS['getAccount']>('getAccount', {
          resolver: () => adminAccountData.data,
        })
        .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
          resolver: () => adminAccountData.data,
        })
        .mockGraphqlOps<OPERATIONS, 'getCommentsForTask', OPERATIONS['getCommentsForTask']>('getCommentsForTask', {
          resolver: ({ variables: taskId }) => ({
            comments: [],
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
        .mockGraphqlOps<OPERATIONS, 'getProjectSources', OPERATIONS['getProjectSources']>('getProjectSources', {
          resolver: ({ variables: { projectId } }) => ({ projectSources: existingSources }),
        })
        .mockGraphqlOps<OPERATIONS, 'getProjectSourceData', OPERATIONS['getProjectSourceData']>(
          'getProjectSourceData',
          {
            resolver: ({ variables: { projectId } }) => ({ projectSources: existingSources }),
          },
        )
        .mockGraphqlOps<OPERATIONS, 'getSchemaElements', OPERATIONS['getSchemaElements']>('getSchemaElements', {
          resolver: ({ variables: { schemaCategoryIds } }) => ({
            schemaElements: existingNestedCategoryWithElements.elements,
          }),
        })
        .mockGraphqlOps<OPERATIONS, 'getSingleTask', OPERATIONS['getSingleTask']>('getSingleTask', {
          resolver: ({ variables: { taskId, reportingSchemaId } }) => ({
            tasks: [existingTask],
          }),
        })
        .mockGraphqlOps<OPERATIONS, 'getTasks', OPERATIONS['getTasks']>('getTasks', {
          resolver: ({ variables: { reportingSchemaId } }) => ({
            tasks: [existingTask],
          }),
        })
        .mockGraphqlOps<OPERATIONS, 'addComment', OPERATIONS['addComment']>('addComment', {
          resolver: ({ variables: { taskId, text } }) => ({
            addComment: { ...newTask.comments[0] },
          }),
        })
        .mockGraphqlOps<OPERATIONS, 'addSchemaElement', OPERATIONS['addSchemaElement']>('addSchemaElement', {
          resolver: ({ variables: { schemaCategoryId, name, quantity, unit, description } }) => ({
            addSchemaElement: { ...newSchemaElement },
          }),
        })
        .mockGraphqlOps<OPERATIONS, 'addSchemaElementFromSource', OPERATIONS['addSchemaElementFromSource']>(
          'addSchemaElementFromSource',
          {
            resolver: ({ variables: { schemaCategoryId, sourceId, objectIds, quantities, units } }) => ({
              addSchemaElementFromSource: [newSchemaElement],
            }),
          },
        )
        .mockGraphqlOps<OPERATIONS, 'deleteSchemaElement', OPERATIONS['deleteSchemaElement']>('deleteSchemaElement', {
          resolver: ({ variables: { id } }) => ({
            deleteSchemaElement: existingNestedCategoryWithElements.elements[0].id,
          }),
        })
        .mockGraphqlOps<OPERATIONS, 'updateSchemaElement', OPERATIONS['updateSchemaElement']>('updateSchemaElement', {
          resolver: ({ variables: { id, name, schemaCategory, quantity, unit, description } }) => ({
            updateSchemaElement: { ...newSchemaElement },
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

      cy.visit(`/projects/${projectsData.data.projects[0].id}/components`)
    })

    const expandCategories = () => {
      cy.contains('h3', existingCategory.name).click()
      cy.contains('h6', existingNestedCategory.name).click()
    }

    const toggleTaskSelection = () => cy.get('[data-testid=AddTaskIcon]').click()

    it('should render a list of expandable categories and subcategories, with nested elements', () => {
      cy.contains('Building Components')
      expandCategories()
      cy.get(`[data-id=${existingNestedCategoryWithElements.elements[0].id}]`).within(() => {
        cy.contains('[data-field=name] > div', "Element Task Item 1")
      })
    })

    it('should be possible to add a building component element', () => {
      expandCategories()
      cy.get('[data-testid=AddCircleOutlineOutlinedIcon]').click()
      cy.get('[data-id]')
        .last()
        .within(() => {
          cy.get('[data-field=schemaCategory]').click()
        })
      cy.get(`li[data-value='bb945391-3208-4f53-85d5-6aed9d653bfa']`).click()
      cy.get('[data-id]')
        .last()
        .within(() => {
          cy.get('input[type=text]').type(newSchemaElement.name)
          cy.get('input[type=number]').type('{selectall}{backspace}')
            .type(newSchemaElement.quantity.toString())
          cy.get('[data-field=unit]').click()
        })
      cy.get(`li[data-value=${newSchemaElement.unit}]`).click({force: true})
      cy.get('textarea[rows]').type(newSchemaElement.description, {force: true})
      cy.get('[data-testid=SaveIcon]').click({ force: true })
    })

    it('should be possible to add multiple building component elements from a source', () => {
      expandCategories()
      cy.get('[data-testid=ControlPointDuplicateOutlinedIcon]').click()
      cy.get(`button[value="${existingSourceWithValidInterpretation.id}"]`).click()

      cy.contains('label', 'Category Name').click()
      cy.get(`input[value="${existingNestedCategory.name}"]`)

      // click selectAll checkbox in left table
      cy.get('span[title="Click to (de)select all rows"]').within(() => {
        cy.get('input[type=checkbox]').click()
      })
      // click selectAll checkbox in right table
      cy.get('span[title="Click to select all rows"]').within(() => {
        cy.get('input[type=checkbox]').click()
      })
      cy.contains('No rows')

      // click all checkboxes individually in left table
      cy.get('span[title="Click to (de)select this row"] > input[type=checkbox]').click({ multiple: true })

      // change unit for first row in right table
      cy.get('div[data-id=0]')
        .last()
        .within(() => {
          cy.get('[data-field=source]').contains(
            `${existingSourceWithValidInterpretation.type}: ${existingSourceWithValidInterpretation.name}`,
          )
          cy.get('[data-field=quantity]').contains(existingSourceFile.rows[0]['Area'])
          cy.get('[data-field=unit]').dblclick()
        })
      cy.get(`li[data-value=${newSchemaElement.unit}]`).click()
      cy.get('div[data-id=0]')
        .last()
        .within(() => {
          cy.get(`[data-field=quantity] > div > input[value=${existingSourceFile.rows[0]['Count']}]`)
        })
      // click Done
      cy.get('button:contains("Done")').click()
    })

    it('should be possible to delete a building component element', () => {
      expandCategories()
      cy.get(`[data-id=${existingNestedCategoryWithElements.elements[0].id}]`).within(() => {
        cy.get('[data-testid=DeleteIcon]').click()
      })
      cy.get(`[data-id=${existingNestedCategoryWithElements.elements[0].id}]`).should('not.exist')
    })

    it('should be possible to edit a building component element', () => {
      expandCategories()
      cy.get(`[data-id=${existingNestedCategoryWithElements.elements[0].id}]`).within(() => {
        cy.get('[data-testid=EditIcon]').click()
        cy.get('[data-field=schemaCategory]').click()
      })
      cy.get(`li[data-value='bb945391-3208-4f53-85d5-6aed9d653bfa']`).click()
      cy.get(`[data-id=${existingNestedCategoryWithElements.elements[0].id}]`).within(() => {
        cy.get('[data-field=name] > div').type('{selectall}{backspace}').type(newSchemaElement.name)
        cy.get('input[type=number]').type('{selectall}{backspace}').type(newSchemaElement.quantity.toString())
        cy.get('[data-field=unit]').click()
      })
      cy.get(`li[data-value=${newSchemaElement.unit}]`).click()
      cy.get('textarea[rows]').type('{selectall}{backspace}').type(newSchemaElement.description)
      cy.get('[data-testid=SaveIcon]').click({ force: true }) // force is needed, since icon is hidden behind textarea
    })

    it('should be possible to add a task to a building component element', () => {
      expandCategories()
      toggleTaskSelection()
      cy.get(`input[value=${existingNestedCategoryWithElements.elements[0].id}]`).click()
      toggleTaskSelection()

      // Title
      cy.get('label:contains("Title") + div > input[type="text"][value]')
        .first()
        .type('{selectall}{backspace}')
        .type(newTask.name)
      // Desc.
      cy.get('label:contains("Description") + div > input[type="text"][value]')
        .first()
        .type('{selectall}{backspace}')
        .type(newTask.description)
      // Assigned To
      cy.get('[data-testid=ArrowDropDownIcon]').click()
      cy.get('li[data-option-index=1]').click()
      // Status
      cy.get('h3:contains("Status") + div > button > div > div[title="Approved"]').click()
      // Done
      cy.get('button > p:contains("Done")').click()
    })

    it('should be possible to add a task to a category', () => {
      toggleTaskSelection()
      cy.get(`input[value=${existingCategory.id}]`).click()
      toggleTaskSelection()

      // Title
      cy.get('label:contains("Title") + div > input[type="text"][value]')
        .first()
        .type('{selectall}{backspace}')
        .type(newTask.name)
      // Desc.
      cy.get('label:contains("Description") + div > input[type="text"][value]')
        .first()
        .type('{selectall}{backspace}')
        .type(newTask.description)
      // Assigned To
      cy.get('[data-testid=ArrowDropDownIcon]').click()
      cy.get('li[data-option-index=1]').click()
      // Status
      cy.get('h3:contains("Status") + div > button > div > div[title="Approved"]').click()
      // Done
      cy.get('button > p:contains("Done")').click()
    })
  },
)
