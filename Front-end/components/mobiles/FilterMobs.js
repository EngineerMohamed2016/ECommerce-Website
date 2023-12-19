'use client'
import React, { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid';
import { getMax } from '@/utils/maxNum';
import { getMin } from '@/utils/minNum';
import { useCustomContext } from '@/contextApi/context';
import axios from 'axios';

export default function FilterMobs() {
    // fire filter useEffect
    const [fire, setFire] = useState(false);

    // min max price
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');

    // Current color
    const [hex, setHex] = useState('');

    // to get filter keys
    const [mobiles, setMobiles] = useState([]);

    const { setMobsG, setProductsLoading } = useCustomContext();

    // checkbox refs
    const checkboxBrandRefs = useRef([]);
    const checkboxYearRefs = useRef([]);
    const checkboxScreenRefs = useRef([]);
    const checkboxOsRefs = useRef([]);

    // forming filters ui
    const brands = [...new Set(mobiles.map(obj => obj.brand))]; // {'sony', 'samsung', ....}
    const years = [...new Set(mobiles.map(obj => obj.date.slice(-4)))];

    var hexSet = new Set();
    mobiles.map(obj => obj.colorsHex.map(hex => hexSet.add(hex)));
    const sizes = [...new Set(mobiles.map(obj => obj.screenSize))];
    const prices = [...new Set(mobiles.map(obj => obj.price))];
    const os = [...new Set(mobiles.map(obj => obj.os))];

    // active color
    const [activeColor, setActiveColor] = useState('');

    // curPrice
    const [curPrice, setCurPrice] = useState('');

    // to get filter keys
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mobiles`).then(res => {
            setMobiles(res.data);
            setCurPrice(getMax([...new Set(res.data.map(obj => obj.price))]));
        }).catch(e => console.log(e))
    }, [])

    // filter useEffect
    useEffect(() => {
        setProductsLoading(true);
        filter();
    }, [fire, curPrice]);

    const handleRange = (e) => {
        setMin('')
        setMax('');
        setCurPrice(e.target.value);
        setFire(!fire);
    }

    const handleColor = (e) => {
        setActiveColor(e.target.value);
        setHex(e.target.value);
        setFire(!fire);
    }

    // handle min max
    const handleMinMax = () => {
        if (isNaN(min) || isNaN(max))
            return alert('Enter a valid number!');

        if (min.length < 1 || max.length < 1)
            return alert('Enter a range');

        setCurPrice(getMax(prices));
        setFire(!fire);
    }

    const fireFilter = () => setFire(!fire);

    // filter function
    const filter = async () => {
        if (mobiles.length < 1)
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

        // Year
        checkboxYearRefs.current.forEach(checkbox => {
            if (checkbox.checked)
                queryValue = queryValue + checkbox.value + ',';
        })
        queries = queryValue ? `year=${queryValue}` : queries;
        queryValue = '';

        // Screen size
        checkboxScreenRefs.current.forEach(checkbox => {
            if (checkbox.checked)
                queryValue = queryValue + checkbox.value + ',';
        })
        queries = queryValue ? `screenSize=${queryValue}` : queries;
        queryValue = '';

        // OS
        checkboxOsRefs.current.forEach(checkbox => {
            if (checkbox.checked)
                queryValue = queryValue + checkbox.value + ',';
        })
        queries = queryValue ? `os=${queryValue}` : queries;
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

        // now fetching mobs 
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mobiles?${queries}`);

        // now data fetched
        setProductsLoading(false);

        // the final
        setMobsG(res.data);
    }


    if (mobiles.length < 1)
        return <></>

    return (
        <div className={`bg-slate-200 pl-2 self-start lg:w-[250px]`}>
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

            {/* year */}
            <p className='text-xl font-semibold mt-3 mb-1'>Year</p>
            {
                years.sort().map((year, i) => {
                    const nid = nanoid();
                    return (
                        <div key={i} className='flex items-center gap-2'>
                            <input type='checkbox' ref={e => checkboxYearRefs.current[i] = e} onClick={fireFilter} value={year} id={nid} className='w-4 h-4' />
                            <label htmlFor={nid} className='capitalize'>{year}</label>
                        </div>
                    )
                }
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

            {/* Screen Size */}
            <p className='text-xl font-semibold mt-3 mb-1'>Screen Size</p>
            {
                sizes.sort().map((size, i) => {
                    const nid = nanoid();
                    return (
                        <div key={i} className='flex items-center gap-2'>
                            <input type='checkbox' ref={e => checkboxScreenRefs.current[i] = e} onClick={fireFilter} value={size} id={nid} className='w-4 h-4' />
                            <label htmlFor={nid} className='capitalize'>{size}</label>
                        </div>
                    )
                }
                )
            }

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

            {/* OS */}
            <p className='text-xl font-semibold mt-3 mb-1'>Operting System</p>
            {
                os.map((os, i) => {
                    const nid = nanoid();
                    return (
                        <div key={i} className='flex items-center gap-2'>
                            <input type='checkbox' ref={e => checkboxOsRefs.current[i] = e} onClick={filter} value={os} id={nid} className='w-4 h-4' />
                            <label htmlFor={nid} className='capitalize'>{os}</label>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}
