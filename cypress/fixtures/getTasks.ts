import {
  GraphQlProjectMemberGraphQlProjectGroup,
  GraphQlSchemaCategory,
  GraphQlSchemaElement,
  GraphQlTask,
  TaskStatus,
} from '../../src/dataAccess'

export default {
  data: {
    tasks: [
      {
        __typename: 'GraphQlTask' as GraphQlTask['__typename'],
        id: '5c71c6f6-4278-41ab-953d-588fe1e5ccbe',
        name: 'Element Task 1',
        description: 'APPROVED Element Task',
        status: TaskStatus.Approved,
        reportingSchemaId: 'd519dfd1-6c3b-481f-b46b-c756d7f9b98c',
        author: {
          id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
          name: 'Author 1',
        },
        assignee: {
          __typename: 'GraphQLProjectMember' as GraphQlProjectMemberGraphQlProjectGroup['__typename'],
          name: 'Assignee 1 (Member)',
          id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
        },
        item: {
          __typename: 'GraphQLSchemaElement' as GraphQlSchemaElement['__typename'],
          id: '6dccd98e-cd7d-4c62-afb6-72f646056e8f',
          name: 'Element Task Item 1',
        },
        comments: [
          {
            id: '0921f829-246d-4ba4-80d1-67ab4c228f07',
            added: '2022-11-11',
            text: 'Comment text',
            author: {
              id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
              name: 'Author 1',
            },
            task: {
              id: '5c71c6f6-4278-41ab-953d-588fe1e5ccbe',
            },
          },
        ],
      },
      {
        id: '2b8e4e85-4401-4f96-8990-7d84f4d4baef',
        name: 'Element Task 2',
        description: 'COMPLETED Element Task',
        status: TaskStatus.Completed,
        reportingSchemaId: 'd519dfd1-6c3b-481f-b46b-c756d7f9b98c',
        author: {
          id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
          name: 'Author 2',
        },
        assignee: {
          __typename: 'GraphQLProjectMember' as GraphQlProjectMemberGraphQlProjectGroup['__typename'],
          name: 'Assignee 2 (Member)',
          id: '2eb18b34-4dd7-4a55-a0eb-c26c56c1f960',
        },
        item: {
          __typename: 'GraphQLSchemaElement' as GraphQlSchemaElement['__typename'],
          id: 'f469dfe9-7df7-4f36-99c9-eebbe6cc7ba0',
          name: 'Element Task Item 2',
        },
        comments: [
          {
            id: '0921f829-246d-4ba4-80d1-67ab4c228f07',
            added: '2022-05-05',
            text: 'This is a comment',
            author: {
              id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
              name: 'Author 1',
            },
            task: {
              id: '5c71c6f6-4278-41ab-953d-588fe1e5ccbe',
            },
          },
          {
            id: '0921f829-246d-4ba4-80d1-67ab4c228f07',
            added: '2022-06-06',
            text: 'This is a second comment',
            author: {
              id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
              name: 'Author 1',
            },
            task: {
              id: '5c71c6f6-4278-41ab-953d-588fe1e5ccbe',
            },
          },
          {
            id: '0921f829-246d-4ba4-80d1-67ab4c228f07',
            added: '2022-07-07',
            text: 'This is a reply from someone else',
            author: {
              id: 'a6e2a272-b955-4e3a-a1d6-798e8f43591e',
              name: 'Author 2',
            },
            task: {
              id: '5c71c6f6-4278-41ab-953d-588fe1e5ccbe',
            },
          },
        ],
      },
      {
        id: '79bca12b-5e5c-4e43-899e-2c0011e673cf',
        name: 'Element Task 3',
        description: 'PENDING Element Task',
        status: TaskStatus.Pending,
        reportingSchemaId: 'd519dfd1-6c3b-481f-b46b-c756d7f9b98c',
        author: {
          id: 'e30c2266-43e6-40a7-9b35-1f3a2193d89e',
          name: 'Author 3',
        },
        assignee: {
          __typename: 'GraphQLProjectMember' as GraphQlProjectMemberGraphQlProjectGroup['__typename'],
          name: 'Assignee 3 (Member)',
          id: '86f9c07c-77f1-46e1-b08b-2080a3ffc918',
        },
        item: {
          __typename: 'GraphQLSchemaElement' as GraphQlSchemaElement['__typename'],
          id: '96c47a7a-1607-4e83-9357-399df4d7f82b',
          name: 'Element Task Item 3',
        },
        comments: [],
      },
      {
        id: 'ab9419de-3930-4645-8065-a1e1084ed549',
        name: 'Category Task 1',
        description: 'PENDING Category Task',
        status: TaskStatus.Pending,
        reportingSchemaId: 'd519dfd1-6c3b-481f-b46b-c756d7f9b98c',
        author: {
          id: '925401ca-4b47-4d2c-8907-f95b1419412b',
          name: 'Author 4',
        },
        assignee: {
          __typename: 'GraphQLProjectGroup' as GraphQlProjectMemberGraphQlProjectGroup['__typename'],
          name: 'Assignee 4 (Group)',
          id: 'projectGroup1',
        },
        item: {
          __typename: 'GraphQLSchemaCategory' as GraphQlSchemaCategory['__typename'],
          id: '655d79b1-2fd0-4750-8c0f-e6a5a2266fc3',
          name: 'Category Task Item 1',
        },
        comments: [],
      },
      {
        id: '7f8ec2af-08f8-482f-8006-f7d1caca8e25',
        name: 'Category Task 2',
        description: 'APPROVED Category Task',
        status: TaskStatus.Approved,
        reportingSchemaId: 'd519dfd1-6c3b-481f-b46b-c756d7f9b98c',
        author: {
          id: '925401ca-4b47-4d2c-8907-f95b1419412b',
          name: 'Author 5',
        },
        assignee: {
          __typename: 'GraphQLProjectGroup' as GraphQlProjectMemberGraphQlProjectGroup['__typename'],
          name: 'Assignee 5 (Group)',
          id: 'projectGroup2',
        },
        item: {
          __typename: 'GraphQLSchemaCategory' as GraphQlSchemaCategory['__typename'],
          id: '919a0c2a-88fa-4600-82d0-12600deb9ab9',
          name: 'Category Task Item 2',
        },
        comments: [],
      },
      {
        id: 'f3a5d8c4-c668-4302-a519-6cdf05830e80',
        name: 'Category Task 3',
        description: 'COMPLETED Category Task',
        status: TaskStatus.Completed,
        reportingSchemaId: 'd519dfd1-6c3b-481f-b46b-c756d7f9b98c',
        author: {
          id: '925401ca-4b47-4d2c-8907-f95b1419412b',
          name: 'Author 6',
        },
        assignee: {
          __typename: 'GraphQLProjectGroup' as GraphQlProjectMemberGraphQlProjectGroup['__typename'],
          name: 'Assignee 6 (Group)',
          id: 'projectGroup3',
        },
        item: {
          __typename: 'GraphQLSchemaCategory' as GraphQlSchemaCategory['__typename'],
          id: '2d3992cf-4ec4-4ce0-85f4-82c1977056ca',
          name: 'Category Task Item 3',
        },
        comments: [],
      },
    ],
  },
}
