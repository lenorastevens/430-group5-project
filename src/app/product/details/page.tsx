import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details',
};

export default async function Details() {
    return (
      <div className='main-body'>
        <h2>Product Details</h2>
      </div>        
    );
};