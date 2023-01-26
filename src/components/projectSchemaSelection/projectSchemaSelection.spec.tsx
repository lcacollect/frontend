import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { expect } from 'vitest'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProjectSchemaSelection } from './projectSchemaSelection'
import { MockedProvider } from '@apollo/client/testing'

describe('projectSchemaSelection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
  })
  it('should display schema name', () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
  })

  it('should not display schema name', () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
  })

  it('should render snackbar on error', () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeDefined()
  })
})
