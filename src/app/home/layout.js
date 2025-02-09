import Navbar from '@/components/Navbar'
import React from 'react'

function layout({children}) {
  return (
    <>
        <Navbar />
        {children}
    </>
  )
}

export default layout