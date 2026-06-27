import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/movie/SearchBar';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';

  const handleSearch = (query: string) => {
    if (query) {
      setSearchParams({ q: query }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  return (
    <div className="min-h-screen pt-navbar-h md:pt-navbar-h">
      {/* Mobile search section — desktop uses the Navbar search */}
      <section className="px-mobile-x py-4 md:hidden">
        <SearchBar
          key={searchQuery}
          onSearch={handleSearch}
          initialQuery={searchQuery}
        />
      </section>
    </div>
  );
};

export default HomePage;
