import '@testing-library/jest-dom'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BuildingInformation } from './buildingInformation'
import { MockedProvider } from '@apollo/client/testing'
import { act } from 'react-dom/test-utils'
import { updateProjectMock } from '../../__mocks__/updateProjectMock'

describe('BuildingInformation', () => {
  afterEach(cleanup)
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<BuildingInformation metaFields={{}} projectId='1' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeTruthy()
    expect(await screen.findByTestId('building-information-table')).toBeInTheDocument()
  })

  it('should render the 6 fields', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<BuildingInformation metaFields={{}} projectId='1' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    const infoStack = getByTestId('building-info-stack')
    expect(infoStack).toHaveTextContent('Building Type')
    expect(infoStack).toHaveTextContent('Construction Type')
    expect(infoStack).toHaveTextContent('Gross Area (m²)')
    expect(infoStack).toHaveTextContent('Floors above ground')
    expect(infoStack).toHaveTextContent('Floors below ground')
    expect(infoStack).toHaveTextContent('Construction finished in')
  })

  it('should show snackbar', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={updateProjectMock} addTypename={false}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<BuildingInformation metaFields={{}} projectId='1' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    const stack = getByTestId('building-info-stack')
    expect(stack).toBeInTheDocument()

    act(() => {
      const firstInput = stack.querySelector('input')
      firstInput?.dispatchEvent(new Event('blur'))
    })
    const innerPaper = getByTestId('building-information-table')
    console.log('inner paper:', innerPaper)
    console.log('inner paper: html', innerPaper.innerHTML)
    console.log('inner paper: children', innerPaper.children)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await waitFor(() => screen.getByTestId('snackbar'))

    const snackbar = getByTestId('snackbar')
    expect(snackbar).toBeInTheDocument()
  })
})
