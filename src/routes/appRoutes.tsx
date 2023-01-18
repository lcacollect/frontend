import { ErrorBoundary, LcaAppBar } from '@lcacollect/components'
import { GraphiqlPage, NotFoundPage } from '@lcacollect/core'
import { AdminPage, BuildingComponentsPage, ImportExportPage, SourcesPage, TasksPage } from '@lcacollect/documentation'
import { MembersPage, ProjectLandingPage, ProjectsHomePage } from '@lcacollect/project'
import { Route, Routes } from 'react-router-dom'
import { useGetAccountRolesQuery } from '../dataAccess'
import { ProjectSettingsPage } from '../pages'
import { PageLayout } from './pageLayout'

export const AppRoutes = () => {
  const { data } = useGetAccountRolesQuery()
  const isSuperAdmin = data?.account.roles?.includes('lca_super_admin')

  return (
    <Routes>
      <Route path='/' element={<WrappedHomePage />} />
      <Route path='/projects'>
        <Route path=':projectId' element={<PageLayout />}>
          <Route path='settings' element={<ProjectSettingsPage />} />
          <Route path='members' element={<MembersPage />} />
          <Route path='sources' element={<SourcesPage />} />
          <Route path='components' element={<BuildingComponentsPage />} />
          <Route path='' element={<ProjectLandingPage />} />
          <Route path='tasks' element={<TasksPage />} />
          <Route path='export' element={<ImportExportPage />} />
        </Route>
        <Route path='' element={<WrappedHomePage />} />
      </Route>
      {isSuperAdmin ? <Route path='/admin' element={<WrappedAdminPage />} /> : null}
      <Route path='*' element={<Wrapped404Page />} />
      <Route
        path='/graphiql'
        element={
          <ErrorBoundary>
            <GraphiqlPage
              apolloRouterUrl={import.meta.env.VITE_APOLLO_ROUTER_URL}
              aadAppClientId={import.meta.env.VITE_AAD_APP_CLIENT_ID}
            />
          </ErrorBoundary>
        }
      />
    </Routes>
  )
}

const WrappedHomePage = () => (
  <>
    <ErrorBoundary>
      <LcaAppBar />
    </ErrorBoundary>
    <ErrorBoundary>
      <ProjectsHomePage />
    </ErrorBoundary>
  </>
)

const WrappedAdminPage = () => (
  <>
    <ErrorBoundary>
      <LcaAppBar />
    </ErrorBoundary>
    <ErrorBoundary>
      <AdminPage />
    </ErrorBoundary>
  </>
)

const Wrapped404Page = () => (
  <>
    <ErrorBoundary>
      <LcaAppBar />
    </ErrorBoundary>
    <ErrorBoundary>
      <NotFoundPage />
    </ErrorBoundary>
  </>
)
