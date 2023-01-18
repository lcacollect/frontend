export {}

describe('Project 404 Page', () => {
  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })
    cy.visit('gibberishroute/gibberishroute')
  })

  it('should display 404 page', () => {
    cy.get('[id=404-description]').contains('Sorry, but the page you were trying to view does not exist.')
  })
})
