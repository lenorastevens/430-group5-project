import HeroImage from '../components/Hero';
import Description from '../components/Description';

export default function HomePage() {

  return (
          
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
       
    
  );
}
