import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function Earbuds() {
    const { data: earbuds } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/earbuds/`);
    earbuds.length = 4;

    return (
        <div className='container mt-12 py-12 bg-slate-100'>
            <div className='flex justify-between'>
                <p className='text-2xl mb-2'>Earbuds</p>
                <Link href={'/headphones/earbuds'} aria-label='p6' className='underline text-blue-600'>See More</Link>
            </div>

            <div className='flex justify-center gap-5 flex-wrap'>
                {
                    earbuds.map(obj =>
                        <div key={obj._id} className='relative shadow-2xl p-5 bg-white rounded-xl duration-300 border hover:border-blue-600 border-transparent'>
                            <Image src={obj.images[0].path} className='w-[230px] h-[200px] sm:w-[190px]' width={300} height={300} priority alt='del' />
                            <Link href={`/earbud/${obj._id}`} aria-label='p7' className='absolute left-0 top-0 w-full h-full'></Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
