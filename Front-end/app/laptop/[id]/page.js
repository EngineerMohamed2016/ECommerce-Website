import React from 'react'
import Description from '@/components/Description';
import About from '@/components/About';
import PreviewAndCart from '@/components/PreviewAndCart';
import axios from 'axios';

export const metadata = {
  title: 'Laptop',
  description: 'Xperia | E-Commerce Website',
}

export default async function Page({ params }) {
  let { data: product } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/laptops/${params.id}`);

  if (!product) return <p className='text-3xl font-semibold text-center py-12'>Product Not Found!</p>

  return (
    <div className='container py-12'>
      <PreviewAndCart product={product} />
      <Description product={product} />
      <About product={product} />
    </div >
  )
}
