import Image from 'next/image';

const HeroImage = () => {
  return (
    <div className="hero">
      <Image
        src="/hero.jpg"
        alt="Hero"
        width={500}
        height={430}
        style={{ borderRadius: '10px' }}
        priority
      />
    </div>
  );
};

export default HeroImage;
