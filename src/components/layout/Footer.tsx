import Logo from '@/components/layout/Logo';

export default function Footer() {
  return (
    <footer className='border-t border-neutral-800 bg-black'>
      {/* Desktop */}
      <div className='hidden h-30 items-center justify-between px-4 md:px-10 lg:px-page-x py-2 md:flex'>
        <Logo />
        <p className='flex-1 text-right text-base text-neutral-600'>
          Copyright &copy;2025 Movie Explorer
        </p>
      </div>

      {/* Mobile */}
      <div className='flex flex-col justify-center gap-3 py-8 px-4 md:hidden'>
        <Logo size='sm' />
        <p className='text-sm text-neutral-600'>
          Copyright &copy;2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
}
