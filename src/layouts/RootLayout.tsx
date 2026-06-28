import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const RootLayout = () => (
  <div className='relative mx-auto flex min-h-screen w-full max-w-360 flex-col bg-background'>
    <Navbar />
    <main className='flex-1'>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default RootLayout;
