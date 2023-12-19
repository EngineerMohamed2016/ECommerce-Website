import React from 'react'
import FilterMobs from '@/components/mobiles/FilterMobs';
import Mobiles from '@/components/mobiles/Mobiles';

export const metadata = {
    title: 'Mobiles',
    description: 'Xperia | E-Commerce Website',
  }

export default function Page() {

    return (
        <section className='container bg-slate-200 py-12 flex flex-col md:flex-row gap-y-7 grow'>
            <FilterMobs />
            <Mobiles />
        </section>

    )
}