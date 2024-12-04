import Image from 'next/image';

export default function WovenBasketsImage() {
  return (
        
    <Image
      className="prod-img"
      src="/images/woven-baskets.webp"
      alt="woven baskets"
      sizes="30vw"
      style={{
        width: 'auto',
        height: '90%',
      }}
      width={384}
      height={526}
    />  
  );
};
