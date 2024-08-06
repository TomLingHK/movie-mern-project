import MovieSingleCard from "./MovieSingleCard";

function MovieCards({ movies }) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {movies.map((movie) => 
            <MovieSingleCard key={movie._id} movie={movie}/>
        )}
    </div>
  )
}

export default MovieCards;