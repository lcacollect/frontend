/// <reference types="cypress" />
import projectsData from '../fixtures/getProjects'
import { schema } from '../../src/dataAccess'
import { OPERATIONS } from '../support/operations'
import adminAccountData from '../fixtures/getAdminAccount'
import epdsData from '../fixtures/getEpds'
import lifeCycleStagesData from '../fixtures/getLifeCycleStages'

describe('Projects Home Page', () => {
  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })
    cy.mockGraphql(schema)
      .mockGraphqlOps<OPERATIONS, 'getProjects', OPERATIONS['getProjects']>('getProjects', {
        resolver: () => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccount', OPERATIONS['getAccount']>('getAccount', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getEpds', OPERATIONS['getEpds']>('getEpds', {
        resolver: () => epdsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getLifeCycleStages', OPERATIONS['getLifeCycleStages']>('getLifeCycleStages', {
        resolver: () => lifeCycleStagesData.data,
      })

    cy.visit('/')
  })

  it('should list projects', () => {
    cy.get('[data-testid=recent-projects]').contains('Recent Projects')
    cy.get('[data-testid=projects-table]').should('exist')
    cy.get('[data-testid=projects-table]').contains('COWI 1')
  })
})
