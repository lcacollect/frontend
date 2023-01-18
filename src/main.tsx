import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { ApolloTokenProvider, ErrorBoundary } from '@lcacollect/components'
import { msalConfig } from '@lcacollect/core'
import { LicenseInfo } from '@mui/x-license-pro'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/app'

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENSE || '') // eslint-disable no-eval
const msalInstance = new PublicClientApplication(
  msalConfig({ aadTenantId: import.meta.env.VITE_AAD_TENANT_ID, aadClientId: import.meta.env.VITE_AAD_CLIENT_ID }),
)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <ApolloTokenProvider
            apolloRouterUrl={import.meta.env.VITE_APOLLO_ROUTER_URL}
            aadAppClientId={import.meta.env.VITE_AAD_APP_CLIENT_ID}
          >
            <App />
          </ApolloTokenProvider>
        </MsalProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
