import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

import genre from "../../constant/genre";
import Spinner from "../components/Spinner";
import MoviesTable from "../components/home/MoviesTable";
import MovieCards from "../components/card/MovieCards";
import FilterBtn from "../components/home/FilterBtn";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const [curFilterArr, setCurFilterArr] = useState(['All']);
    const [curSortedType, setCurSortedType] = useState("");
    const filterCacheRef = useRef({
        'All': [],
    })

    const filterArr = ['All', ...genre.genreArr];

    function onSortClick($sortType) {
        const allowedSortType = ["name", "director", "year"],
              newMovieOrders = JSON.parse(JSON.stringify(movies));

        if (!movies || !$sortType || !allowedSortType.includes($sortType)) return;

        if (curSortedType != "" && curSortedType === $sortType) {
            newMovieOrders.reverse();
            setMovies(newMovieOrders);
            return;
        }

        sortMoviesByType();
        setMovies(newMovieOrders);
        setCurSortedType($sortType);

        function sortMoviesByType() {
            if ($sortType === 'year'){
                newMovieOrders.sort(function(a, b) { return a[$sortType] - b[$sortType] });
                return;
            }

            newMovieOrders.sort(function(a, b) {
                let x = a[$sortType].toLowerCase();
                let y = b[$sortType].toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
        }
    }

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
        <div className="p-4 h-screen w-screen bg-grey overflow-hidden">
            <div className="relative w-inherit">
                <div className="relative flex justify-center w-inherit">
                    <button
                        className="bg-sky-300 hover:bg-sky-600 mx-2 px-4 py-1 rounded-lg"
                        onClick={() => setShowType("table")}
                    >
                        Table
                    </button>
                    <button
                        className="bg-sky-300 hover:bg-sky-600 mx-2 px-4 py-1 rounded-lg"
                        onClick={() => setShowType("card")}
                    >
                        Card
                    </button>
                </div>
                <Link to="/movies" className="absolute top-0 right-0">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl mx-3 my-3">Movies List</h1>
            </div>
            <div className="flex justify-start items-center my-1 mx-2 gap-5">
                { filterArr.map( type => 
                    <FilterBtn key={type} type={type} curFilterArr={curFilterArr} setCurFilterArr={setCurFilterArr} filterCacheRef={filterCacheRef} /> 
                )}
            </div>
            {loading ? (
                <Spinner />
            ) : showType === "table" ? (
                <MoviesTable movies={movies} onSortClick={onSortClick}/>
            ) : (
                <MovieCards movies={movies} />
            )}
        </div>
    );
}

export default Home;
