import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className='flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center'
  >
    <p className='text-8xl font-bold text-neutral-800'>404</p>
    <div className='flex flex-col gap-2'>
      <h1 className='text-display-xs font-bold text-neutral-25'>Page Not Found</h1>
      <p className='text-text-md text-neutral-500'>
        The page you're looking for doesn't exist.
      </p>
    </div>
    <Link
      to='/'
      className='flex h-11 items-center rounded-full bg-brand px-6 text-sm font-semibold text-neutral-25 transition-colors hover:bg-brand-hover'
    >
      Back to Home
    </Link>
  </motion.div>
);

export default NotFoundPage;
