import { sancreek } from '@/app/ui/fonts';

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 p-4 md:p-6">
      <h2
        className={`${sancreek.className} text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight`}
      >
        Handcrafted Haven
      </h2>
      <p
        className="text-secondary text-lg sm:text-xl md:text-2xl font-epilogue leading-relaxed md:leading-normal text-wrap"
      >
        Welcome to Handcrafted Haven, your destination for discovering unique, one-of-a-kind items
        created by skilled artisans. Each product in our collection is lovingly handcrafted, reflecting
        the passion, dedication, and artistry of its maker. Experience the joy of owning something truly
        special, made with love and care.
      </p>
    </div>
  );
};

export default Description;
