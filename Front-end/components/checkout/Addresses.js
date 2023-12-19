'use client'
import AddressModal from '@/components/checkout/Address-Modal';
import { useCustomContext } from '@/contextApi/context';
import { showSuccessMsg } from '@/utils/successMsg';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md';

export default function Addresses({ setIsAddresChecked }) {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ country: 'united kingdom', fullName: '', mobileNumber: '', streetName: '', buildName: '', city: '' });
    const [addresses, setAddresses] = useState([]);
    const [activeAddress, setActiveAddress] = useState(-1);
    const [editID, setEditID] = useState(0);
    const { loading, setLoading, setModalType } = useCustomContext();
    useEffect(() => {
        if (!modal)
            getAddresses();
    }, [modal]);

    const getAddresses = () => {
        setLoading(true);
        const token = localStorage.getItem('xperia-token');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/address`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setAddresses(res.data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                console.log(e);
            })
    }

    const handleAddressRadio = (e) => {
        setActiveAddress(e.target.id);
        setIsAddresChecked(true);
    };


    const handleAdd = () => {
        setModalType('post');
        setModal(true);
    }

    const handleEdit = (obj) => {
        setEditID(obj._id);
        setModalType('edit');
        setModal(true);
        setForm({ country: obj.country, fullName: obj.fullName, mobileNumber: obj.mobileNumber, streetName: obj.streetName, buildName: obj.buildName, city: obj.city })
    }

    const handleDelete = async (obj) => {
        setLoading(true);
        const token = localStorage.getItem('xperia-token');
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/address/${obj._id}`, { headers: { Authorization: `Bearer ${token}` } })
            getAddresses();
            setLoading(false);
            showSuccessMsg('An address is deleted.');
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    return (
        <div>
            <p className='text-red-600 text-xl font-semibold mb-1'>Choose a shipping address</p>
            <article className='border border-black/50 rounded-md p-4'>
                <p className='font-semibold text-lg border-b border-black/30 mb-2'>Your Addresses</p>
                {addresses.length < 1 && <p className='text-red-500 '>You have no addresses!</p>}
                <div>
                    {
                        !loading ?
                            addresses.map(obj =>
                                <div key={obj._id} className={`${activeAddress === obj._id ? 'ring ring-red-600' : 'ring-transparent'} bg-slate-500/20 text-black mb-2 flex gap-2 items-center justify-between p-4 rounded-md`}>
                                    <input onClick={handleAddressRadio} type="radio" className='w-4 h-4' name="i" id={obj._id} />
                                    <label htmlFor={obj._id} className='px-3 flex flex-col justify-between items-start w-full'>
                                        <p title='Full Name' className='font-semibold capitalize'>{obj.fullName}</p>
                                        <p title='Mobile'>{obj.mobileNumber}</p>
                                        <p title='Country' className='capitalize'>{obj.country}</p>
                                        <p title='City' className='capitalize'>{obj.city}</p>
                                        <p title='Street Name' className='capitalize'>{obj.streetName}</p>
                                        <p title='Build Name' className='capitalize'>{obj.buildName}</p>
                                    </label>

                                    <div className='flex flex-col items-center gap-4'>
                                        <button onClick={() => handleEdit(obj)} className='text-white bg-blue-700 py-[3px] w-[80px]'>Edit</button>
                                        <button onClick={() => handleDelete(obj)} className=' text-white bg-red-600 py-[3px] w-[80px]'>Delete</button>
                                    </div>
                                </div>
                            )
                            :
                            <p className='text-center text-xl text-blue-600'>Loading...</p>
                    }
                </div>

                <button className='mt-1 underline flex items-center hover:text-red-600 duration-300' onClick={handleAdd}><AiOutlinePlus /> <MdLocationOn className='text-xl' /> Add new Address</button>
                <AddressModal modal={modal} setModal={setModal} form={form} setForm={setForm} editID={editID} />
            </article >
        </div >
    )
}
