import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className='relative mx-auto flex min-h-screen w-full max-w-360 flex-col bg-background'>
      <ScrollRestoration />
      <Navbar />
      <main className='flex-1'>
        <AnimatePresence mode='wait'>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
