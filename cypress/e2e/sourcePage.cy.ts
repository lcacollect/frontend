import { GraphQlProjectSource, ProjectSourceType, schema, Unit } from '../../src/dataAccess'
import adminAccountData from '../fixtures/getAdminAccount'
import projectsData from '../fixtures/getProjects'
import projectSourcesData from '../fixtures/getProjectSources'
import projectMemberData from '../fixtures/getProjectMembers'
import { OPERATIONS } from '../support/operations'
import reportingSchemasData from '../fixtures/getSchemaForTasksPage'
/// <reference types="cypress" />

describe('Sources Page | without data', () => {
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
      .mockGraphqlOps<OPERATIONS, 'getSingleProject', OPERATIONS['getSingleProject']>('getSingleProject', {
        resolver: ({ variables: projectId }) => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccount', OPERATIONS['getAccount']>('getAccount', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSources', OPERATIONS['getProjectSources']>('getProjectSources', {
        resolver: () => ({ projectSources: [] }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectMembers', OPERATIONS['getProjectMembers']>('getProjectMembers', {
        resolver: () => projectMemberData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'addProjectSource', OPERATIONS['addProjectSource']>('addProjectSource', {
        resolver: () => ({
          addProjectSource: {
            id: '3481d0bb-a0b5-49fa-bdea-27a4253cff0a',
            name: 'S1',
            type: ProjectSourceType.Csv,
            dataId: 'dkjæfakjdæakjfædajfæajfæla',
          },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSchemasWithCategories', OPERATIONS['getProjectSchemasWithCategories']>(
        'getProjectSchemasWithCategories',
        {
          resolver: ({ variables: { projectId } }) => ({
            reportingSchemas: reportingSchemasData.data.reportingSchemas,
          }),
        },
      )

    cy.visit(`projects/${projectsData.data.projects[0].id}/sources`)
  })

  it('should display no sources initially', () => {
    cy.get('div').contains('Sources')
    cy.get('[data-testid=sources-table]').contains('No sources added')
  })

  it('should be possible to add a source', () => {
    cy.get('[data-testid=AddIcon]').click()
    cy.get('[data-testid=source-name]').type('S1')
    cy.get('[data-testid=source-type]').click().get('[data-value=CSV]').click()
    cy.get('input[type="file"]').attachFile('../fixtures/test.csv')
    cy.get('[data-testid=add-project-source-button]').click()
    cy.get('[data-testid=alert-snackbar]').contains('File uploaded! Do you want to add elements to project?')
    cy.get('[data-testid=sourceAlertBtnYes]').click()
    cy.get('[data-testid=elementFromSourceDialog]').contains('There is no soure! Add source first')
  })

  it('should be possible to download template', () => {
    cy.get('[data-testid=AddIcon]').click()
    cy.get('[data-testid=downloadTemplate]').click()
    cy.readFile('cypress/downloads/LCAcollect - Source Template.csv').should('contain', 'Id,Name,Description,Type Code,m,m2,m3,kg,pcs')
  })
})

describe('Sources Page | with data', () => {
  const existingSources = projectSourcesData.data.projectSources
  const existingSource = existingSources[0]
  const newSource = {
    id: '3481d0bb-a0b5-49fa-bdea-27a4253cff0a',
    name: 's2',
    type: ProjectSourceType.Csv,
    dataId: 'path/to/file/016c28e7-6305-40c9-8b2a-aa97f051051a',
    authorId: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c',
    author: { name: 'My Name', id: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c' },
    updated: '2023-01-01T01:23:45.272488',
    metaFields: {},
    interpretation: {
      interpretationName: 'Family and Type',
      [Unit.M2.toLowerCase()]: 'Area',
    },
  } as GraphQlProjectSource

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
      .mockGraphqlOps<OPERATIONS, 'getSingleProject', OPERATIONS['getSingleProject']>('getSingleProject', {
        resolver: ({ variables: projectId }) => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSources', OPERATIONS['getProjectSources']>('getProjectSources', {
        resolver: ({ variables: { projectId } }) => ({ projectSources: existingSources }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSourceData', OPERATIONS['getProjectSourceData']>('getProjectSourceData', {
        resolver: ({ variables: { projectId } }) => ({ projectSources: existingSources }),
      })
      .mockGraphqlOps<OPERATIONS, 'deleteProjectSource', OPERATIONS['deleteProjectSource']>('deleteProjectSource', {
        resolver: ({ variables: { id } }) => ({
          deleteProjectSource: existingSource.id,
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'updateProjectSourceInterpretation', OPERATIONS['updateProjectSourceInterpretation']>(
        'updateProjectSourceInterpretation',
        {
          resolver: ({ variables: { id, type, interpretation } }) => ({
            updateProjectSource: { id: newSource.id, interpretation: newSource.interpretation },
          }),
        },
      )
      .mockGraphqlOps<OPERATIONS, 'getProjectMembers', OPERATIONS['getProjectMembers']>('getProjectMembers', {
        resolver: () => projectMemberData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccount', OPERATIONS['getAccount']>('getAccount', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'addProjectSource', OPERATIONS['addProjectSource']>('addProjectSource', {
        resolver: () => ({
          addProjectSource: {
            id: '3481d0bb-a0b5-49fa-bdea-27a4253cff0a',
            name: 'S1',
            type: ProjectSourceType.Csv,
            dataId: 'dkjæfakjdæakjfædajfæajfæla',
          },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectSchemasWithCategories', OPERATIONS['getProjectSchemasWithCategories']>(
        'getProjectSchemasWithCategories',
        {
          resolver: ({ variables: { projectId } }) => ({
            reportingSchemas: reportingSchemasData.data.reportingSchemas,
          }),
        },
      )

    cy.visit(`projects/${projectsData.data.projects[0].id}/sources`)
  })

  it('should render a list of sources', () => {
    cy.get('div').contains('Sources')
    cy.get('[data-testid=sources-table]').contains('s2')
  })

  it('should render a list of source interpretations', () => {
    cy.get('div').contains('Source Interpretation')
    cy.get('[data-testid=source-interpretation-table]').contains('s2')
  })

  it('should be possible to delete a source', () => {
    cy.get(`[data-id="${existingSource.id}"] > .actions > .MuiDataGrid-actionsCell > [aria-label="Delete"]`).click()
  })

  it('should be possible to update a source interpretation', () => {
    // click first element in table
    cy.get(`[data-id=${existingSource.id}]`).last().click()
    // click checkbox in first column
    cy.get('input[type=checkbox]').first().click()
    // click parameter button
    cy.get(`button[value=${Unit.M2}]`).click()
    // verify checkbox in first column is disabled
    cy.get('input[type=checkbox]').first().should('be.disabled')
    // click checkbox in last column
    cy.get('input[type=checkbox]').last().click()
    // click Done button
    cy.get('button > p:contains("Done")').click()
  })

  it('should be possible to add a source and see existing', () => {
    cy.get('[data-testid=AddIcon]').click()
    cy.get('[data-testid=source-name]').type('S1')
    cy.get('[data-testid=source-type]').click().get('[data-value=CSV]').click()
    cy.get('input[type="file"]').attachFile('../fixtures/test.csv')
    cy.get('[data-testid=add-project-source-button]').click()
    cy.get('[data-testid=alert-snackbar]').contains('File uploaded! Do you want to add elements to project?')
    cy.get('[data-testid=sourceAlertBtnYes]').click()
    cy.get('[data-testid=elementFromSourceDialog]').find('[data-id]').should('have.length', 3)
  })
})
