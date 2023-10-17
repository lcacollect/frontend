import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { expect, vi } from 'vitest'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './app'
import { MockedProvider } from '@apollo/client/testing'

describe('App', () => {
  it('should render the HomePage successfully', () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )

    // to avoid TypeError: Cannot read properties of null (reading 'useContext')
    vi.mock('@lcacollect/core', () => {
      return {
        LoginPage: vi.fn(),
      }
    })

    expect(baseElement).toBeDefined()
  })
})
