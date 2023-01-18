import { Outlet } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { Box, Stack } from '@mui/material'
import { Drawers, ErrorBoundary, LcaAppBar } from '@lcacollect/components'
import { DocumentationSideMenu } from '@lcacollect/documentation'

interface PageLayoutProps {
  children?: ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children = <Outlet /> }) => {
  return (
    <>
      <ErrorBoundary>
        <LcaAppBar />
      </ErrorBoundary>
      <Stack direction={'row'} sx={{ marginX: 0, marginTop: 3 }}>
        <ErrorBoundary>
          <DocumentationSideMenu />
        </ErrorBoundary>
        <ErrorBoundary>{children}</ErrorBoundary>
        <ErrorBoundary>
          <Drawers />
        </ErrorBoundary>
        <Box aria-label='PanelFaker' sx={{ width: '70px', flexShrink: 0 }} />
      </Stack>
    </>
  )
}
