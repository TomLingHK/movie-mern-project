import React, { useEffect, useState } from "react";
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

    const filterArr = ['All', ...genre.genreArr];

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5001/api/movies")
            .then((response) => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
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
                    <FilterBtn key={type} type={type} curFilterArr={curFilterArr} setCurFilterArr={setCurFilterArr} /> 
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
