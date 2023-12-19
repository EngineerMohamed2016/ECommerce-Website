'use client'
import { useCustomContext } from '@/contextApi/context';
import storeInLS from '@/utils/storeInLocalStorage';
import { showSuccessMsg } from '@/utils/successMsg';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function PreviewAndCart({ product }) {
    const [cur, setCur] = useState(0); // the first img of imgs group
    const [active, setActive] = useState(0); // active color of product
    const { setCount, setTotal, count, total } = useCustomContext();

    // store count, total states in ls
    useEffect(() => {
        localStorage.setItem('xperiaCount', count);
        localStorage.setItem('xperiaTotal', total);
    }, [count, total]);

    const handleHex = (i) => {
        setActive(i);
        setCur(0);
    }

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
    // showSuccessMsg('The product is added to your cart.');
}

    return (
        <section className='flex flex-col md:flex-row gap-10 justify-between'>
            {/* left side*/}
            <article className='flex gap-4 w-full md:w-6/12 border border-black/70 p-5 rounded-lg'>
                {/* small imgs */}
                <div className='flex flex-col min-w-[60px] gap-1 mt-3'>
                    {
                        product[`images${active === 0 ? '' : active + 1}`].map((obj, index) =>
                            <button key={index} onClick={() => { setCur(index) }} aria-label="cur">
                                <Image src={obj.path} className={`${cur === index ? 'border-blue-600' : 'border-black/30'} w-[60px] ${!product.battery ? 'h-[60px]' : 'h-[85px]'} rounded-lg border p-1`} width={60} height={60} priority alt='del' />
                            </button>
                        )
                    }
                </div>

                {/* big img */}
                <Image src={product[`images${active === 0 ? '' : active + 1}`][cur].path} className={`mx-auto  ${!product.battery ? 'h-[300px] w-[210px] lg:w-[400px]' : 'h-[440px] w-[190px] lg:w-[240px]'}`} width={500} height={500} priority alt='del' />
            </article>

            {/* right side */}
            <article className='w-full md:w-6/12 flex flex-col gap-4 md:gap-0 justify-around border border-black p-5 bg-slate-900 text-white rounded-lg'>
                <p className='text-xl border-b border-white/30'><span className='text-lg opacity-70 mr-2'>Model Name: </span>{product.name}</p>
                <p className='text-xl border-b border-white/30'><span className='text-lg opacity-70 mr-2'>Price: </span>{product.price}$</p>
                {product.cpuSpeed && <p className='text-xl border-b border-white/30'><span className='text-lg opacity-70 mr-2'>Touch Screen: </span>{product.touch ? 'Yes' : 'No'}</p>}
                {product.battery && <p className='text-xl border-b border-white/30'><span className='text-lg opacity-70 mr-2'>Release Date: </span>{product.date}</p>}
                {product.cpuSpeed && product.battery && <p className='text-xl border-b border-white/30'><span className='text-lg opacity-70 mr-2'>Screen Size: </span>{product.screenSize} Inches</p>}
                <p className='text-xl border-b border-white/30 capitalize'><span className='text-lg opacity-70 mr-2'>Brand: </span> {product.brand}</p>
                <div className='flex items-center gap-2 border-b border-white/30 pb-1'>
                    <span className='text-xl opacity-70'>Available Colors: </span>
                    {
                        product.colorsHex.map((hex, i) => <button key={i} onClick={() => handleHex(i)} style={{ backgroundColor: hex }} aria-label="hex" className='mr-2 w-7 h-7 rounded border border-white'></button>)
                    }
                </div>
                <button onClick={handleAddCart} className='mt-3 py-1 bg-blue-600 text-xl text-white w-full rounded-full' aria-label="cart">Add to cart</button>
            </article>
        </section>

    )
}
