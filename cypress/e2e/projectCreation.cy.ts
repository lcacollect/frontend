/// <reference types="cypress" />
import lifeCycleStagesData from '../fixtures/getLifeCycleStages'
import adminAccountData from '../fixtures/getAdminAccount'
import nonAdminAccountData from '../fixtures/getAccount'
import { OPERATIONS } from '../support/operations'
import { schema } from '../../src/dataAccess'

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
      .mockGraphqlOps<OPERATIONS, 'addProject', OPERATIONS['addProject']>('addProject', {
        resolver: ({ variables: { name } }) => ({
          addProject: {
            name,
            id: projectId,
            stages: [],
          },
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
      .mockGraphqlOps<OPERATIONS, 'getAccount', OPERATIONS['getAccount']>('getAccount', {
        resolver: () => adminAccountData.data,
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
    cy.get('[data-testid=AddIcon]').click()
    cy.url().should('include', 'settings')
    cy.get('[id=name]').type('My Project')
  })
})

describe('Project Creation Flow | Non-admin user', () => {
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
      .mockGraphqlOps<OPERATIONS, 'addProject', OPERATIONS['addProject']>('addProject', {
        resolver: ({ variables: { name } }) => ({
          addProject: {
            name,
            id: projectId,
            stages: [],
          },
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
      .mockGraphqlOps<OPERATIONS, 'getAccount', OPERATIONS['getAccount']>('getAccount', {
        resolver: () => nonAdminAccountData.data,
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

  it('should NOT display icon button to add projects for non-admin', () => {
    cy.contains('Recent Projects')
    cy.contains('Projects')
  })
})
