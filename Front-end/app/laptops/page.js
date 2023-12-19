import Laptops from '@/components/laptops/Laptops';
import FilterLaps from '@/components/laptops/FilterLaps';
import React from 'react'

export const metadata = {
    title: 'Laptops',
    description: 'Xperia | E-Commerce Website',
}

export default function Page() {

    return (
        <section className='container bg-slate-200 py-12 flex flex-col md:flex-row md:items-start md:justify-center gap-y-7 grow'>
            <FilterLaps />
            <Laptops />
        </section>
    )
}
