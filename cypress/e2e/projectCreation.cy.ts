/// <reference types="cypress" />
import lifeCycleStagesData from '../fixtures/getLifeCycleStages'
import adminAccountData from '../fixtures/getAdminAccount'
import { OPERATIONS } from '../support/operations'
import { schema } from '../../src/dataAccess'
import schemaTemplatesData from '../fixtures/getSchemaTemplates'
import projectSchemasData from '../fixtures/getProjectSchemas'
import epdsData from '../fixtures/getEpds'
import projectEpdsData from '../fixtures/getProjectEpds'

describe('Project Creation Flow', () => {
  beforeEach(() => {
    const projectId = 'acfa456f-6628-4c0d-a0c8-1a53b1a46785'
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
      .mockGraphqlOps<OPERATIONS, 'getSchemaTemplates', OPERATIONS['getSchemaTemplates']>('getSchemaTemplates', {
        resolver: () => schemaTemplatesData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSchemas', OPERATIONS['getProjectSchemas']>('getProjectSchemas', {
        resolver: ({ variables: { projectId } }) => ({
          reportingSchemas: projectSchemasData.data.reportingSchemas,
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getEpds', OPERATIONS['getEpds']>('getEpds', {
        resolver: () => epdsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'addProject', OPERATIONS['addProject']>('addProject', {
        resolver: ({
                     variables: {
                       name,
                       members: [{ userId }],
                     },
                   }) => ({
          addProject: {
            name,
            id: projectId,
            metaFields: { owner: userId },
          },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'addProjectEpds', OPERATIONS['addProjectEpds']>('addProjectEpds', {
        resolver: ({ variables: { projectId, epdIds } }) => ({
          addProjectEpds: projectEpdsData.data.projectEpds
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getSingleProject', OPERATIONS['getSingleProject']>('getSingleProject', {
        resolver: ({ variables: { id: projectId } }) => ({
          projects: [
            {
              id: projectId,
              projectId: null,
              name: '',
              client: null,
              domain: null,
              address: null,
              city: null,
              country: null,
              metaFields: {},
            },
          ],
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getLifeCycleStages', OPERATIONS['getLifeCycleStages']>('getLifeCycleStages', {
        resolver: () => lifeCycleStagesData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjects', OPERATIONS['getProjects']>('getProjects', {
        resolver: () => ({ projects: [] }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectStages', OPERATIONS['getProjectStages']>('getProjectStages', {
        resolver: () => ({ projectStages: [] }),
      })
    cy.visit('/')
  })

  it('should navigate to settings page on icon button click', () => {
    cy.wait(500)
    cy.get('[data-testid=AddIcon]').click()
    cy.wait(500)
    cy.url().should('include', 'settings')
    cy.get('[id=name]').type('My Project')
  })
})
