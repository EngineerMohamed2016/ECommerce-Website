import React from 'react'

export default function About({product}) {
    return (
        <div className='mb-4'>
            <p className='text-2xl mt-6 mb-2'>About</p>
            <ol className='px-16 list-decimal py-8 bg-slate-700 text-white'>
                {
                    product.about.map((obj, i) => <li key={i} className='mb-2 text-sm sm:text-base break-words'>{obj.info}</li>)
                }
            </ol>
        </div>
    )
}
