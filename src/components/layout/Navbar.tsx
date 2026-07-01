import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, Menu, ArrowLeft } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import SearchInput from '@/components/ui/SearchInput';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-md px-2 py-1 transition-colors text-neutral-25 ${isActive ? 'font-semibold' : 'opacity-70 hover:opacity-100'}`;

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchMode = searchParams.has('focus') || !!searchParams.get('q');
  const [mobileSearchQuery, setMobileSearchQuery] = useState(() => searchParams.get('q') ?? '');

  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/?q=${encodeURIComponent(query.trim())}`);
  };

  const clearDesktopSearch = () => {
    setQuery('');
    navigate('/');
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
    }
  };

  const clearMobileSearch = () => {
    setMobileSearchQuery('');
    navigate('/');
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header className='fixed inset-x-0 top-0 z-50 hidden h-navbar-h md:flex items-center justify-center bg-transparent backdrop-blur-lg'>
        <div className='flex w-full max-w-360 items-center justify-between px-4 md:px-10 lg:px-page-x'>
          <div className='flex items-end gap-20'>
            <NavLink to='/' aria-label='Home'>
              <Logo />
            </NavLink>
            <nav className='flex gap-12 items-center my-auto'>
              <NavLink to='/' end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to='/favourite' className={navLinkClass}>
                Favourites
              </NavLink>
            </nav>
          </div>

          <form onSubmit={handleDesktopSearch}>
            <SearchInput
              value={query}
              onChange={setQuery}
              onClear={clearDesktopSearch}
              className='h-14 w-60.75'
            />
          </form>
        </div>
      </header>

      {/* Mobile Navbar — normal */}
      {!searchMode && (
        <header className='fixed inset-x-0 top-0 z-50 flex h-16 md:hidden items-center justify-center bg-transparent backdrop-blur-lg'>
          <div className='flex w-full max-w-360 items-center justify-between px-4'>
            <NavLink to='/' aria-label='Home'>
              <Logo size='sm' />
            </NavLink>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => navigate('/?focus=1')}
                aria-label='Search'
                className='text-neutral-500 hover:text-neutral-25'
              >
                <Search className='h-6 w-6' />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label='Open menu'
                className='text-neutral-500 hover:text-neutral-25'
              >
                <Menu className='h-6 w-6' />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Navbar — search mode */}
      {searchMode && (
        <header className='fixed inset-x-0 top-0 z-50 flex h-16 md:hidden items-center gap-3 px-4 bg-black backdrop-blur-lg'>
          <button
            onClick={() => navigate('/')}
            aria-label='Back'
            className='shrink-0 text-neutral-25 hover:text-neutral-400 transition-colors'
          >
            <ArrowLeft className='h-6 w-6' />
          </button>
          <form onSubmit={handleMobileSearch} className='flex-1'>
            <SearchInput
              value={mobileSearchQuery}
              onChange={setMobileSearchQuery}
              onClear={clearMobileSearch}
              autoFocus
              className='h-11'
            />
          </form>
        </header>
      )}

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className='fixed inset-0 z-100 flex flex-col bg-black px-4 pt-4'>
          <div className='flex items-center justify-between'>
            <NavLink to='/' onClick={() => setMobileOpen(false)}>
              <Logo />
            </NavLink>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label='Close menu'
              className='text-neutral-500 hover:text-neutral-25'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
          <nav className='mt-12 flex flex-col gap-8 text-neutral-25 text-md font-normal'>
            <NavLink
              to='/'
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => (isActive ? 'font-semibold' : 'hover:text-neutral-25')}
            >
              Home
            </NavLink>
            <NavLink
              to='/favourite'
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-neutral-25' : 'text-neutral-100 hover:text-neutral-25'
              }
            >
              Favourite
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
}
