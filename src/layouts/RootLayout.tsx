import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const RootLayout = () => {
  const location = useLocation();
  return (
    <div className='relative mx-auto flex min-h-screen w-full max-w-360 flex-col bg-background'>
      <ScrollRestoration />
      <Navbar />
      <main className='flex-1'>
        <ErrorBoundary key={location.pathname}>
          <AnimatePresence mode='wait'>
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
