import Image from 'next/image';

export default function StoneVaseImage() {
  return (
        
    <Image
      className="prod-img"
      src="/images/white-vase.webp"
      alt="white vase"
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
