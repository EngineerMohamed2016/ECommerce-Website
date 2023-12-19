'use client'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import PaymentModal from './Payment-Modal'
import { FaCcVisa } from 'react-icons/fa';
import { useCustomContext } from '@/contextApi/context';
import axios from 'axios';
import { formatNum } from '@/utils/formatNum';
import { showSuccessMsg } from '@/utils/successMsg';

export default function Payment({ setCod, setIsPaymentChecked }) {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ cardName: '', cardNumber: '', expirationMonth: new Date().getMonth() + 1 === '12' ? '01' : formatNum(new Date().getMonth() + 1), expirationYear: new Date().getFullYear(), cvc: '' });
    const { loading, setLoading, setModalType } = useCustomContext();
    const [visas, setVisas] = useState([]);
    const [editID, setEditID] = useState(0);
    const [activeCard, setActiveCard] = useState([]);

    const getVisas = () => {
        setLoading(true);
        const token = localStorage.getItem('xperia-token');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/visa`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setVisas(res.data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
            })
    }

    useEffect(() => {
        if (!modal)
            getVisas();
    }, [modal]);

    const handleCod = (e) => {
        if (e.target.id === '10')
            return setCod(2);
        setCod(0);
    }

    const handleCardRadio = (e) => {
        setActiveCard(e.target.id);
        setIsPaymentChecked(true);
        handleCod(e);
    }

    const handleAdd = () => {
        setModalType('post');
        setModal(true);
    }

    const handleEdit = (visa) => {
        setEditID(visa._id);
        setModalType('edit');
        setModal(true);
        setForm({ cardName: visa.cardName, cardNumber: visa.cardNumber, expirationMonth: visa.expirationMonth, expirationYear: visa.expirationYear, cvc: visa.cvc })
    }

    const handleDelete = async (visa) => {
        setLoading(true);
        const token = localStorage.getItem('xperia-token');
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/visa/${visa._id}`, { headers: { Authorization: `Bearer ${token}` } })
            getVisas();
            setLoading(false);
            showSuccessMsg('A credit card is deleted successfully.');
        } catch (e) {
            setLoading(false);
        }
    }




    return (
        <div className='my-5'>
            <p className='text-blue-600 text-xl font-semibold mb-1'>Choose a payment method</p>
            <article className='border border-black/50 rounded-md p-4 '>
                <p className='font-semibold text-lg border-b border-black/30 mb-2'>Payment Ways</p>
                <div className='rounded-md'>
                    <p className='font-semibold mb-1 '>1- By Credit/Debit Card</p>
                    {visas.length < 1 && <p className='text-red-500 ml-1'>You have no cards!</p>}
                    {
                        !loading ?
                            visas.map(visa =>
                                <div key={visa._id} className={`${activeCard === visa._id ? 'ring ring-red-600' : 'ring-transparent'} mb-2 flex items-center gap-1 bg-slate-500/20 text-black p-4 rounded-md`}>
                                    <input type="radio" onClick={handleCardRadio} className='w-4 h-4' name="y" id={visa._id} />
                                    <label htmlFor={visa._id} className='px-3 flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-start w-full'>
                                        <p title='Card Number'>{visa.cardNumber}</p>
                                        <p title='Name on card'>{visa.cardName}</p>
                                        <p title='Expiration Date'>{visa.expirationMonth}/{visa.expirationYear}</p>
                                    </label>
                                    <div className='flex flex-col items-center gap-1'>
                                        <button onClick={() => handleEdit(visa)} className='text-white bg-blue-700 py-[2px] w-[52px] text-sm'>Edit</button>
                                        <button onClick={() => handleDelete(visa)} className=' text-white bg-red-600 py-[2px] w-[52px] text-sm'>Delete</button>
                                    </div>
                                </div>
                            )
                            :
                            <p className='text-center text-xl text-blue-600'>Loading...</p>
                    }
                </div>
                <button className='mt-1 mb-2 underline flex items-center gap-1 hover:text-red-600 duration-300' onClick={handleAdd}><AiOutlinePlus /><FaCcVisa className='text-xl' />Add credit or debit card</button>
                <PaymentModal modal={modal} setModal={setModal} form={form} setForm={setForm} editID={editID} />

                <hr />

                {/* cod */}
                <p className='font-semibold mt-2 mb-1'>2- Other payment options</p>
                <div className={`${activeCard === '10' ? 'ring ring-red-600' : 'ring-transparent'} flex items-center gap-1 bg-slate-800/30 text-white p-4 rounded-md`}>
                    <input onClick={handleCardRadio} type="radio" className='w-4 h-4' name="y" id="10" />
                    <label htmlFor="10" className='text-black text-lg'>Cash on delivery (COD)</label>
                </div>
            </article>
        </div>
    )
}
