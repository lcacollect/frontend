import '@testing-library/jest-dom'
import { render, fireEvent, queryByAttribute, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BuildingEnergyInformation } from './buildingEnergyInformation'
import { MockedProvider } from '@apollo/client/testing'

describe('BuildingEnergyInformation', () => {
  afterEach(cleanup)
  it('should render successfully', async () => {
    const { baseElement } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<BuildingEnergyInformation metaFields={{}} projectId='1' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    expect(baseElement).toBeTruthy()
    expect(await screen.findByTestId('building-energy-info-stack')).toBeInTheDocument()
  })

  it('should render the 6 fields', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<BuildingEnergyInformation metaFields={{}} projectId='1' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    const infoStack = getByTestId('building-energy-info-stack')
    expect(infoStack).toHaveTextContent('Heated Area (m²)')
    expect(infoStack).toHaveTextContent('Heat use (kWh/m²/yr)')
    expect(infoStack).toHaveTextContent('Electricity use (kWh/m²/yr)')
    expect(infoStack).toHaveTextContent('Electricity exported to grid (kWh/m²/yr)')
  })
})
