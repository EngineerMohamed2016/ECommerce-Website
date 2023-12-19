import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: 'Headphones',
    description: 'Xperia | E-Commerce Website',
  }

export default function page() {
    return (
        <div className='container py-12'>
            <div className='flex justify-center gap-10 flex-wrap'>
                <div className='w-[250px]'>
                    <p className='text-2xl text-center tracking-widest font-semibold mb-2'>Earbuds</p>
                    <Link aria-label='earbuds' href={'/headphones/earbuds'} className='h-[250px] border-[1px] border-blue-700 p-8 shadow-2xl rounded-lg hover:scale-105 duration-300 flex items-center justify-center'>
                        <Image src={'/earbuds.png'} priority width={400} height={400} alt='del' />
                    </Link>
                </div>

                <div className='w-[250px]'>
                    <p className='text-2xl text-center tracking-widest font-semibold mb-2'>Overears</p>
                    <Link aria-label='over' href={'/headphones/overears'} className='h-[250px] border-[1px] border-blue-700 p-8 shadow-2xl rounded-lg hover:scale-105 duration-300 flex items-center justify-center'>
                        <Image src={'/overSony.png'} priority width={400} height={400} alt='del' />
                    </Link>
                </div>
            </div>
        </div>
    )
}





















