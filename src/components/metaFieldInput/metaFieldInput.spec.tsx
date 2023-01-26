import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect } from 'vitest'
import { projectSettingsMock } from '../../__mocks__/projectSettings.mock'
import { ProjectMetaFieldInput } from './metaFieldInput'
import getSingleProjectResponse from '../../__mocks__/getSingleProject'

describe('Meta Field Input | TextField', () => {
  it('should render successfully', async () => {
    const projectId = getSingleProjectResponse.data.projects[0].projectId
    const label = 'Test Label'
    const id = 'Test Id'

    const { baseElement } = render(
      <MockedProvider>
        <MockedProvider mocks={projectSettingsMock} addTypename={false}>
          <MemoryRouter initialEntries={[`/projects/${projectId}/settings`]}>
            <Routes>
              <Route
                path='/projects/:projectId/settings'
                element={<ProjectMetaFieldInput projectId={projectId} label={label} id={id} setError={() => null} />}
              />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      </MockedProvider>,
    )

    const metaFieldInput = await screen.findByTestId(`meta-field-input-${id}`)

    expect(baseElement).toBeDefined()
    expect(metaFieldInput).toBeVisible()
    expect(screen.getByRole('textbox', { name: label })).toBeVisible()
  })
})

describe('Meta Field Input | DatePicker', () => {
  it('should render successfully', async () => {
    const projectId = getSingleProjectResponse.data.projects[0].projectId
    const label = 'Test Label'
    const id = 'Test Id'
    const type = 'year'

    const { baseElement } = render(
      <MockedProvider>
        <MockedProvider mocks={projectSettingsMock} addTypename={false}>
          <MemoryRouter initialEntries={[`/projects/${projectId}/settings`]}>
            <Routes>
              <Route
                path='/projects/:projectId/settings'
                element={
                  <ProjectMetaFieldInput
                    projectId={projectId}
                    label={label}
                    id={id}
                    setError={() => null}
                    type={type}
                  />
                }
              />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      </MockedProvider>,
    )

    const metaFieldInput = await screen.findByTestId(`meta-field-input-${id}`)

    expect(baseElement).toBeDefined()
    expect(metaFieldInput).toBeVisible()
    expect(screen.getByPlaceholderText('yyyy')).toBeVisible()
  })
})

describe('Meta Field Input | Dropdown', () => {
  it('should render successfully', async () => {
    const projectId = getSingleProjectResponse.data.projects[0].projectId
    const label = 'Test Label'
    const id = 'Test Id'
    const options = ['Option 1', 'Option 2']

    const { baseElement } = render(
      <MockedProvider>
        <MockedProvider mocks={projectSettingsMock} addTypename={false}>
          <MemoryRouter initialEntries={[`/projects/${projectId}/settings`]}>
            <Routes>
              <Route
                path='/projects/:projectId/settings'
                element={
                  <ProjectMetaFieldInput
                    projectId={projectId}
                    label={label}
                    id={id}
                    setError={() => null}
                    options={options}
                  />
                }
              />
            </Routes>
          </MemoryRouter>
        </MockedProvider>
      </MockedProvider>,
    )

    const metaFieldInput = await screen.findByTestId(`meta-field-input-${id}`)

    expect(baseElement).toBeDefined()
    expect(metaFieldInput).toBeVisible()
    expect(screen.getByRole('combobox', { name: label })).toBeVisible()
  })
})
