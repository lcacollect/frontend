import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { ProjectSettingsPage } from './projectSettingsPage'
import { projectMock } from '../../__mocks__/project.mock'

describe('ProjectSettingsPage', () => {
  afterEach(cleanup)
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={projectMock} addTypename={false}>
        <MemoryRouter initialEntries={['/projects/acfa456f-6628-4c0d-a0c8-1a53b1a46785/settings']}>
          <Routes>
            <Route path='/projects/:projectId/settings' element={<ProjectSettingsPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
  })
  it('should render child elements successfully', async () => {
    const { baseElement } = render(
      <MockedProvider mocks={projectMock} addTypename={false}>
        <MemoryRouter initialEntries={['/projects/acfa456f-6628-4c0d-a0c8-1a53b1a46785/settings']}>
          <Routes>
            <Route path='/projects/:projectId/settings' element={<ProjectSettingsPage />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
    expect(await screen.findByTestId('project-settings-page')).toBeInTheDocument()
    expect(await screen.findByTestId('project-information-table')).toBeInTheDocument()
    expect(await screen.findByText('Building Information')).toBeInTheDocument()
    expect(await screen.findByText('Building Energy Use')).toBeInTheDocument()
    expect(await screen.findByTestId('image-upload')).toBeInTheDocument()
  })
})
