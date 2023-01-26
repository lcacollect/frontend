/// <reference types="cypress" />
import { schema, GraphQlSchemaTemplate } from '../../src/dataAccess'
import adminAccountData from '../fixtures/getAdminAccount'
import schemaTemplatesData from '../fixtures/getSchemaTemplates'
import { OPERATIONS } from '../support/operations'

describe('Admin Page', () => {
  const existingSchemaTemplate = schemaTemplatesData.data.schemaTemplates[0]
  const newSchemaTemplate = {
    id: 'newSchemaTemplate',
    name: 'New Schema Template',
    schema: {
      id: '',
      name: 'BIM7AA',
      projectId: 'COWI 1',
    },
  } as GraphQlSchemaTemplate

  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })
    cy.mockGraphql(schema)
      .mockGraphqlOps<OPERATIONS, 'getSchemaTemplates', OPERATIONS['getSchemaTemplates']>('getSchemaTemplates', {
        resolver: () => schemaTemplatesData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
        resolver: () => ({
          account: { roles: adminAccountData.data.account.roles },
        }),
      })

    cy.visit('/admin')
  })

  it('should list schema templates', () => {
    cy.contains('Template management')
    cy.get(`[data-id=${existingSchemaTemplate.id}]`).within(() => {
      cy.get('[data-field=name]').contains(existingSchemaTemplate.name)
      cy.get('[data-field=typecode]').contains(existingSchemaTemplate.schema.name)
    })

    cy.get('[data-testid=DeleteOutlinedIcon]').first().click()
  })

  it('should allow creating schema template', () => {
    cy.contains('button', 'Create Template').click()

    cy.contains('p', 'Name for template')
    cy.contains('label', 'Name')
    cy.get('input[value]').type(newSchemaTemplate.name)
    cy.contains('button > p', 'Done').click()
  })

  it('should allow editing schema template', () => {
    cy.get(`[data-id=${existingSchemaTemplate.id}]`).within(() => {
      cy.get('[data-testid=EditIcon]').click()
    })
    cy.get('input[value]').type(newSchemaTemplate.name)
    cy.contains('button > p', 'Cancel').click()
  })

  it('should allow deleting schema template', () => {
    cy.get(`[data-id=${existingSchemaTemplate.id}]`).within(() => {
      cy.get('[data-testid=DeleteOutlinedIcon]').click()
    })
  })

  it('should allow adding typecode', () => {
    cy.contains('button', 'Add Typecode').click()

    cy.contains('p', 'Name for import')
    cy.get('input[type="text"]').first().type(newSchemaTemplate.schema.name)

    cy.contains('label', 'File')
    cy.get('input[type="file"]').attachFile('../fixtures/test.csv')

    cy.contains('button > p', 'Add').click()
  })
})
