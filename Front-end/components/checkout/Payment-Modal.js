'use client'
import { useCustomContext } from '@/contextApi/context';
import { formatNum } from '@/utils/formatNum';
import { showSuccessMsg } from '@/utils/successMsg';
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'

export default function PaymentModal({ modal, setModal, form, setForm, editID }) {
    const [error, setError] = useState({ cardName: '', cardNumber: '', expirationMonth: '', expirationYear: '', cvc: '' });
    const { modalType } = useCustomContext();
    const [block, setBlock] = useState(false);

    const handleCardName = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]+/, '')
        setForm({ ...form, cardName: value });
        if (value.length === 0)
            return setError({ ...error, cardName: 'Required' });

        if (value.length < 7)
            return setError({ ...error, cardName: 'Name on card must be >= 7 letters!' });

        if (value.length >= 7)
            setError({ ...error, cardName: '' });
    }

    const handleCardNumber = (e) => {
        const number = e.target.value.replace(/\D/g, "");
        setForm({ ...form, cardNumber: number });

        if (number.length === 0)
            return setError({ ...error, cardNumber: 'Required' });

        if (number.length < 16)
            return setError({ ...error, cardNumber: 'card number must be = 16 numbers!' });

        if (number.length === 16)
            setError({ ...error, cardNumber: '' });
    };

    const handleMonth = (e) => {
        setForm({ ...form, expirationMonth: e.target.value });
    };

    const handleYear = (e) => {
        setForm({ ...form, expirationYear: e.target.value });
    };

    const handleCVC = (e) => {
        const number = e.target.value.replace(/\D/g, "");
        setForm({ ...form, cvc: number });

        if (number.length === 0)
            return setError({ ...error, cvc: 'Required' });

        if (number.length < 3)
            return setError({ ...error, cvc: 'card cvc must be = 3 numbers!' });

        if (number.length === 3)
            setError({ ...error, cvc: '' });

    };

    const resetState = () => {
        setForm({ cardName: '', cardNumber: '', expirationMonth: new Date().getMonth() + 1 === '12' ? '01' : formatNum(new Date().getMonth() + 1), expirationYear: new Date().getFullYear(), cvc: '' });
        setError({ cardName: '', cardNumber: '', expirationMonth: '', expirationYear: '', cvc: '' });
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        // blocking adding if there is existing one
        if (block)
            return;

        const { cardName, cardNumber, expirationMonth, expirationYear, cvc } = form;

        setError({
            cardName: !cardName ? 'Required' : error.cardName ? error.cardName : '',
            cardNumber: !cardNumber ? 'Required' : error.cardNumber ? error.cardNumber : '',
            expirationMonth: !expirationMonth ? 'Required' : error.expirationMonth ? error.expirationMonth : '',
            expirationYear: !expirationYear ? 'Required' : error.expirationYear ? error.expirationYear : '',
            cvc: !cvc ? 'Required' : error.cvc ? error.cvc : '',

        });

        if (cardName.length >= 7 && cardNumber.length === 16 && cvc.length === 3) {
            try {
                setBlock(true);
                const token = localStorage.getItem('xperia-token');
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/visa`, { ...form }, { headers: { Authorization: `Bearer ${token}` } })
                setModal(false);
                showSuccessMsg('A new credit card is added successfully.');
                setBlock(false);
            }
            catch (e) {
                setModal(false);
                setBlock(false);
            }
            setForm({ cardName: '', cardNumber: '', expirationMonth: '01', expirationYear: new Date().getFullYear(), cvc: '' });
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        const { cardName, cardNumber, cvc } = form;

        if (cardName.length >= 7 && cardNumber.length === 16 && cvc.length === 3) {
            try {
                const token = localStorage.getItem('xperia-token');
                await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/visa/${editID}`, { ...form }, { headers: { Authorization: `Bearer ${token}` } })
                setModal(false);
                showSuccessMsg('A credit card is edited successfully.');
            }
            catch (e) {
                setModal(false);
                showSuccessMsg('A credit card is edited successfully.');
            }
            setForm({ cardName: '', cardNumber: '', expirationMonth: '01', expirationYear: new Date().getFullYear(), cvc: '' });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setModal(false);
        resetState();
    }

    const handleClose = () => {
        setModal(false);
        resetState();
    }

    const handleModalLayout = (e) => {
        if (e.target.id === 'ModalHolder') {
            setModal(false);
            resetState();
        }
    }


    return (
        <div className={`z-[999999] fixed left-0 top-0 w-full h-screen bg-slate-900/70 duration-300  ${modal ? 'opacity-100' : 'opacity-0 collapse'}`} onClick={handleModalLayout} id='ModalHolder'>
            <div className={`duration-300 w-11/12 sm:w-[600px] md:w-[700px] bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 absolute rounded`}>
                <div className='py-4 px-5'>
                    <div className=' flex justify-between items-center'>
                        <h1 className='font-semibold text-2xl'>Xperia accepts all major credit and debit cards:</h1>
                        <button onClick={handleClose} className='text-3xl'><MdClose /></button>
                    </div>
                </div>
                <div className='h-px bg-black'></div>
                <div className='py-4 px-5'>
                    <form className='flex flex-col sm:flex-row gap-5'>
                        <div>
                            <article className='mb-3'>
                                <div className='flex items-center gap-2'>
                                    <label className='w-[100px] sm:w-[120px]' htmlFor="4">Card Number</label>
                                    <input onChange={handleCardNumber} maxLength={16} value={form.cardNumber} id='4' className={`${error.cardNumber ? 'ring-red-600/50' : 'ring-blue-500/50'} grow py-[2px] rounded outline-none border border-black/50 focus:ring-4 ring-blue-500/50 px-3`} type="text" />
                                </div>
                                {error.cardNumber && <p className='mt-1 text-red-600'>{error.cardNumber}</p>}
                            </article>

                            <article className='mb-3'>
                                <div className='flex items-center gap-2'>
                                    <label className='w-[100px] sm:w-[120px]' htmlFor="1">Name On Card</label>
                                    <input onChange={handleCardName} value={form.cardName} maxLength={16} id='1' className={`${error.cardName ? 'ring-red-600/50' : 'ring-blue-500/50'} grow py-[2px] rounded outline-none border border-black/50 focus:ring-4 ring-blue-500/50 px-3`} type="text" />
                                </div>
                                {error.cardName && <p className='mt-1 text-red-600'>{error.cardName}</p>}
                            </article>

                            <div className='mb-3 flex items-center gap-2'>
                                <label className='w-[100px] sm:w-[120px]' htmlFor="4">Expiration date</label>
                                <select onChange={handleMonth} value={form.expirationMonth} className='block mt-2 py-1 rounded outline-none border border-black/50 focus:ring-4 ring-blue-500/50 px-3' name="" id="">
                                    {
                                        Array.from({ length: 12 }).map((_, i) => {
                                            const month = formatNum(i + 1);
                                            return <option key={i} value={month}>{month}</option>
                                        }
                                        )
                                    }
                                </select>
                                <select onChange={handleYear} value={form.expirationYear} className='block mt-2 py-1 rounded outline-none border border-black/50 focus:ring-4 ring-blue-500/50 px-3' name="" id="">
                                    {
                                        Array.from({ length: 20 }).map((_, i) => {
                                            const year = new Date().getFullYear();
                                            return <option key={i} value={year + i}>{year + i}</option>
                                        }
                                        )
                                    }
                                </select>
                            </div>

                            <article className='mb-3'>
                                <div className='flex items-center gap-2'>
                                    <label className='w-[100px] sm:w-[120px]' htmlFor="1">CVC</label>
                                    <input onChange={handleCVC} value={form.cvc} maxLength={3} id='1' className={`${error.cvc ? 'ring-red-600/50' : 'ring-blue-500/50'} grow py-[2px] rounded outline-none border border-black/50 focus:ring-4 ring-blue-500/50 px-3`} type="text" />
                                </div>
                                {error.cvc && <p className='mt-1 text-red-600'>{error.cvc}</p>}
                            </article>
                        </div>

                        <span className='hidden sm:block h-[120px] w-px bg-black/50'></span>

                        <Image src={'/visa.png'} className='self-center' width={150} height={150} alt='del' />
                    </form>
                </div>
               
                <div className='h-px bg-black'></div>
                
                <div className='py-4 px-5 flex justify-end gap-3'>
                    <button onClick={handleCancel} className='bg-red-500 text-white px-3 py-1 rounded'>Cancel</button>
                    {
                        modalType === 'post' && <button onClick={handleAdd} className='bg-blue-500 text-white px-3 py-1 rounded'>Add Address</button>
                    }
                    {
                        modalType === 'edit' && <button onClick={handleEdit} className='bg-blue-500 text-white px-3 py-1 rounded'>Edit Address</button>
                    }
                </div>
            </div>
        </div>
    )
}
