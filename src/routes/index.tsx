import { Route, Routes } from 'react-router-dom'
import { MobileWarning } from '@lcacollect/core'
import React from 'react'
import { AppRoutes } from './appRoutes'

export const LcaRoutes = () => {
  const windowMinWidth = 600
  const initialWidth = window.innerWidth

  window.addEventListener('resize', () => {
    if (window.innerWidth < windowMinWidth) {
      if (window.innerWidth < windowMinWidth && initialWidth > windowMinWidth) {
        window.location.reload()
      }
      return (
        <Routes>
          <Route path='*' element={<MobileWarning />}></Route>
        </Routes>
      )
    } else {
      if (window.innerWidth > windowMinWidth && initialWidth < windowMinWidth) {
        window.location.reload()
      }
      return <AppRoutes />
    }
  })

  if (initialWidth < 600) {
    return (
      <Routes>
        <Route path='*' element={<MobileWarning />}></Route>
      </Routes>
    )
  } else {
    return <AppRoutes />
  }
}
