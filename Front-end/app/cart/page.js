'use client'
import { useCustomContext } from '@/contextApi/context';
import { showSuccessMsg } from '@/utils/successMsg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Page() {
    var products = JSON.parse(localStorage.getItem('xperiaProducts'));
    const { total, count, setTotal, setCount, isAuth } = useCustomContext();
    const router = useRouter();

    // store count & total states in ls
    useEffect(() => {
        localStorage.setItem('xperiaCount', count);
        localStorage.setItem('xperiaTotal', total);
    }, [count, total]);

    // update obj of product and store it in ls, update count, total states
    const handleChange = (e, obj) => {
        if (e.target.value === '0')
            return handleDelete(obj);

        var curObj = products.find(o => o.id === obj.id);
        const preCount = curObj.count;
        setCount(pre => Number(pre) - Number(preCount) + Number(e.target.value));
        setTotal(pre => (Number(pre) - Number(preCount * curObj.price) + Number(e.target.value * curObj.price)).toFixed(2))
        curObj.count = e.target.value;
        localStorage.setItem('xperiaProducts', JSON.stringify(products));
    }

    // delete product from cart 
    const handleDelete = (obj) => {
        // update count, total states after deleting product
        setCount(pre => Number(pre) - Number(obj.count));
        setTotal(pre => (Number(pre) - Number(obj.count * obj.price)).toFixed(2))
        // delete from ls
        products = products.filter(o => o.id !== obj.id);
        localStorage.setItem('xperiaProducts', JSON.stringify(products));

        showSuccessMsg('One product is removed from the cart.')
    }

    const handleCheckout = () => {
        if (!isAuth)
            return router.push('/login');
        router.push('/checkout');
    }

    if (!products || products.length < 1)
        return (
            <div className='py-12'>
                <p className='text-3xl text-center'>Shopping Cart Is Empty.</p>
                <Link aria-label='fill' href={'/'} className='sm:hidden block w-fit mx-auto mt-5 text-xl px-6 py-1 bg-black text-white rounded-full'>Fill It</Link>
            </div>
        )

    return (
        <div className='container py-12'>
            <section className='flex justify-between flex-wrap gap-5 md:gap-0'>
                <div className='border border-black rounded-lg w-full md:w-8/12'>
                    <div className='flex justify-between border-b mb-6 border-black'>
                        <p className=' text-black/70 p-4'>Product</p>
                        <p className='text-black/70  p-4'>Quantity</p>
                    </div>
                    {
                        products.map((obj, i) =>
                            <div key={obj.id} className={`flex items-center justify-between mb-5 p-4 ${i === products.length - 1 ? '' : 'border-b border-black'}`}>
                                <div className='flex gap-5 items-center'>
                                    <Image src={obj.images[0].path} className='w-[80px] sm:w-[120px] h-[80px] sm:h-[120px]' priority width={120} height={120} alt='del' />
                                    <div>
                                        <p className='text-xl sm:text-2xl'>{obj.name}</p>
                                        <p className='text-lg sm:text-xl'>{obj.price}$</p>
                                        <p className='text-black/80'>{obj.brand}</p>
                                        <button onClick={() => handleDelete(obj)} aria-label="c" className='text-sm  underline'>Delete</button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <select defaultValue={obj.count} onChange={(e) => handleChange(e, obj)} className='border border-black px-2 py-1'>
                                        {
                                            Array.from({ length: 26 }).map((_, i) =>
                                                <option key={i} value={i}>{i}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className='sticky top-28 border border-black rounded-lg p-4 w-full md:w-3/12 flex flex-col gap-3 self-start'>
                    <p className='text-xl font-semibold'>Subtotal:</p>
                    <p className='text-xl'>Items: <span>{total}$</span></p>
                    <button onClick={handleCheckout} aria-label="cw" className='text-xl py-1 rounded-md bg-blue-700 text-white hover:bg-blue-600'>Check Out</button>
                </div>
            </section>
        </div>
    )
}
