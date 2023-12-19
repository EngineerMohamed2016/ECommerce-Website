import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <section className='container mb-4'>
      <div className='w-full sm:w-[500px] shadow-slate-900 shadow mx-auto mt-16 p-10 rounded-xl'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error libero eius nesciunt magnam illum ex aperiam temporibus eos voluptates suscipit, sapiente harum fugit, quasi ducimus tempore! At, voluptatem! Nisi, consequatur.
      </div>
      <div className='text-center mt-7 mb-5'>
        <Link aria-label='main' href={'/'} className='bg-black text-xl text-blue-400 px-5 w-full sm:w-fit py-1 inline-block rounded-2xl'>Shop now</Link>
      </div>
    </section>
  )
}
