import { Metadata } from 'next';
import { fetchReview } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Reviews and Ratings',
};

export default async function Review() {
  const review = await fetchReview();
    console.log(review)

    return (
      <div className='main-body'>
        <h2>Product Review</h2>
        <div>

        </div>
      </div>        
    );
};