import { Film, Search } from 'lucide-react';

const EmptySearchState = () => (
  <div className='flex flex-col items-center justify-center py-20 text-center'>
    <div className='relative mb-6 flex h-50 w-50 items-center justify-center'>
      <Film className='h-page-x w-page-x text-neutral-800' />
      <div className='absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-background'>
        <Search className='h-7 w-7 text-neutral-500' />
      </div>
    </div>
    <h3 className='text-[20px] font-semibold text-neutral-25'>
      Data Not Found
    </h3>
    <p className='mt-2 text-[14px] text-neutral-500'>Try other keywords</p>
  </div>
);

export default EmptySearchState;
