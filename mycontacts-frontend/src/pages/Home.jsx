import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

import genre from "../../constant/genre";
import Spinner from "../components/Spinner";
import MoviesTable from "../components/home/MoviesTable";
import MovieCards from "../components/home/MovieCards";
import FilterBtn from "../components/home/FilterBtn";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const [curFilterArr, setCurFilterArr] = useState(['All']);
    const filterCacheRef = useRef({
        'All': [],
    })

    const filterArr = ['All', ...genre.genreArr];

// Example data
// {
//     "_id": "66aafd904419b38c97fa4ae2",
//     "name": "Harry Potter and the Philosopher's Stone",
//     "director": "Chris Columbus",
//     "year": "2001",
//     "createdAt": "2024-08-01T03:14:24.844Z",
//     "updatedAt": "2024-08-06T03:31:56.789Z",
//     "__v": 0,
//     "description": "An orphaned boy enrolls in a school of wizardry, ....",
//     "imgData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//....",
//     "genre": [
//         "Adventure",
//         "Fantasy"
//     ]
// }
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5001/api/movies")
            .then((response) => {
                setMovies(response.data);
                filterCacheRef.current = { 'All': response.data };
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const type = curFilterArr.join('');
        const hasCachedData = Object.keys(filterCacheRef.current).includes(type);
        const newMoviesArr = [];
        const allMoviesArr = filterCacheRef.current['All'];

        if (!!hasCachedData) {
            setMovies(filterCacheRef.current[curFilterArr]);
            return;
        }

        for (let movie of allMoviesArr) {
            let isAdd = true;
            while (isAdd) {
                for (let filter of curFilterArr) {
                    if (!movie.genre.includes(filter)) {
                        isAdd = false;
                        break;
                    }
                }
                break;
            }
            if (!!isAdd) newMoviesArr.push(movie);
        }

        setMovies(newMoviesArr);
        // Prevent over caching
        if (curFilterArr.length > 1) return;
        filterCacheRef.current[curFilterArr] = newMoviesArr;
// console.warn('Set cache', filterCacheRef.current);
    }, [curFilterArr])
    

    return (
        <div className="p-4 h-screen w-screen">
            <div className="flex justify-center items-center gap-x-4">
                <button
                    className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    onClick={() => setShowType("table")}
                >
                    Table
                </button>
                <button
                    className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
                    onClick={() => setShowType("card")}
                >
                    Card
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl my-6">Movies List</h1>
                { filterArr.map( type => 
                    <FilterBtn key={type} type={type} curFilterArr={curFilterArr} setCurFilterArr={setCurFilterArr} filterCacheRef={filterCacheRef} /> 
                )}
                <Link to="/movies">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === "table" ? (
                <MoviesTable movies={movies} setMovies={setMovies}/>
            ) : (
                <MovieCards movies={movies} />
            )}
        </div>
    );
}

export default Home;
