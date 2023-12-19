import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function New() {
    const latestLaptop = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/laptops/latest`);
    const latestMobile = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mobiles/latest`);
    const latestEarbud = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/earbuds/latest`);
    const latestOverear = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/overears/latest`);

    // fetch data in parallel
    const [lap, mobile, earbud, overear] = await Promise.all([latestLaptop, latestMobile, latestEarbud, latestOverear]);

    // new arrival products
    const newArrival = [...lap.data, ...mobile.data, ...earbud.data, ...overear.data];
    return (
        <div className='container mt-12 py-12 bg-slate-100'>
            <p className='text-2xl mb-2'>New Arrival</p>
            <div className='flex justify-center gap-5 flex-wrap'>
                {
                    newArrival.map(obj =>
                        <div key={obj._id} className='relative shadow-2xl p-5 bg-white rounded-xl duration-300 border hover:border-blue-600 border-transparent'>
                            <Image src={obj.images[0].path} className='w-[230px] h-[210px] sm:w-[190px] sm:h-[200px]' width={500} height={500} priority alt='del' />
                            <Link href={obj.battery ? `/mobile/${obj._id}` : obj.cpuModel ? `/laptop/${obj._id}` : obj.earbud ? `/earbud/${obj._id}` : `/overear/${obj._id}`} aria-label='ps6' className='absolute left-0 top-0 w-full h-full'></Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
