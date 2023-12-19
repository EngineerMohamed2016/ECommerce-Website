'use client'
import { useCustomContext } from '@/contextApi/context';
import storeInLS from '@/utils/storeInLocalStorage';
import { showSuccessMsg } from '@/utils/successMsg';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Product({ product }) {
    const [active, setActive] = useState(0);
    const { setCount, setTotal, count, total } = useCustomContext();

    // store product in local storage
    const handleAddCart = () => {
        // get current count, total from local storage
        const lsCount = localStorage.getItem('xperiaCount');
        const lsTotal = localStorage.getItem('xperiaTotal');
        // update cart count, total states
        setCount(Number(lsCount) + 1);
        setTotal((Number(lsTotal) + Number(product.price)).toFixed(2));
        // store count, total states in ls
        localStorage.setItem('xperiaCount', Number(lsCount) + 1);
        localStorage.setItem('xperiaTotal', (Number(lsTotal) + Number(product.price)).toFixed(2));
        // store product obj in ls
        storeInLS(product);
        showSuccessMsg('The product is added to your cart.');
    }

    return (
        <div className='bg-white w-[270px] sm:w-[215px] p-5 rounded-lg shadow-2xl hover:scale-105 duration-300'>
            <Link aria-label="products" href={`${product.battery ? `/mobile/${product._id}` : `${product.earbud ? `/earbud/${product._id}` : `${product.gpuBrand ? `/laptop/${product._id}` : `/overear/${product._id}`}`}`}`}> <Image priority src={product[`images${active === 0 ? '' : active + 1}`][0].path} className={`${!product.battery ? 'h-[150px]' : 'h-[260px]'} w-[200px] mx-auto`} width={200} height={200} alt='del' /></Link>
            <Link aria-label="product" href={`${product.battery ? `/mobile/${product._id}` : `${product.earbud ? `/earbud/${product._id}` : `${product.gpuBrand ? `/laptop/${product._id}` : `/overear/${product._id}`}`}`}`} className='block pt-5 text-xl font-semibold'>{product.name.split(' ').slice(0, 2).join(' ')}</Link>
            <p className='text-black text-lg font-semibold'>{product.price}$</p>
            <p className='text-xs font-bold capitalize'>{product.brand}</p>
            {
                product.colorsHex.map((hex, i) => <button key={i} onClick={() => setActive(i)} style={{ backgroundColor: hex }} className='mt-2 mr-2 w-5 h-5 rounded border border-black' aria-label="col"></button>)
            }
            <button onClick={handleAddCart} className='mt-3 py-1 active:scale-105 duration-500 bg-black text-white w-full rounded-full'>Add to cart</button>
        </div>
    )
}
