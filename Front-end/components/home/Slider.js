'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export default function Slider() {
    const [sliderImgs, setSliderImgs] = useState([]);
    const [pos, setPos] = useState({});

    // get slider imgs from db
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/slider`)
            .then(res => {
                setSliderImgs(res.data);
                setPos({ pre: res.data.length - 1, cur: 0, next: 1 });
            })
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleLeft();
        }, 1800);
        return () => clearInterval(interval);
    }, [pos, sliderImgs]);

    const handleRight = () => {
        if (pos.cur === sliderImgs.length - 1)
            setPos({ pre: sliderImgs.length - 1, cur: 0, next: 1 })
        else
            setPos({ pre: pos.pre + 1 >= sliderImgs.length ? 0 : pos.pre + 1, cur: pos.cur + 1, next: pos.next + 1 >= sliderImgs.length ? 0 : pos.next + 1 })
    }

    const handleLeft = () => {
        if (pos.cur === 0)
            setPos({ pre: sliderImgs.length - 2, cur: sliderImgs.length - 1, next: 0 });
        else
            setPos({ pre: pos.pre - 1 < 0 ? sliderImgs.length - 1 : pos.pre - 1, cur: pos.cur - 1, next: pos.next - 1 });
    }

    const handleIndicator = (i) => {
        if (i === 0)
            setPos({ pre: sliderImgs.length - 1, cur: 0, next: 1 });
        else if (i === sliderImgs - 1)
            setPos({ pre: i - 1, cur: i, next: 0 });
        else
            setPos({ pre: i - 1, cur: i, next: i + 1 });
    }


    return (
        <section className='container relative bg-slate-800 mt-12 h-[220px] sm:h-[300px] overflow-hidden'>
            {/* pointers */}
            <button onClick={handleRight} aria-label="right" className='text-white text-4xl bg-black/20 z-20 hover:bg-black/60 hover:ring rounded duration-300 py-2 px-1 absolute top-1/2 right-5 -translate-y-1/2'><BiChevronRight /></button>
            <button onClick={handleLeft} aria-label="left" className='text-white text-4xl bg-black/20 z-20 hover:bg-black/60 hover:ring rounded duration-300 py-2 px-1 absolute top-1/2 left-5 -translate-y-1/2'><BiChevronLeft /></button>

            {/* imgs */}
            {
                sliderImgs.map((obj, i) =>
                    <div key={i} className={`absolute h-full w-full duration-300 opacity-0 ${pos.cur === i ? 'left-0 opacity-100' : pos.pre === i ? '-left-full' : 'left-full'}`}>
                        <Link href={obj.link} aria-label='shop' className='absolute z-50 bottom-10 left-14 sm:bottom-20 sm:left-32 text-white  border-white px-2 sm:px-4 py-1 bg-blue-700'>Shop now</Link>
                        <Image src={obj.img} className='h-full' priority width={3000} height={3000} alt='del' />
                    </div>
                )
            }

            {/* indicators */}
            <div className='flex justify-center gap-2 absolute  bottom-4 left-1/2 z-[125] -translate-x-1/2'>
                {
                    sliderImgs.map((_, i) =>
                        <button key={i} aria-label={i} onClick={() => handleIndicator(i)} className={`${pos.cur === i ? 'bg-blue-600' : 'bg-white'} w-6 h-[3px] duration-300`}></button>
                    )
                }
            </div>
        </section>
    )
}
