import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import LoginButton from '../../components/LoginButton';
import LogoImage from '@/components/Logo';
import GlassBoxImage from '@/components/productImages/GlassBox';
import StoneVaseImage from '@/components/productImages/StoneVase';
import WovenBasketsImage from '@/components/productImages/WovenBaskets';
import ClayVasesImage from '@/components/productImages/ClayVases';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Products() {
  const currentYear = new Date().getFullYear();
    return (
      <div id="container">
        {/* Top Navigation Bar */}
        <header className="header">
          <div className="search-bar">
            <SearchBar />
          </div>
          <LoginButton />
        </header>
        {/* Left Nav Bar */}
        <div id="left-nav">
          <LogoImage />
          <Navbar />
        </div>
        
        <div className='main-body'>
          <h1>Products Page</h1>
          <ul className='card-container'>
            <li className='prod-card'>
              <div className='prod-img'>
                <GlassBoxImage/>
              </div>
              <div className='prod-details'>
                <h3>Royal Glass Trunk Box</h3>
                <h4>$65.00</h4>
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
                <h3>Stone Vase</h3>
                <h4>$75.99</h4>
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
                <h3>Woven-Baskets</h3>
                <h4>$45</h4>
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
                <h3>Custom Clay Vases</h3>
                <h4>$85</h4>
                <p>Expertly designed and crafted to your specificatiosns.  Buy just one create a set.</p>
                <p>Balazs Orban</p>
                <a>Reviews & Ratings</a>
              </div>
            </li>
          </ul>
        </div>
         
        {/* Footer Section */}
        <footer className="footer">
          <p> &copy; {currentYear} WDD340-Group 5.</p>
       
       </footer>
        </div>
    );
  }
  