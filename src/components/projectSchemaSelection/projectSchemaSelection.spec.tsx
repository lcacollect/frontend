import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { expect } from 'vitest'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProjectSchemaSelection } from './projectSchemaSelection'
import { MockedProvider } from '@apollo/client/testing'
import { reportingSchemaMock } from '../../__mocks__/reportingSchemaMock'

describe('projectSchemaSelection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider mocks={reportingSchemaMock} addTypename={false}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<ProjectSchemaSelection projectId='acfa456f-6628-4c0d-a0c8-1a53b1a46785' />} />
          </Routes>
        </BrowserRouter>
      </MockedProvider>,
      {
        wrapper: ({ children }) => {
          console.log('wrapperchildren', children)
          console.log('wrapperchildren request 1', children.props.mocks[0].request.query.definitions)
          console.log(
            'wrapperchildren request 1',
            children.props.mocks[0].request.query.definitions[0].variableDefinitions[0],
          )
          console.log('wrapperchildren response 1', children.props.mocks[0].result.data.reportingSchemas)
          console.log('wrapperchildren props', children.props.mocks[1])
          console.log('wrapperchildren props', children.props.mocks[2])
          console.log('wrapperchildren props', children.props.mocks[3])
          console.log('wrapperchildren', children)
          return children
        },
      },
    )
    expect(baseElement).toBeDefined()
    console.log('base element: ', baseElement)
    console.log('base element: innerhtml ', baseElement.innerHTML)
    console.log('base element: children', baseElement.children[0].innerHTML)
  })
  it('should display schema name', () => {
    const { baseElement } = render(
      <MockedProvider mocks={reportingSchemaMock} addTypename={false}>
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
      <MockedProvider mocks={reportingSchemaMock} addTypename={false}>
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
