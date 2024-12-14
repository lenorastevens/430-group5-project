import { Metadata } from 'next';
import HHLogo from '@/app/ui/hh-logo';
import RegisterForm from '@/app/ui/register-form';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <main className="flex items-center bg-primary justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent1
         p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <HHLogo />
          </div>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}