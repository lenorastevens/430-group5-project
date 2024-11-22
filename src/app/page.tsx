import Navbar from '../components/Navbar';
import HeroImage from '../components/Hero';
import Description from '../components/Description';
import SearchBar from '../components/SearchBar';
import LoginButton from '../components/LoginButton';
import LogoImage from '@/components/Logo';

export default function HomePage() {
  return (
    <div id="container">
      {/* Left Navigation Bar */}
      <header className="header">
        <div className="search-bar">
          <SearchBar />
        </div>
        <LoginButton />
      </header>
      
      <div id="left-nav">
        <LogoImage />
        <Navbar />
      </div>
      

      {/* Main Content */}
      <div className="main-content">        
        <HeroImage />
      </div>

      {/* Right Description Section */}
      <div id="right-description">
        <Description />
      </div>
    </div>
  );
}
