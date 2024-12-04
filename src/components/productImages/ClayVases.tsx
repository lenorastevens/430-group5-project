import Image from 'next/image';

export default function ClayVasesImage() {
  return (
        
    <Image
      className="prod-img"
      src="/images/pottery.webp"
      alt="Picture of custom clay vases"
      sizes="50vw"
      style={{
        width: 'auto',
        height: '90%',
      }}
      width={526}
      height={384}
    />  
  );
};
