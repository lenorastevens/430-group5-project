import Image from 'next/image';

export default function HHLogo() {
  return (
        
    <Image
      className="logo"
      src="/logo-no-background.png"
      alt="Handcrafted Haven Logo"
      placeholder = 'empty'
      width={300}
      height={410}
    />  
  );
};

