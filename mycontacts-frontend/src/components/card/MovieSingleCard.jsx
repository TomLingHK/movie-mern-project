import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';

import MovieModal from '../home/MovieModal';


function MovieSingleCard({ movie, index, movies }) {
    const [showModal, setShowModal] = useState(false);
    const [hover, setHover] = useState(false);
    const [startFadeIn, setStartFadeIn] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const startFadeInDelay = index * 80;
    const startFadeInDuration = 400;

    useEffect(() => {
        setTimeout(() => {
            setIsShown(false);
            setStartFadeIn(true);
        }, startFadeInDelay);

        setTimeout(() => {
            setStartFadeIn(false);
            setIsShown(true);
        }, startFadeInDelay + startFadeInDuration);
    }, [index, movies.length])

    function getBgStyle() {
        const backGroundStyle = hover ? 
            `linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,.3)), url(${movie.imgData})` : 
            `linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.8)), url(${movie.imgData})`;
        
        return {
            backgroundImage: backGroundStyle, 
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top'
        };
    }

    return (    
        <>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={getBgStyle()}
                className={`
                    h-[32.3%] w-[49%]
                    lg:h-[32.3%] lg:w-[32.3%]
                    xl:h-[49%] xl:w-[19%]
                    border-2 border-gray-500 rounded-lg py-2 relative hover:shadow-xl cursor-pointer hover:scale-[1.03] ease-in-out duration-500 ${startFadeIn ? 'startFadeIn' : ''} ${isShown ? 'opacity-1' : 'opacity-0'}
                `}
            >
                <h2 className="m-2 top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
                    {movie.name}
                </h2>
                <div className="mx-1 flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{movie.director}</h2>
                </div>
                <div className="mx-1 flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{movie.year}</h2>
                </div>
                <div className="flex justify-between items-center gap-x-2 mt-4 p-4 absolute bottom-0 w-full">
                    <BiShow
                        className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                        onClick={() => {setShowModal(true); setHover(false);}}
                    />
                    <Link to={`/movies/details/${movie._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/movies/edit/${movie._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/movies/delete/${movie._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                </div>
            </div>
            {
                showModal && (
                    <MovieModal movie={movie} onClose={() => setShowModal(false)}/>
                )
            }
        </>
    )
}

export default MovieSingleCard;