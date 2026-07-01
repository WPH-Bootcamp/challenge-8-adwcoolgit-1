import { Tv } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='border-t border-neutral-800 bg-black'>
      {/* Desktop */}
      <div className='hidden h-30 items-center justify-between px-4 md:px-10 lg:px-page-x py-2 md:flex'>
        <div className='flex items-center gap-[7.111px]'>
          <Tv className='h-10 w-10 text-brand' />
          <span
            className='text-neutral-25 font-semibold'
            style={{ fontSize: '28.444px', letterSpacing: '-1.1378px' }}
          >
            Movie
          </span>
        </div>
        <p className='flex-1 text-right text-base text-neutral-600'>
          Copyright &copy;2025 Movie Explorer
        </p>
      </div>

      {/* Mobile */}
      <div className='flex h-30 items-center justify-between px-4 md:hidden'>
        <div className='flex items-center gap-1.5'>
          <Tv className='h-7 w-7 text-brand' />
          <span className='text-neutral-25 text-lg font-semibold tracking-[-0.5px]'>
            Movie
          </span>
        </div>
        <p className='text-sm text-neutral-600'>
          Copyright &copy;2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
}
