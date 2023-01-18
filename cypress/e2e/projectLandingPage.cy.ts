/// <reference types="cypress" />
import projectsData from '../fixtures/getProjects'
import { OPERATIONS } from '../support/operations'
import { schema } from '../../src/dataAccess'
import adminAccountData from '../fixtures/getAdminAccount'

describe('Project Landing Page', () => {
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
      .mockGraphqlOps<OPERATIONS, 'getProjectMembers', OPERATIONS['getProjectMembers']>('getProjectMembers', {
        resolver: () => ({
          projectMembers: [
            {
              company: 'IT Minds',
              email: 'dummy@it-minds.dk',
              userId: 'askjdfæjdaæfkjdsaækfj',
              id: '5',
              name: 'Martin',
              leaderOf: null,
              lastLogin: null,
              projectGroups: null
            },
          ],
        }),
      })

    cy.visit('/')
  })

  it('should should display project landing page', () => {
    cy.get(`[data-id="${projectsData.data.projects[0].id}"]`).click()
    cy.url().should('include', `projects/${projectsData.data.projects[0].id}`)
    cy.get('[data-testid=project-landing-page]').should('exist')
  })
})
