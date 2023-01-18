/// <reference types="cypress" />
describe('Mobile Warning Page', () => {
  const viewportWidth = 500
  const viewportHeight = 500
  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })
    cy.viewport(viewportWidth, viewportHeight)
    cy.visit('/')
  })

  it('should display mobile warning on smaller screens', () => {
    cy.get('[data-testid=PhoneAndroidIcon]')
    cy.get('[data-testid=DoDisturbIcon]')
    cy.contains('Thank you for your interest')
  })
})
