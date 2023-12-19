'use client'

import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react'
const Cntx = createContext();

const CntxProvider = ({ children }) => {
    const [total, setTotal] = useState(localStorage.getItem('xperiaTotal') || 0); // price of items
    const [count, setCount] = useState(localStorage.getItem('xperiaCount') || 0); // cart items count
    const [lapsG, setLapsG] = useState([]); // laptops
    const [mobsG, setMobsG] = useState([]); // mobiles
    const [earbudsG, setEarbudsG] = useState([]);
    const [overG, setOverG] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [modalType, setModalType] = useState('post');

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('xperia-token');
        axios(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res.status === 200)
                    setIsAuth(true);
                else
                    setIsAuth(false);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
            });
    }, [])



    return <Cntx.Provider value={{
        count, setCount,
        total, setTotal,
        lapsG, setLapsG,
        mobsG, setMobsG,
        earbudsG, setEarbudsG,
        overG, setOverG,
        loading, setLoading,
        productsLoading, setProductsLoading,
        filterLoading, setFilterLoading,
        isAuth, setIsAuth,
        modalType, setModalType,
    }}>
        {children}
    </Cntx.Provider>
}

export const useCustomContext = () => {
    return useContext(Cntx);
}

export default CntxProvider;