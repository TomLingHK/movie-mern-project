import MovieSingleCard from "./MovieSingleCard";

function MovieCards({ movies, curSortedType, isAscending }) {
  return (
    <div className='flex flex-row flex-wrap mx-2 overflow-auto h-[92%] xl:h-[86%] w-full pt-[1%] gap-[1.05%]'>
        {movies.map((movie, index) => 
            <MovieSingleCard key={`${movies.length}_${curSortedType}_${isAscending}_${movie._id}`} movie={movie} index={index} movies={movies} />
        )}
    </div>
  )
}

export default MovieCards;