'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { useCustomContext } from '@/contextApi/context';
import { redirect } from 'next/navigation';
import { showSuccessMsg } from '@/utils/successMsg';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { isAuth, setIsAuth } = useCustomContext();

    // reset success, error messages
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMsg('');
            setErrorMsg('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [successMsg, errorMsg]);

    const handleEmail = (e) => setEmail(e.target.value.toLowerCase());
    const handlePassword = (e) => setPassword(e.target.value);


    const login = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email && !password)
            return setErrorMsg('Please provide your email and password.');

        if (!email)
            return setErrorMsg('Please provide your email.');

        if (!password)
            return setErrorMsg('Please provide your password.');

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, { email, password });
            localStorage.setItem('xperia-token', res.data.token);
            setIsAuth(true);
            showSuccessMsg('Signed In Successfully.');
        }
        catch (e) {
            setErrorMsg(e.response.data['error-msg']);
            setIsAuth(false);
        }
    }

    if (isAuth)
        redirect('/');

    return (
        <form className='container flex flex-col gap-4 sm:gap-8 text-white bg-slate-900 w-[340px] sm:w-[400px] rounded-lg mx-auto p-10 my-16'>
            <p className='text-white text-4xl text-center'>Sign In</p>
            <div>
                <label className='mb-1 block' htmlFor="1">Email</label>
                <input type="email" id='1' value={email} onChange={handleEmail} className='text-black w-full px-3 py-1 border-black outline-none border-1' placeholder='Email' />
            </div>
            <div>
                <label className='mb-1 block' htmlFor="2">Password</label>
                <input type="password" id='2' value={password} onChange={handlePassword} className='text-black w-full px-3 py-1 border-black outline-none border-1' placeholder='password' />
            </div>
            <div>
                <button onClick={login} className='block w-full bg-blue-600 p-1 mb-5 text-lg'>Login</button>
                {
                    errorMsg && <p className='text-red-500 text-center'>{errorMsg}</p>
                }
                {
                    successMsg && <p className='text-green-400 text-center'>{successMsg}</p>
                }
                <p className='text-center'>No account? <Link href={'/register'} className='text-blue-400'>Create one!</Link></p>
            </div>
        </form>
    )
}
