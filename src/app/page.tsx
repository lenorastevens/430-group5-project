import Navbar from '../components/Navbar';
import HeroImage from '../components/Hero';
import Description from '../components/Description';
import SearchBar from '../components/SearchBar';
import LoginButton from '../components/LoginButton';
import LogoImage from '@/components/Logo';

export default function HomePage() {

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
        <div className='homePage-container'>
          {/* Main Content Left */}
          <div className="main-content">        
            <HeroImage />
          </div>

          {/* Main Content Right */}
          <div id="right-description">
            <Description />
          </div>
        </div>
      </div>
       
      {/* Footer Section */}
      <footer className="footer">
        <p> &copy; {currentYear} WDD340-Group 5.</p>
     
     </footer>
      </div>
  );
}
