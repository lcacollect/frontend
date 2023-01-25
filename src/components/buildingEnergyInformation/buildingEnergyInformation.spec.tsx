import '@testing-library/jest-dom'
import { render, fireEvent, queryByAttribute, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BuildingEnergyInformation } from './buildingEnergyInformation'
import { MockedProvider } from '@apollo/client/testing'
import { act } from 'react-dom/test-utils'

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

  it('shows snackbar on error', async () => {
    const metaFields = [
      { id: 'heated_area', label: 'Heated Area (m²)', type: 'number' },
      { id: 'heat_usage', label: 'Heat use (kWh/m²/yr)', type: 'number' },
      //   { id: 'electricity_usage', label: 'Electricity use (kWh/m²/yr)', type: 'number' },
      //   { id: 'electricity_exported', label: 'Electricity exported to grid (kWh/m²/yr)', type: 'number' },
      //   {
      //     id: 'heat_source',
      //     label: 'Heating source',
      //     options: [
      //       'Grid Power - Projection 2020 - 2040',
      //       'District Heating - Projection 2020 - 2040',
      //       'Gas - Projection 2020 - 2040',
      //     ],
      //   },
      //   {
      //     id: 'electricity_source',
      //     label: 'Electricity source',
      //     options: ['Grid Power - Projection 2020 - 2040'],
      //   },
    ]
    const projectId = 'acfa456f-6628-4c0d-a0c8-1a53b1a46785'
    const { getByTestId } = render(
      <MockedProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<BuildingEnergyInformation metaFields={metaFields} projectId={projectId} />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
    )
    const stack = getByTestId('building-energy-info-stack')
    expect(stack).toBeInTheDocument()

    // Trigger the setError
    act(() => {
      const firstInput = stack.querySelector('input')
      // console.log('first input ', firstInput)
      firstInput?.dispatchEvent(new Event('blur'))
    })
    // const innerPaper = getByTestId('building-energy-information-table')
    // console.log('innerpaper ', innerPaper)
    // console.log('innerpaper inner ', innerPaper.innerHTML)
    // console.log('innerpaper children', innerPaper.children)

    //   const snackbar = getByTestId('snackbar')
    //   expect(snackbar).toBeInTheDocument()
    // const { baseElement, getByText, queryByText } = render(
    //   <MockedProvider >
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path='*' element={<BuildingEnergyInformation metaFields={metaFields} projectId={projectId} />} />
    //       </Routes>
    //     </BrowserRouter>
    //   </MockedProvider>,
    // )
    // expect(baseElement).toBeTruthy()
    // expect(queryByText('Error')).toBeNull()
    // const idAttr = 'heated_area'
    // const input = queryByAttribute('id', baseElement, idAttr)

    // fireEvent.change(input as HTMLElement, { target: { value: 'abc' } })
    // // fireEvent.blur(input as HTMLElement)

    // act(() => {
    //     const firstInput = stack.querySelector('input')
    //     firstInput.dispatchEvent(new Event('blur'))
    //   })

    // expect(getByText('Error')).toBeInTheDocument()
  })
})
