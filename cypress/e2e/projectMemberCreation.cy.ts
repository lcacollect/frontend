import { GraphQlProjectMember, schema } from '../../src/dataAccess'
import adminAccountData from '../fixtures/getAdminAccount'
import projectMembersData from '../fixtures/getProjectMembers'
import projectsData from '../fixtures/getProjects'
import { OPERATIONS } from '../support/operations'
import { GraphQlProjectGroup } from './../../src/dataAccess/generated'

describe('Project Member Creation Flow', () => {
  const projectId = projectsData.data.projects[0].projectId
  const existingProjectMember = projectMembersData.data.projectMembers[0] as GraphQlProjectMember
  const existingProjectMemberGroup = existingProjectMember.projectGroups[0]
  const newProjectMemberId = 'newProjectMemberId'
  const newProjectMember = {
    id: newProjectMemberId,
    name: 'Test Name 2',
    email: 'project.member2@email.com',
    userId: 'faljdshfjdahlfas',
    company: 'Company 2',
    projectId: projectId,
    projectGroups: [
      {
        name: existingProjectMemberGroup.name,
        id: existingProjectMemberGroup.id,
        projectId: projectId,
        leadId: newProjectMemberId,
        members: [
          {
            email: existingProjectMember.email,
            id: existingProjectMember.id,
            name: existingProjectMember.name,
            projectId: projectId,
            userId: existingProjectMember.userId,
          },
        ],
      },
    ],
  } as GraphQlProjectMember
  const newProjectGroup = {
    name: 'New Project Group',
    id: 'newProjectGroup',
    projectId: projectId,
    members: [
      {
        email: existingProjectMember.email,
        id: existingProjectMember.id,
        name: existingProjectMember.name,
        projectId: projectId,
        userId: existingProjectMember.userId,
      },
      newProjectMember
    ],
  } as GraphQlProjectGroup

  beforeEach(() => {
    cy.login({
      tenantId: Cypress.env('AAD_TENANT_ID'),
      clientId: Cypress.env('AAD_CLIENT_ID'),
      clientSecret: Cypress.env('AAD_APP_CLIENT_SECRET'),
      username: Cypress.env('TEST_USER_EMAIL'),
      password: Cypress.env('TEST_USER_PASSWORD'),
    })

    cy.mockGraphql(schema)
      .mockGraphqlOps<OPERATIONS, 'getSingleProject', OPERATIONS['getSingleProject']>('getSingleProject', {
        resolver: ({ variables: projectId }) => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjects', OPERATIONS['getProjects']>('getProjects', {
        resolver: () => projectsData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectGroups', OPERATIONS['getProjectGroups']>('getProjectGroups', {
        resolver: ({ variables: { projectId } }) => ({
          projectGroups: existingProjectMember.projectGroups,
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getProjectMembers', OPERATIONS['getProjectMembers']>('getProjectMembers', {
        resolver: ({ variables: { projectId } }) => ({
          projectMembers: [existingProjectMember],
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getAccountRoles', OPERATIONS['getAccountRoles']>('getAccountRoles', {
        resolver: () => ({
          account: { roles: adminAccountData.data.account.roles },
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'getAccount', OPERATIONS['getAccount']>('getAccount', {
        resolver: () => adminAccountData.data,
      })
      .mockGraphqlOps<OPERATIONS, 'addProjectMember', OPERATIONS['addProjectMember']>('addProjectMember', {
        resolver: ({ variables: { projectId, name, email, projectGroups } }) => ({
          addProjectMember: newProjectMember,
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'addProjectGroup', OPERATIONS['addProjectGroup']>('addProjectGroup', {
        resolver: ({ variables: { projectId, name } }) => ({
          addProjectGroup: newProjectMember.projectGroups[0],
        }),
      })
      .mockGraphqlOps<OPERATIONS, 'addProjectMembersToGroup', OPERATIONS['addProjectMembersToGroup']>(
        'addProjectMembersToGroup',
        {
          resolver: ({ variables: { groupId, memberIds } }) => ({
            addProjectMembersToGroup: newProjectMember.projectGroups[0],
          }),
        },
      )
      .mockGraphqlOps<OPERATIONS, 'deleteProjectGroup', OPERATIONS['deleteProjectGroup']>('deleteProjectGroup', {
        resolver: ({ variables: { id } }) => ({ deleteProjectGroup: existingProjectMember.projectGroups[0].id }),
      })
      .mockGraphqlOps<OPERATIONS, 'deleteProjectMember', OPERATIONS['deleteProjectMember']>('deleteProjectMember', {
        resolver: ({ variables: { userId } }) => ({ deleteProjectMember: existingProjectMember.userId }),
      })
      .mockGraphqlOps<OPERATIONS, 'updateProjectGroup', OPERATIONS['updateProjectGroup']>('updateProjectGroup', {
        resolver: ({ variables: { id, name, leadId } }) => ({
          updateProjectGroup: newProjectGroup,
        }),
      })

    cy.visit(`/projects/${projectsData.data.projects[0].id}/members`)
  })

  it('should allow creating project member', () => {
    cy.contains('Project Members')

    cy.get(`[data-id=${existingProjectMember.id}]`).within(() => {
      cy.get('[data-field=name]').contains(existingProjectMember.name)
    })

    cy.get('[data-testid=AddIcon]').first().click()

    cy.get('[data-id]').first().next().within(() => {
      cy.get('[data-field=email]').type(newProjectMember.email)
    })

    cy.get('[data-testid=SaveIcon]').first().click()
  })

  it('should allow deleting project member', () => {
    cy.get(`[data-id=${existingProjectMember.id}]`).within(() => {
      cy.get('[data-field=name]').contains(existingProjectMember.name)
    })

    cy.get('[data-testid=DeleteOutlinedIcon]').first().click()

    cy.contains('No project members added')
  })

  it('should allow creating project group', () => {
    cy.contains('Project Groups')

    cy.get(`[data-id=${existingProjectMember.projectGroups[0].id}]`).within(() => {
      cy.get('[data-field=name]').contains(existingProjectMember.projectGroups[0].name)
    })

    cy.get('[data-testid=AddIcon]').last().click()

    cy.get('[data-id]')
      .last()
      .within(() => {
        cy.get('[data-field=name]').type(newProjectGroup.name)
      })

    cy.get('[data-testid=SaveIcon]').last().click()
  })

  it('should allow renaming project group', () => {
    cy.get(`[data-id=${existingProjectMember.projectGroups[0].id}]`).within(() => {
      cy.get('[data-field=name]').contains(existingProjectMember.projectGroups[0].name)
    })

    cy.get('[data-testid=EditIcon]').last().click()

    cy.get(`[data-id=${existingProjectMember.projectGroups[0].id}]`).within(() => {
      cy.get('[data-field=name]').type('{selectall}{backspace}')
      cy.get('[data-field=name]').type(newProjectMember.projectGroups[0].name)
    })

    cy.get('[data-testid=SaveIcon]').last().click()

    cy.get(`[data-id=${existingProjectMember.projectGroups[0].id}]`).within(() => {
      cy.get('[data-field=name]').contains(newProjectMember.projectGroups[0].name)
    })
  })

  it('should allow deleting project group', () => {
    cy.get(`[data-id=${existingProjectMember.projectGroups[0].id}]`).within(() => {
      cy.get('[data-field=name]').contains(existingProjectMember.projectGroups[0].name)
    })

    cy.get('[data-testid=DeleteOutlinedIcon]').last().click()

    cy.contains('No project groups created')
  })

  it('should allow adding project member to project group', () => {
    cy.get(`[data-id=${existingProjectMember.id}]`).within(() => {
      cy.get('[data-field=name]').contains(existingProjectMember.name)
    })

    cy.get('[data-testid=AddIcon]').first().click()

    cy.get('[data-id]')
      .first()
      .next()
      .within(() => {
        cy.get('[data-field=email]').type(newProjectMember.email)
        cy.get('[data-field=projectGroups]').click()
        cy.focused().click()
      })

    cy.get('[data-testid=SaveIcon]').first().click()
  })
})
