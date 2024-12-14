import HHLogo from '@/app/ui/hh-logo';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { epilogue } from './ui/fonts';

export default function Page () {
  return (
    <main className="flex min-h-screen bg-primary flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-accent1 px-6 py-10 md:w-2/5 md:px-20">
          <div className="flex justify-center">
          <HHLogo />
          </div>
          <p className={`${epilogue.className} text-xl text-secondary md:text-3xl md:leading-normal`}>
            <strong>Welcome to Handcrafted Haven.</strong> This is a a digital platform for artisans to showcase their creativity and connect with a broader audience.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-primary px-6 py-3 text-sm font-medium text-secondary transition-colors hover:bg-accent2 md:text-base"
          >
            <span>Log in</span> 
            
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero.jpg"
            width={763}
            height={763}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          {/* <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          /> */}
        </div>
      </div>
    </main>
  );


}