interface LogoProps {
  size?: 'sm' | 'md';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const isSm = size === 'sm';
  return (
    <div
      className={`flex items-center ${isSm ? 'gap-1.5' : 'gap-[7.111px] px-3.25 py-2.5'}`}
    >
      <img
        src='/icons/logo.svg'
        alt=''
        className={isSm ? 'size-7 object-contain' : 'size-fit object-contain'}
      />
      <span
        className='text-neutral-25 font-semibold'
        style={
          isSm
            ? { fontSize: '18px', letterSpacing: '-0.5px' }
            : { fontSize: '28.444px', letterSpacing: '-1.1378px' }
        }
      >
        Movie
      </span>
    </div>
  );
}
