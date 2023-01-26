import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { ProjectSettingsPage } from './projectSettingsPage'
import { projectMock } from '../../__mocks__/projectMock'

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
      {
        wrapper: ({ children }) => {
          console.log('request', children.props.mocks[0])
          console.log('result', children.props.mocks[0].result)
          console.log('result', children.props.mocks[0].result.data)
          console.log('result', children.props.mocks[0].result.data.projects)
          return children
        },
      },
    )
    expect(baseElement).toBeDefined()
    expect(await screen.findByTestId('project-settings-page')).toBeInTheDocument()
    console.log('base element innerHTML', baseElement.innerHTML)
    expect(await screen.findByTestId('data-fetch-wrapper')).toBeInTheDocument()
    console.log('projectmock result', projectMock[0].result.data)
    console.log('projectmock', projectMock[0].request)
    console.log('projectmock', projectMock[0].request.query)
    console.log('projectmock', projectMock[0].request.query.definitions[0])
    console.log('projectmock', projectMock[0].request.query.definitions[0].kind)

    // // console.log('baseElement ', baseElement)
    // console.log('baseElement inner', container.innerHTML)
    // // console.log('baseElement children ', baseElement.children)
    // expect(await screen.findByTestId('project-settings-page')).toBeInTheDocument()
    // expect(await screen.findByTestId('project-information')).toBeInTheDocument()
  })

  //   it('should render successfully', async () => {
  //     const { getByTestId } = render(
  //         <MockedProvider mocks={projectMock} addTypename={false} >
  //         <MemoryRouter initialEntries={['/projects/acfa456f-6628-4c0d-a0c8-1a53b1a46785/settings']}>
  //           <Routes >
  //             <Route path='/projects/:projectId/settings'  element={<ProjectSettingsPage />} />
  //           </Routes>
  //         </MemoryRouter>
  //       </MockedProvider>,
  //     )

  //     const dataWrapper = getByTestId('data-fetch-wrapper')
  //     console.log('datafetchwrapepr', dataWrapper)
  //   })
})
