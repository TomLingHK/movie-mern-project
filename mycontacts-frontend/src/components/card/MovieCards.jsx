import MovieSingleCard from "./MovieSingleCard";

function MovieCards({ movies, curSortedType, isAscending }) {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mx-2 overflow-auto h-[88%] w-full'>
        {movies.map((movie, index) => 
            <MovieSingleCard key={`${movies.length}_${curSortedType}_${isAscending}_${movie._id}`} movie={movie} index={index} movies={movies} />
        )}
    </div>
  )
}

export default MovieCards;