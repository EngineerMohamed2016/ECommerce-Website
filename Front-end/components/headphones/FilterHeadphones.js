'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useCustomContext } from '@/contextApi/context';
import { nanoid } from 'nanoid';
import { getMin } from '@/utils/minNum';
import { getMax } from '@/utils/maxNum';
import axios from 'axios';


export default function Filterheadphoness({ type }) {
    const checkboxBrandRefs = useRef([]);

    // firing filter useEffect
    const [fire, setFire] = useState(false);

    // Current color
    const [hex, setHex] = useState('');

    // to get filter keys |earbuds| or |overears|
    const [headphones, setHeadphones] = useState([]);

    // min max price
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    //  earbuds + overears
    const { setEarbudsG, setOverG, setProductsLoading } = useCustomContext();

    const prices = [...new Set(headphones.map(obj => obj.price))];

    // forming filters keys
    const brands = [...new Set(headphones.map(obj => obj.brand))]; // {'sony', 'samsung', ....}
    var hexSet = new Set()
    headphones.map(obj => obj.colorsHex.map(hex => hexSet.add(hex)));

    // active color
    const [activeColor, setActiveColor] = useState('');

    const [curPrice, setCurPrice] = useState('');

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${type}`).then(res => {
            setHeadphones(res.data);
            setCurPrice(getMax([...new Set(res.data.map(obj => obj.price))]));
        }).catch(e => console.log(e))
    }, []);

    // filter useEffect
    useEffect(() => {
        setProductsLoading(true);
        filter();
    }, [fire, curPrice]);

    // handleRange
    const handleRange = (e) => {
        setMin('')
        setMax('');
        setCurPrice(e.target.value);
        setFire(!fire);
    }

    // handle min max
    const handleMinMax = () => {
        if (isNaN(min) || isNaN(max)) {
            alert('Enter a valid number!');
            return
        }
        if (min.length < 1 || max.length < 1) {
            alert('Enter a range');
            return;
        }
        setCurPrice(getMax(prices));
        setFire(!fire);
    }

    const handleColor = (e) => {
        setActiveColor(e.target.value);
        setHex(e.target.value);
        setFire(!fire);
    }

    const fireFilter = () => setFire(!fire);


    // filter
    const filter = async () => {
        if (headphones.length < 1)
            return;

        let queries = '';
        let queryValue = '';

        // brand 
        checkboxBrandRefs.current.forEach(checkbox => {
            if (checkbox.checked)
                queryValue = queryValue + checkbox.value + ',';
        })
        queries = queryValue ? `brand=${queryValue}` : queries;
        queryValue = '';

        // colors 
        if (hex !== '')
            queries = queries + '&' + `hexcolor=${hex.slice(1)}`;

        // price range
        if (curPrice !== '')
            queries = queries + '&' + `numeric=price<=${curPrice},`;

        // price [min][max]
        if (min.length > 0 && max.length > 0)
            queries = queries + '&' + `priceRange=min=${min},max=${max}`;

        // now fetching earbuds  |or| overears 
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${type}?${queries}`);

        setProductsLoading(false);

        // the final array
        if (type === 'earbuds')
            setEarbudsG(res.data);
        else
            setOverG(res.data);
    }

    if (headphones.length < 1)
        return <></>

    return (
        <div className={`bg-slate-200 pl-2 self-start w-full lg:w-[250px] sticky top-16`}>
            {/* Brands */}
            <p className='text-xl font-semibold mb-1'>Brands</p>
            {
                brands.map((brand, i) =>
                    <div key={i} className='flex items-center gap-2'>
                        <input type='checkbox' ref={e => checkboxBrandRefs.current[i] = e} onClick={fireFilter} value={brand} id={i} className='w-4 h-4' />
                        <label htmlFor={i} className='capitalize'>{brand}</label>
                    </div>
                )
            }

            {/* Colors */}
            <p className='text-xl font-semibold mt-3 mb-1'>Colors</p>
            <div className='flex items-center flex-wrap gap-2 '>
                {
                    // '' means all colors
                    ['', ...hexSet].map((hex, i) => {
                        const active = hex === activeColor ? 'ring ring-red-600' : '';
                        if (i === 0)
                            return <button className='text-lg rounded-full w-6 h-6' aria-label="color" onClick={handleColor} value={hex} key={nanoid()}>All</button>
                        return <button key={i} className={`${active} w-5 h-5 rounded-full`} aria-label={`${i}c`} onClick={handleColor} style={{ backgroundColor: hex }} value={hex} ></button>
                    }
                    )}
            </div>

            {/* Price */}
            <p className='text-xl font-semibold mt-3 mb-1'>Price</p>

            <label htmlFor="range">{curPrice}$</label>
            <input type="range" step={1} id='range' value={curPrice} onChange={handleRange} min={getMin(prices)} max={getMax(prices)} className='mb-3 block' />

            {/* price min-max */}
            <div className='flex items-center gap-3'>
                <input onChange={(e) => setMin(e.target.value)} value={min} type="text" className='w-14 h-9 p-2 outline-none border border-black' placeholder={`Min`} />
                <span>to</span>
                <input onChange={(e) => setMax(e.target.value)} value={max} type="text" className='w-14 h-9 p-2 outline-none border border-black' placeholder={`Max`} />
                <button onClick={handleMinMax} className='text-xl text-blue-500' aria-label="minmax">Go</button>
            </div>

        </div>
    )
}
