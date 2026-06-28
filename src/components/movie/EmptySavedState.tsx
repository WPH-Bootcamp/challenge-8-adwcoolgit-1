import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EmptySavedState = () => (
  <div className='flex flex-col items-center gap-6 py-20'>
    {/* Frame 53: illustration + text group, gap 16px */}
    <div className='flex w-61.5 flex-col items-center gap-4'>
      {/* Frame 55: 200×200 illustration */}
      <div className='relative flex h-50 w-50 items-center justify-center'>
        {/* Image Film */}
        <img
          src='/public/icons/film.svg'
          alt='film'
          className='w-38.25 h-42.5 text-neutral-900'
        />
      </div>

      {/* Frame 56: text group, gap 8px */}
      <div className='flex w-full flex-col gap-2 text-center'>
        <h3 className='text-base font-semibold leading-7.5 text-neutral-25'>
          Data Empty
        </h3>
        <p className='text-sm leading-7 text-neutral-400'>
          You don't have a favorite movie yet
        </p>
      </div>
    </div>

    {/* Button: 300px wide, 52px tall, brand bg */}
    <Button variant='primary' size='lg' asChild className='w-75'>
      <Link to='/'>Explore Movie</Link>
    </Button>
  </div>
);

export default EmptySavedState;
