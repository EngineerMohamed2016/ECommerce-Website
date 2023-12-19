'use client'
import { useCustomContext } from '@/contextApi/context';
import React from 'react'
import axios from 'axios';
import { showErrorMsg } from '@/utils/errorMsg';
import { showSuccessMsg } from '@/utils/successMsg';

export default function OrderSummary({ cod, isAddresChecked, isPaymentChecked }) {
    const { total, count, setTotal, setCount } = useCustomContext();

    const placeOrder = async function () {
        if (!isAddresChecked && !isPaymentChecked)
            return alert('Please, choose your address & payment way.');

        if (!isAddresChecked)
            return alert('Please, choose your address.');

        if (!isPaymentChecked)
            return alert('Please, choose your payment way.');

        // store transaction at db
        try {
            const token = localStorage.getItem('xperia-token');
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/transactions`, { productsCount: count, totalPrice: (Number(total) + cod + 5).toFixed(2) }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            showSuccessMsg('Your order is placed successfully.')
            // reset total, count, clear ls
            localStorage.removeItem('xperiaProducts');
            localStorage.setItem('xperiaCount', 0);
            localStorage.setItem('xperiaTotal', 0);
            setTotal(0);
            setCount(0);
        } catch (e) {
            showErrorMsg('Relogin please!')
        }
    }

    return (
        <>
            <div className='sticky top-28'>
                <div className='bg-black text-white rounded-lg p-4 w-full flex flex-col gap-3 self-start'>
                    <p className='text-xl font-semibold'>Order Summary</p>
                    <hr />
                    <p className='text-xl'>Items: <span>{total}$</span></p>
                    <p>Shipping & handling: <span>5$</span></p>
                    <p>Cash on delivery: <span>{cod}$</span></p>
                    <hr />
                    <p className='text-xl text-red-500'>Order total: <span>{(Number(total) + cod + 5).toFixed(2)}$</span></p>
                    <button onClick={placeOrder} aria-label="order" className='text-xl py-1 rounded-md bg-blue-700 text-white hover:bg-blue-600'>Place Order</button>
                </div>
            </div>
        </>
    )
}
