import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProjectSchemaSelection } from './projectSchemaSelection'
import { MockedProvider } from '@apollo/client/testing'
import { reportingSchemaMock } from '../../__mocks__/reportingSchema.mock'
import { reportingSchemaErrorMock } from '../../__mocks__/reportingSchemaError.mock'

describe('projectSchemaSelection', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={reportingSchemaMock} addTypename={false}>
        <MemoryRouter initialEntries={['/projects/acfa456f-6628-4c0d-a0c8-1a53b1a46785/settings']}>
          <Routes>
            <Route
              path='/projects/:projectId/settings'
              element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
      {
        wrapper: ({ children }) => {
          console.log('wrapperchildren', children)
          console.log('wrapperchildren request 1', children.props.mocks[0].request.query.definitions)
          return children
        },
      },
    )
    expect(baseElement).toBeDefined()
  })

  it('should display schema name', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={reportingSchemaMock} addTypename={false}>
        <MemoryRouter initialEntries={['/projects/acfa456f-6628-4c0d-a0c8-1a53b1a46785/settings']}>
          <Routes>
            <Route
              path='/projects/:projectId/settings'
              element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
    const autocomplete = await screen.findByTestId('auto-complete')
    expect(autocomplete).toBeDefined()
  })

  it('should not display schema name', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={reportingSchemaErrorMock} addTypename={false}>
        <MemoryRouter initialEntries={['/projects/acfa456f-6628-4c0d-a0c8-1a53b1a46785/settings']}>
          <Routes>
            <Route
              path='/projects/:projectId/settings'
              element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />}
            />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
    const errorText = await screen.findByText('An error occurred')
    expect(errorText).toBeDefined()
  })
})
