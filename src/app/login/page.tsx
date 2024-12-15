import { Metadata } from 'next';
import HHLogo from '@/app/ui/hh-logo';
import LoginForm from '@/app/ui/login-form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex bg-primary items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-40 w-full items-center justify-center rounded-lg bg-accent1
         p-3 md:h-44">
          <div className="w-24 text-white md:w-39">
            <HHLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}