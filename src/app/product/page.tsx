import GlassBoxImage from '@/components/productImages/GlassBox';
import StoneVaseImage from '@/components/productImages/StoneVase';
import WovenBasketsImage from '@/components/productImages/WovenBaskets';
import ClayVasesImage from '@/components/productImages/ClayVases';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Products() {
    return (
             
        <div className='main-body'>
          <h1>Products Page</h1>
          <ul className='card-container'>
            <li className='prod-card'>
              <div className='prod-img'>
                <GlassBoxImage/>
              </div>
              <div className='prod-details'>
                <h2>Royal Glass Trunk Box</h2>
                <h3>$65.00</h3>
                <p>This stylish glass trunk box with a brass frame serves as an organizer for your several items of daily use.</p>
                <p>Amy Burns</p>
                <a>Reviews & Ratings</a>
              </div>
            </li>
            <li className='prod-card'>
              <div className='prod-img'>
                <StoneVaseImage/>
              </div>
              <div className='prod-details'>
                <h2>Stone Vase</h2>
                <h3>$75.99</h3>
                <p>The intricate texture of this white-colored soft stone modern flowerpot makes it stand out among other décor items.</p>
                <p>Balazs Orban</p>
                <a>Reviews & Ratings</a>
              </div>
            </li>
            <li className='prod-card'>
              <div className='prod-img'>
                <WovenBasketsImage/>
              </div>
              <div className='prod-details'>
                <h2>Woven-Baskets</h2>
                <h3>$45</h3>
                <p>Carefully woven, but incredibly sturdy, these baskets are useful and decorative.</p>
                <p>Amy Burns</p>
                <a>Reviews & Ratings</a>
              </div>
            </li>
            <li className='prod-card'>
              <div className='prod-img'>
                <ClayVasesImage/>
              </div>
              <div className='prod-details'>
                <h2>Custom Clay Vases</h2>
                <h3>$85</h3>
                <p>Expertly designed and crafted to your specificatiosns.  Buy just one create a set.</p>
                <p>Balazs Orban</p>
                <a>Reviews & Ratings</a>
              </div>
            </li>
          </ul>
        </div>
         
        
    );
  }
  