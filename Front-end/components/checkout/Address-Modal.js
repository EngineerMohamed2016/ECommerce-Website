'use client'
import { useCustomContext } from '@/contextApi/context';
import CountriesList from '@/data/Countries-List'
import { showSuccessMsg } from '@/utils/successMsg';
import axios from 'axios';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'

export default function AddressModal({ modal, setModal, form, setForm, editID }) {
    const [error, setError] = useState({ fullName: '', mobileNumber: '', streetName: '', buildName: '', city: '' });
    const { modalType } = useCustomContext();
    const [block, setBlock] = useState(false);

    // validate every input field
    const validateField = (inputValue, field, minLength, head) => {
        if (inputValue.length === 0)
            setError({ ...error, [field]: 'Required' });

        else if (inputValue.length < minLength)
            setError({ ...error, [field]: `${head} must be >= ${minLength} ${field === 'mobileNumber' ? "numbers" : 'letters'}!` });

        else
            setError({ ...error, [field]: '' });
    }

    const handleCountry = (e) => setForm({ ...form, country: e.target.value });

    const handleName = (e) => {
        setForm({ ...form, fullName: e.target.value });
        validateField(e.target.value, 'fullName', 3, 'full name');
    }

    const handleMobile = (e) => {
        const number = e.target.value.replace(/\D/g, "");
        setForm({ ...form, mobileNumber: number });
        validateField(number, 'mobileNumber', 10, 'Mobile number');
    };

    const handleStreet = (e) => {
        setForm({ ...form, streetName: e.target.value });
        validateField(e.target.value, 'streetName', 5, 'Street name');
    };

    const handleBuild = (e) => {
        setForm({ ...form, buildName: e.target.value });
        validateField(e.target.value, 'buildName', 5, 'Building name');
    };

    const handleCity = (e) => {
        setForm({ ...form, city: e.target.value });
        validateField(e.target.value, 'city', 5, 'City');
    };


    // reset form, error states
    const resetState = () => {
        setForm({ country: 'united kingdom', fullName: '', mobileNumber: '', streetName: '', buildName: '', city: '' });
        setError({ fullName: '', mobileNumber: '', streetName: '', buildName: '', city: '' });
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        // blocking adding if there is existing one
        if (block)
            return;

        const { country, fullName, mobileNumber, streetName, buildName, city } = form;

        // show error state for each input field
        setError({
            country,
            fullName: !fullName ? 'Required' : error.fullName ? error.fullName : '',
            mobileNumber: !mobileNumber ? 'Required' : error.mobileNumber ? error.mobileNumber : '',
            streetName: !streetName ? 'Required' : error.streetName ? error.streetName : '',
            buildName: !buildName ? 'Required' : error.buildName ? error.buildName : '',
            city: !city ? 'Required' : error.city ? error.city : '',
        });

        // storing at db
        if (fullName.length >= 3 && mobileNumber.length >= 10 && streetName.length >= 5 && buildName.length >= 5 && city.length >= 5) {
            try {
                setBlock(true);
                const token = localStorage.getItem('xperia-token');
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/address`, { ...form }, { headers: { Authorization: `Bearer ${token}` } })
                setModal(false);
                showSuccessMsg('New address is added successfully.');
                setBlock(false);
            }
            catch (e) {
                console.log(e);
                setModal(false);
                setBlock(false);
            }
            setForm({ country: 'united kingdom', fullName: '', mobileNumber: '', streetName: '', buildName: '', city: '' });
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        const { fullName, mobileNumber, streetName, buildName, city } = form;

        if (fullName.length >= 3 && mobileNumber.length >= 10 && streetName.length >= 5 && buildName.length >= 5 && city.length >= 5) {
            try {
                const token = localStorage.getItem('xperia-token');
                await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/address/${editID}`, { ...form }, { headers: { Authorization: `Bearer ${token}` } })
                setModal(false);
                showSuccessMsg('An address is edited successfully.');
            }
            catch (e) {
                console.log(e);
                setModal(false);
            }
            setForm({ country: 'united kingdom', fullName: '', mobileNumber: '', streetName: '', buildName: '', city: '' });
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
            resetState()
        }
    }

    return (
        <div className={`z-[999999] fixed overflow-y-auto left-0 top-0 w-full h-screen bg-slate-900/70 duration-300  ${modal ? 'opacity-100' : 'opacity-0 collapse'}`} onClick={handleModalLayout} id='ModalHolder'>
            <div className={`duration-300 w-11/12 sm:w-[500px] bg-white my-12 mx-auto sticky rounded`}>
                <div className='py-4 px-5'>
                    <div className=' flex justify-between items-center'>
                        <h1 className='font-semibold text-2xl'>Enter a new shipping address</h1>
                        <button onClick={handleClose} className='text-3xl'><MdClose /></button>
                    </div>
                </div>
                <div className='h-px bg-black'></div>
                <div className='py-4 px-5'>
                    <p className='mb-4 text-lg'>Add a new address</p>
                    <form>
                        <div className='mb-5'>
                            <label htmlFor="1">Country/region:</label>
                            <select onChange={handleCountry} value={form.country} className='block mt-2 w-full py-1 rounded outline-none border border-black/50 focus:ring-4 ring-blue-500/50 px-3' name="" id="">
                                {
                                    CountriesList.map((country, i) =>
                                        <option key={i} value={country.toLowerCase()}>{country}</option>)
                                }
                            </select>
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="1">Full Name:</label>
                            <input id='1' onChange={handleName} value={form.fullName} className={`focus:ring-4 ${error.fullName ? 'ring-red-600/50' : 'ring-blue-500/50'} block mt-2 w-full py-1 rounded outline-none border border-black/50 px-3`} type="text" />
                            {error.fullName && <p className='mt-1 text-red-600'>{error.fullName}</p>}
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="2">Mobile Number:</label>
                            <input id='1' onChange={handleMobile} value={form.mobileNumber} className={`focus:ring-4 ${error.mobileNumber ? 'ring-red-600/50' : 'ring-blue-500/50'} block mt-2 w-full py-1 rounded outline-none border border-black/50 px-3`} type="text" />
                            {error.mobileNumber && <p className='mt-1 text-red-600'>{error.mobileNumber}</p>}
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="3">Street Name:</label>
                            <input id='1' onChange={handleStreet} value={form.streetName} className={`focus:ring-4 ${error.streetName ? 'ring-red-600/50' : 'ring-blue-500/50'} block mt-2 w-full py-1 rounded outline-none border border-black/50 px-3`} type="text" />
                            {error.streetName && <p className='mt-1 text-red-600'>{error.streetName}</p>}
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="4">Building Name:</label>
                            <input id='1' onChange={handleBuild} value={form.buildName} className={`focus:ring-4 ${error.buildName ? 'ring-red-600/50' : 'ring-blue-500/50'} block mt-2 w-full py-1 rounded outline-none border border-black/50 px-3`} type="text" />
                            {error.buildName && <p className='mt-1 text-red-600'>{error.buildName}</p>}
                        </div>

                        <div className='mb-5'>
                            <label htmlFor="4">City/Area:</label>
                            <input id='1' onChange={handleCity} value={form.city} className={`focus:ring-4 ${error.city ? 'ring-red-600/50' : 'ring-blue-500/50'} block mt-2 w-full py-1 rounded outline-none border border-black/50 px-3`} type="text" />
                            {error.city && <p className='mt-1 text-red-600'>{error.city}</p>}
                        </div>

                        <div className='flex justify-end gap-3'>
                            <button onClick={handleCancel} className='bg-red-500 text-white px-3 py-1 rounded'>Cancel</button>
                            {
                                modalType === 'post' && <button onClick={handleAdd} className='bg-blue-500 text-white px-3 py-1 rounded'>Add Address</button>
                            }
                            {
                                modalType === 'edit' && <button onClick={handleEdit} className='bg-blue-500 text-white px-3 py-1 rounded'>Edit Address</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
