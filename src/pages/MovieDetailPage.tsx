import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
  const { id } = useParams();
  return <div data-id={id} />;
};

export default MovieDetailPage;
