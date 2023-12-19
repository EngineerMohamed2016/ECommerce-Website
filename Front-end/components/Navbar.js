'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaBars } from 'react-icons/fa'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useCustomContext } from '@/contextApi/context'
import { showSuccessMsg } from '@/utils/successMsg'

const links = [
    {
        path: '/',
        name: 'home',
    },
    {
        path: '/laptops',
        name: 'laptops',
    },
    {
        path: '/mobiles',
        name: 'mobiles',
    },
    {
        path: '/headphones',
        name: 'headphones',
    },
    {
        path: '/contact',
        name: 'contact',
    },
    {
        path: '/about',
        name: 'about',
    },
]

export default function Navbar() {
    const path = usePathname();
    const [show, setShow] = useState(false);
    const { count, isAuth, setIsAuth } = useCustomContext();

    const handleLogout = () => {
        setIsAuth(false);
        showSuccessMsg('Signed Out Successfully.');
        localStorage.removeItem('xperia-token');
    }

    return (
        <div className='bg-slate-950 sticky left-0 top-0 z-[999]'>
            <div className='container text-white flex flex-wrap justify-between items-center'>
                <Link href={'/'} aria-label='brand' className='text-4xl'>Xperia</Link>
                {/* screen >= lg */}
                <ul className='hidden lg:flex gap-10'>
                    {
                        links.map((obj, i) =>
                            <li key={i}><Link href={obj.path} className={`${path === obj.path ? 'text-blue-500' : 'text-white'} block px-2 py-5 capitalize under`} aria-label={'link' + i}>{obj.name}</Link></li>
                        )
                    }
                </ul>

                {/* cart + bars */}
                <div className='flex items-center gap-3'>
                    {
                        !isAuth ?
                            <Link href={'/login'} className='text-white text-xl'>Login</Link>
                            :
                            <button onClick={handleLogout} className='text-red-500 text-xl'>Logout</button>
                    }
                    <Link href={'/cart'} aria-label='p0' className='relative text-3xl sm:text-4xl'><BsFillCartPlusFill /><span className='absolute -right-2 -top-2 flex justify-center items-center bg-blue-700 text-white p-[2px] w-[25px] h-[25px] rounded-full font-semibold text-sm text-center'>{count}</span></Link>
                    <button onClick={() => setShow(!show)} className='lg:hidden text-3xl my-[17px]' aria-label='bars'><FaBars /></button>
                </div>

                {/* screen < lg */}
                <ul className={`lg:hidden basis-full overflow-hidden duration-300 ${show ? 'h-[205px] pb-2' : 'h-[0px] pb-0'}`}>
                    {
                        links.map((obj, i) =>
                            <li key={i}><Link onClick={() => setShow(false)} href={obj.path} className={`${path === obj.path ? 'text-blue-500' : 'text-white'} block px-2 py-1 border-b border-white/20 capitalize`} aria-label={'link2' + i}>{obj.name}</Link></li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
