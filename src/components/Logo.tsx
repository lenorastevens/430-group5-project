import Image from 'next/image';

export default function LogoImage() {
  return (
        
    <Image
      className="logo"
      src="/logo-no-background.png"
      alt="Logo"
      sizes="60vw"
      style={{
        width: '90%',
        height: 'auto',
      }}
      width={384}
      height={526}
    />  
  );
};

// export default LogoImage;