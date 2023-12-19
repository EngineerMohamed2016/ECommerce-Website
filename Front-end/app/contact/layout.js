import React from 'react'

export const metadata = {
    title: 'Contact',
    description: 'Xperia | E-Commerce Website',
  }

export default function layout({children}) {
  return (
    <div className='container grow items-center flex gap-7 py-12 sm:gap-0 flex-wrap sm:flex-nowrap'>
      {children}
    </div>
  )
}
7