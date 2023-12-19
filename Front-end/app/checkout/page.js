'use client'
import Addresses from '@/components/checkout/Addresses'
import Items from '@/components/checkout/Items'
import OrderSummary from '@/components/checkout/Order-Summary'
import Payment from '@/components/checkout/Payment'
import { useCustomContext } from '@/contextApi/context'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'


export default function Page() {
    const [cod, setCod] = useState(0); // cash on delivery 
    const [isAddresChecked, setIsAddresChecked] = useState(false);
    const [isPaymentChecked, setIsPaymentChecked] = useState(false);
    const { isAuth, loading } = useCustomContext();

    if (!isAuth && !loading)
        redirect('/login');

    if (!localStorage.getItem('xperiaProducts'))
        redirect('/cart');

    return (
        <section className='container py-12 grow flex flex-col gap-5'>
            <p className='text-3xl text-center font-semibold relative before:bg-black before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:w-20'>Checkout</p>
            <div className='flex flex-col gap-y-10 sm:flex-row justify-between flex-wrap'>
                <div className='w-full md:w-7/12'>
                    <Addresses setIsAddresChecked={setIsAddresChecked} />
                    <Payment cod={cod} setCod={setCod} setIsPaymentChecked={setIsPaymentChecked} />
                    <Items />
                </div>
                <div className='w-full md:w-4/12'>
                    <OrderSummary cod={cod} isAddresChecked={isAddresChecked} isPaymentChecked={isPaymentChecked} />
                </div>
            </div>

        </section>
    )
}
