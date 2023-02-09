/// <reference types="cypress" />
import lifeCycleStagesData from "../fixtures/getLifeCycleStages";
import adminAccountData from "../fixtures/getAdminAccount";
import { OPERATIONS } from "../support/operations";
import { schema } from "../../src/dataAccess";

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
      .mockGraphqlOps<OPERATIONS, 'addProject', OPERATIONS['addProject']>('addProject', {
        resolver: ({
          variables: {
            name,
            members: [{ userId }]
          },
        }) => ({
          addProject: {
            name,
            id: projectId,
            metaFields: { owner: userId },
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
    cy.get('[id=name]').type('My Project')
  })
})
