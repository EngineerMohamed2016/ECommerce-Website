import FilterHeadphones from '@/components/headphones/FilterHeadphones'
import React from 'react'

export const metadata = {
    title: 'Earbuds',
    description: 'Xperia | E-Commerce Website',
  }

export default function layout({ children }) {
    return (
        <div className='container bg-slate-200 py-12 flex flex-col md:flex-row gap-5 grow'>
            <div>
                <FilterHeadphones type={'earbuds'}/>
            </div>
            {children}
        </div>
    )
}
