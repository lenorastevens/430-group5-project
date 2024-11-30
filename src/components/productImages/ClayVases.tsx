import Image from 'next/image';

export default function ClayVasesImage() {
  return (
        
    <Image
      className="prod-img"
      src="/images/pottery.webp"
      alt="custom clay vases"
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
