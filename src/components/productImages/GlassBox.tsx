import Image from 'next/image';

export default function GlassBoxImage() {
  return (
        
    <Image
      className="prod-img"
      src="/images/glass-box.webp"
      alt="glass box"
      sizes="10vw"
      style={{
        width: 'auto',
        height: '90%',
      }}
      width={384}
      height={526}
    />  
  );
};
