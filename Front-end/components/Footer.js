import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BsFillTelephoneFill, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { BsFacebook } from 'react-icons/bs'
import Link from 'next/link'
export default function Footer() {
    return (
        <div className='bg-slate-950'>
            <div className='container'>
                <section className='text-white py-10 gap-y-10 text-center md:text-start flex justify-between flex-wrap'>

                    <div className='w-full md:w-5/12 lg:w-3/12'>
                        <p className='text-5xl mb-5'>Xperia</p>
                        <input type="text" placeholder='Enter Your Email' className='w-full bg-transparent outline-none border-b border-white px-4 py-1' />
                        <button className='subscribe mx-auto md:mx-0 mt-4 block hover:bg-white hover:text-black duration-300 border border-white px-4 py-1 rounded-full' aria-label="sub">Subscribe</button>
                    </div>

                    <div className='w-full md:w-5/12 lg:w-3/12 flex flex-col gap-5'>
                        <p className='text-2xl border-b md:border-b-0 md:border-l px-1 border-blue-700/90 mx-auto md:mx-0 w-fit'>Our Products</p>
                        <Link aria-label='b11' href={'/laptops'} className='opacity-80 hover:opacity-100 duration-300'>Laptops</Link>
                        <Link aria-label='b22' href={'/mobiles'} className='opacity-80 hover:opacity-100 duration-300'>Mobiles</Link>
                        <Link aria-label='b33' href={'/headphones'} className='opacity-80 hover:opacity-100 duration-300'>Headphones</Link>
                    </div>

                    <div className='w-full md:w-5/12 lg:w-3/12 flex flex-col gap-5'>
                        <p className='text-2xl border-b md:border-b-0 md:border-l px-1 border-blue-700/90 mx-auto md:mx-0 w-fit'>Contact</p>
                        <div className='flex justify-center md:justify-start items-center gap-2 opacity-80'>
                            <FaMapMarkerAlt className='text-xl' />
                            <p className='text-sm'>Address: 678 River Road - United Kingdom</p>
                        </div>
                        <div className='flex justify-center md:justify-start items-center gap-2  opacity-80'>
                            <BsFillTelephoneFill className='text-xl' />
                            <p className='text-sm'>Phone: 912-963-1908</p>
                        </div>

                        <div className='flex justify-center md:justify-start items-center gap-2 opacity-80'>
                            <MdEmail className='text-xl' />
                            <p className='text-sm'>Email: xyz@gmail.com</p>
                        </div>
                    </div>

                    <div className='w-full md:w-5/12 lg:w-2/12'>
                        <p className='text-2xl border-b mb-5 md:border-b-0 md:border-l px-1 border-blue-700/90 mx-auto md:mx-0 w-fit'>Our Social</p>
                        <div className='flex justify-center md:justify-start gap-5'>
                            <Link aria-label='b1' href={'https://www.facebook.com'} target='_blank' className='text-3xl text-blue-500'>
                                <BsFacebook />
                            </Link>
                            <Link aria-label='b2' href={'https://www.instagram.com'} target='_blank' className='text-3xl'>
                                <BsInstagram />
                            </Link>
                            <Link aria-label='b3' href={'https://www.twitter.com'} target='_blank' className='text-3xl text-blue-300'>
                                <BsTwitter />
                            </Link>
                            <Link aria-label='b4' href={'https://www.youtube.com'} target='_blank' className='text-3xl text-red-500'>
                                <BsYoutube />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
