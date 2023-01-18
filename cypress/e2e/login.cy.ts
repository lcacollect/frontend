export {}

describe('Login Flow', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.clearLocalStorage()
    cy.clearCookies()
  })
  it('Should show login page before signing in', () => {
    cy.visit('/')
    cy.get('[data-testid=login-page]').contains('Login')
  })

  it('Should redirect to project list after login', () => {
    cy.visit('/')
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })
    cy.get('[data-testid=projects-homepage]')
  })
})
