import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews and Ratings',
};

export default async function Reviews() {
    return (
      <div className='main-body'>
        <h2>Product Review</h2>
      </div>        
    );
};