'use client'
import React, { useEffect, useRef } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

export default function Page() {
    const nameRef = useRef();

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    return (
        <>
            <div className='sm:w-1/2 self-start 2xl:self-center'>
                <p className='text-3xl mb-5'>Contact Us</p>
                <div className='flex items-center gap-2 mb-6'>
                    <FaMapMarkerAlt className='text-xl' />
                    <p>Address: <span className='text-black/70'>678 River Road - United Kingdom.</span></p>
                </div>
                <div className='flex items-center gap-2 mb-6'>
                    <BsFillTelephoneFill className='text-xl' />
                    <p>Phone: <span className='text-black/70'>912-963-1908</span></p>
                </div>

                <div className='flex items-center gap-2'>
                    <MdEmail className='text-xl' />
                    <p>Email: <span className='text-black/70'>xyz@gmail.com</span></p>
                </div>
            </div>

            <form action="" className='w-full sm:w-1/2'>
                <p className='text-3xl mb-5 text-black'>Message Us</p>
                <div className='flex flex-col gap-2'>
                    <div>
                        <label></label>
                        <input type="text" ref={nameRef} placeholder='Name' className='w-full px-4 py-2 bg-transparent border-b border-black/60 outline-none text-black placeholder:text-black/90' />
                    </div>
                    <div>
                        <label></label>
                        <input type="email" placeholder='Email' className='w-full px-4 py-2 bg-transparent border-b border-black/60 outline-none text-black placeholder:text-black/90' />
                    </div>
                    <textarea className='text-black resize-none w-full h-60 outline-none p-4 bg-transparent placeholder:text-black/90 caret-black border-b border-black/60' placeholder='Write here your message...'></textarea>
                    <button aria-label="send" onClick={(e) => e.preventDefault()} className='text-black text-lg bg-transparent border-black/60 border py-1 rounded-full'>Send</button>
                </div>
            </form>
        </>
    )
}
