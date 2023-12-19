'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { showSuccessMsg } from '@/utils/successMsg';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // reset messages
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMsg('');
            setErrorMsg('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [successMsg, errorMsg]);

    const register = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!name && !email && !password)
            return setErrorMsg('Please provide your name, email and password.');

        if (!name)
            return setErrorMsg('Please provide your name.');

        if (!email)
            return setErrorMsg('Please provide your email.');

        if (!password)
            return setErrorMsg('Please provide your password.');

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, { name, email, password });
            showSuccessMsg('Registered Successfully, Now you can login.');
        }
        catch (e) {
            setErrorMsg(e.response.data['error-msg']);
        }
    }

    return (
        <form className='container flex flex-col gap-4 sm:gap-8 text-white bg-slate-900 w-[340px] sm:w-[400px] rounded-lg mx-auto p-10 my-16'>
            <p className='text-white text-4xl text-center'>Sign Up</p>

            <div>
                <label className='mb-1 block' htmlFor="1">Name</label>
                <input type="email" id='1' value={name} onChange={(e) => setName(e.target.value)} className='text-black w-full px-3 py-1 border-black outline-none border-1' placeholder='Name' />
            </div>

            <div>
                <label className='mb-1 block' htmlFor="1">Email</label>
                <input type="email" id='1' value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} className='text-black w-full px-3 py-1 border-black outline-none border-1' placeholder='Email' />
            </div>
            <div>
                <label className='mb-1 block' htmlFor="2">Password</label>
                <input type="password" id='2' value={password} onChange={(e) => setPassword(e.target.value)} className='text-black w-full px-3 py-1 border-black outline-none border-1' placeholder='password' />
            </div>
            <div>
                <button onClick={register} className='block w-full bg-blue-600 p-1 mb-5 text-lg'>Register</button>
                {
                    errorMsg && <p className='text-red-500 text-center'>{errorMsg}</p>
                }
                {
                    successMsg && <p className='text-green-400 text-center'>{successMsg}</p>
                }
                <p className='text-center'>Have an account? <Link href={'/login'} className='text-blue-400'>Login!</Link></p>
            </div>
        </form>
    )
}
