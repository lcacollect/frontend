/// <reference types="cypress" />
import { schema } from '../../src/dataAccess'
import adminAccountData from '../fixtures/getAdminAccount'
import projectsData from '../fixtures/getProjects'
import projectSchemasData from '../fixtures/getProjectSchemas'
import { OPERATIONS } from '../support/operations'

describe('Export Page', () => {
  const exportedReportingSchema =
    'Y2xhc3M7bmFtZTtzb3VyY2U7cXVhbnRpdHk7dW5pdDtkZXNjcmlwdGlvbgoxMHggfCBUZXJyw6ZuO1dhbGwgMDtUeXBlZCBpbjsyLjA7bTI7VGhpcyBpcyBteSB3YWxsIDAKMTB4IHwgVGVycsOmbjtXYWxsIDE7VHlwZWQgaW47NS4wO20yO1RoaXMgaXMgbXkgd2FsbCAxCjEweCB8IFRlcnLDpm47V2FsbCAyO1R5cGVkIGluOzguMDttMjtUaGlzIGlzIG15IHdhbGwgMg=='
  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })
    cy.mockGraphql(schema)
      .mockGraphqlOps<OPERATIONS, 'exportReportingSchema', OPERATIONS['exportReportingSchema']>(
        'exportReportingSchema',
        {
          resolver: ({ variables: reportingSchemaId, exportFormat }) => ({
            exportReportingSchema: exportedReportingSchema,
          }),
        },
      )
      .mockGraphqlOps<OPERATIONS, 'getSingleProject', OPERATIONS['getSingleProject']>('getSingleProject', {
        resolver: ({ variables: projectId }) => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectName', OPERATIONS['getProjectName']>('getProjectName', {
        resolver: ({ variables: projectId }) => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjects', OPERATIONS['getProjects']>('getProjects', {
        resolver: () => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
        resolver: () => ({
          account: { roles: adminAccountData.data.account.roles },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSchemas', OPERATIONS['getProjectSchemas']>('getProjectSchemas', {
        resolver: ({ variables: { projectId } }) => ({
          reportingSchemas: projectSchemasData.data.reportingSchemas,
        }),
      })

    cy.visit(`/projects/${projectsData.data.projects[0].id}/export`)
  })

  it('should contain export card', () => {
    cy.contains('Export Project')
    cy.contains('label', 'Format')
    cy.get('select')
    cy.get('option[value=csv]')
    cy.get('option[value=lcabyg]')
    cy.contains('button', 'Export')
  })

  it('should allow exporting CSV', () => {
    cy.get('select').select('csv')
    cy.get('button:contains(Export)').click()
  })

  it('should allow exporting LCABYG', () => {
    cy.get('select').select('lcabyg')
    cy.get('button:contains(Export)').click()
  })
})
