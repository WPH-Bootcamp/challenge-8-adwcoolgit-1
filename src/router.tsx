import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import SavedMoviesPage from '@/pages/SavedMoviesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movie/:id', element: <MovieDetailPage /> },
      { path: 'saved', element: <SavedMoviesPage /> },
    ],
  },
]);

export default router;
