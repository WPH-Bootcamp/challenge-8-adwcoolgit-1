import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tv, Search, X, Menu } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-[7.111px]">
    <Tv className="h-10 w-10 text-brand" />
    <span
      className="text-neutral-25 font-semibold"
      style={{ fontSize: '28.444px', letterSpacing: '-1.1378px' }}
    >
      Movie
    </span>
  </div>
);

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-base px-2 py-1 transition-colors ${
    isActive ? 'text-neutral-25 font-semibold' : 'text-neutral-500 hover:text-neutral-25'
  }`;

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    navigate('/');
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 h-[90px] px-[140px] hidden md:flex items-center justify-between">
        <div className="flex items-end gap-[80px]">
          <NavLink to="/" aria-label="Home">
            <Logo />
          </NavLink>
          <nav className="flex gap-[48px]">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/saved" className={navLinkClass}>
              Saved
            </NavLink>
          </nav>
        </div>

        {/* Desktop Search */}
        <form onSubmit={handleSearch}>
          <div
            className="flex h-[56px] w-[243px] items-center gap-3 rounded-[16px] border border-neutral-800 px-4 py-2"
            style={{ backdropFilter: 'blur(20px)', background: 'rgba(10,13,18,0.6)' }}
          >
            <Search className="h-6 w-6 shrink-0 text-neutral-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Movie"
              className="flex-1 bg-transparent text-sm text-neutral-25 placeholder:text-neutral-500 outline-none"
            />
            {query && (
              <button type="button" onClick={clearSearch} aria-label="Clear search">
                <X className="h-4 w-4 text-neutral-500 hover:text-neutral-25" />
              </button>
            )}
          </div>
        </form>
      </header>

      {/* Mobile Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 px-4 flex md:hidden items-center justify-between bg-[rgba(10,13,18,0.9)] backdrop-blur-[20px] border-b border-neutral-800">
        <NavLink to="/" aria-label="Home">
          <div className="flex items-center gap-1.5">
            <Tv className="h-7 w-7 text-brand" />
            <span className="text-neutral-25 text-lg font-semibold tracking-[-0.5px]">Movie</span>
          </div>
        </NavLink>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/?search=1')}
            aria-label="Search"
            className="text-neutral-500 hover:text-neutral-25"
          >
            <Search className="h-6 w-6" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="text-neutral-500 hover:text-neutral-25"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black px-4 pt-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              <Logo />
            </NavLink>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-neutral-500 hover:text-neutral-25"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-8 text-2xl font-semibold">
            <NavLink
              to="/"
              end
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-neutral-25' : 'text-neutral-500 hover:text-neutral-25'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/saved"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-neutral-25' : 'text-neutral-500 hover:text-neutral-25'
              }
            >
              Saved
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
}
