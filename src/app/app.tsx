import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { AppContainer, LcaAppBar } from '@lcacollect/components'
import { LoginPage } from '@lcacollect/core'
import { Route, Routes } from 'react-router-dom'
import { LcaRoutes } from '../routes/'
import React from 'react'

export function App() {
  return (
    <AppContainer>
      <AuthenticatedTemplate>
        <LcaRoutes />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Routes>
          <Route
            path='*'
            element={
              <>
                <LcaAppBar />
                <LoginPage />
              </>
            }
          />
        </Routes>
      </UnauthenticatedTemplate>
    </AppContainer>
  )
}

export default App
