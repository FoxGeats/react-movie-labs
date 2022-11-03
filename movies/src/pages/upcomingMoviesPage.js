import React from "react";
import { getMovieUpcoming } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlayListIcon from '../components/cardIcons/addToPalylist'

const UpcomingMoviesPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getMovieUpcoming)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToPalylist = (movieId) => true 

  return (
    <PageTemplate
    title="Upcoming Movies"
    movies={movies}
    action={(movie) => {
      return <AddToPlayListIcon movie={movie} />
    }}
  />
  );
};
export default UpcomingMoviesPage;
