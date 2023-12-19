'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const CntxProvider = dynamic(() => import('../contextApi/context'), { ssr: false })

export default function CntxProviderLazy({ children }) {
    return <CntxProvider>{children}</CntxProvider>
}














