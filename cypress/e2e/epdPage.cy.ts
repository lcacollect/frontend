import projectsData from '../fixtures/getProjects'
import projectEpdsData from '../fixtures/getProjectEpds'
import projectEpdData from '../fixtures/getProjectEpd'
import { schema } from '../../src/dataAccess'
import { OPERATIONS } from '../support/operations'
import adminAccountData from '../fixtures/getAdminAccount'

export {}

describe('EPD Page', () => {
  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })
    cy.mockGraphql(schema)
      .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getSingleProject', OPERATIONS['getSingleProject']>('getSingleProject', {
        resolver: ({ variables: projectId }) => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectEpds', OPERATIONS['getProjectEpds']>('getProjectEpds', {
        resolver: ({ variables: { projectId, filters } }) => projectEpdsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectEpd', OPERATIONS['getProjectEpd']>('getProjectEpd', {
        resolver: ({ variables: { projectId, epdId } }) => projectEpdData.data,
      })
    cy.visit(`projects/${projectsData.data.projects[0].id}/epds`)
  })

  it('should display EPDs on EPD page', () => {
    cy.get('[data-testid=epd-page]').should('exist')
    cy.get('[data-testid=FilterListIcon]').click()
    cy.get('[data-testid=search-input]').type('affald')
    cy.get('[data-testid=epd-list-item]').contains('Affald (forbrænding), kunststof, fjernvarme').should('exist')
  })

  it('should display detailed EPD info', () => {
    cy.get('[data-testid=epd-page]').should('exist')
    cy.get('[data-testid=epd-list-item]').contains('Affald (forbrænding), kunststof, fjernvarme').click()
    cy.get('[data-testid=epd-detail]').contains('Affald')
  })
})
