import MovieSingleCard from "./MovieSingleCard";

function MovieCards({ movies }) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {movies.map((movie, index) => 
            <MovieSingleCard key={`${movies.length}_${movie._id}`} movie={movie} index={index} movies={movies} />
        )}
    </div>
  )
}

export default MovieCards;