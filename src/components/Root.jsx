import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router'
import { Footer } from './Footer'

export const Root = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}
