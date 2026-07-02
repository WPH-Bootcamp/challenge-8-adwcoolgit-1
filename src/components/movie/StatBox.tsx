interface StatBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  size?: 'sm' | 'md';
}

const StatBox = ({ icon, label, value, size = 'md' }: StatBoxProps) => {
  const sm = size === 'sm';
  return (
    <div className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-black ${sm ? 'p-3' : 'p-5'}`}>
      {icon}
      <div className='flex flex-col gap-0.5 text-center'>
        <span className={sm ? 'text-xs leading-7.5 text-neutral-300' : 'text-text-md text-neutral-300'}>
          {label}
        </span>
        <span className={`line-clamp-1 font-semibold text-neutral-25 ${sm ? 'text-sm leading-8.5' : 'text-text-xl'}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default StatBox;
