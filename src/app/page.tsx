import Navbar from '../components/Navbar';
import HeroImage from '../components/Hero';
import Description from '../components/Description';
import SearchBar from '../components/SearchBar';
import LoginButton from '../components/LoginButton';

export default function HomePage() {
  return (
    <div className="container">
      {/* Left Navigation Bar */}
      <div className="left-nav">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="search-bar">
            <SearchBar />
          </div>
          <LoginButton />
        </header>
        <HeroImage />
      </div>

      {/* Right Description Section */}
      <div className="right-description">
        <Description />
      </div>
    </div>
  );
}
