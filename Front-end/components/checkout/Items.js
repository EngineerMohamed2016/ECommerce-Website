import Image from 'next/image';
import React from 'react'

export default function Items() {
    const products = JSON.parse(localStorage.getItem('xperiaProducts'));

    return (
        <>
            <p className='text-green-700 text-xl font-semibold mb-1'>Your items</p>
            <div className='border border-black/50 rounded-md p-4 bg-white' >
                {
                    products.map((obj, i) =>
                        <div key={obj.id} className={`flex items-center justify-between py-3 ${i === products.length - 1 ? '' : 'border-b border-black/30'}`}>
                            <div className='flex gap-5 items-center'>
                                <Image src={obj.images[0].path} className='w-[80px] sm:w-[100px] h-[80px] sm:h-[120px]' priority width={120} height={120} alt='del' />
                                <div>
                                    <p className='text-xl sm:text-2xl'>{obj.name}</p>
                                    <p className='text-lg sm:text-xl'>{obj.price}$</p>
                                    <p>{obj.brand}</p>
                                </div>
                            </div>
                            <p className='text-xl'>Quantity: <span className='text-2xl text-red-600'>{obj.count}</span></p>
                        </div>
                    )
                }
            </div></>
    )
}
