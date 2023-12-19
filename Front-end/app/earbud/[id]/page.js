import React from 'react'
import Description from '@/components/Description';
import About from '@/components/About';
import PreviewAndCart from '@/components/PreviewAndCart';
import axios from 'axios';

export const metadata = {
  title: 'Earbud',
  description: 'Xperia | E-Commerce Website',
}

export default async function Page({ params }) {
  const { data: product } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/earbuds/${params.id}`);

  if (!product) return <p className='text-3xl font-semibold text-center my-10'>Product Not Found!</p>

  return (
    <div className='container pt-12'>
      <PreviewAndCart product={product} />
      <Description product={product} />
      <About product={product} />
    </div >
  )
}
