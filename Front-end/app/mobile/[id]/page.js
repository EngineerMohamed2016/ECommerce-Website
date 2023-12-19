import PreviewAndCart from '@/components/PreviewAndCart';
import About from '@/components/About';
import Description from '@/components/Description';
import React from 'react'
import axios from 'axios';

export const metadata = {
  title: 'Mobile',
  description: 'Xperia | E-Commerce Website',
}

export default async function Page({ params }) {
  const { data: product } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/mobiles/${params.id}`);

  if (!product) return <p className='text-3xl font-semibold text-center py-12'>Product Not Found!</p>

  return (
    <div className='container py-12'>
      <PreviewAndCart product={product} />
      <Description product={product} />
      <About product={product} />
    </div >
  )
}
