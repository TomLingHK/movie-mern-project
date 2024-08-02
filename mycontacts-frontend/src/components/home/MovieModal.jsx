import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

function MovieModal({ movie, onClose }) {
    return (
        <div
            className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div className="bg-slate-300 m-4 rounded-xl">
                <img src={movie?.imgData} className="m-4 h-[300px] w-[200px]" alt="" />
            </div>
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
            >
                <AiOutlineClose
                    className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
                    onClick={onClose}
                />
                <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
                    {movie.name}
                </h2>
                <h4 className="mx-1 my-2 text-gray-500">{movie._id}</h4>
                <div className="mx-1 flex justify-start items-center gap-x-2">
                    <BiUserCircle className="text-red-300 text-2xl" />
                    <h2 className="my-1">{movie.director}</h2>
                </div>
                <div className="mx-1 flex justify-start items-center gap-x-2">
                    <PiBookOpenTextLight className="text-red-300 text-2xl" />
                    <h2 className="my-1">{movie.year}</h2>
                </div>
                <p className="mt-4">Details for this movie</p>
                <p className="my-2">
                    {movie?.description 
                    ?
                        movie.description
                    :
                        `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Praesentium numquam distinctio earum maiores consequatur?
                        Neque rem distinctio illum est labore natus, ad nesciunt
                        voluptate ducimus corporis cum aperiam quis ipsam, eligendi
                        ratione eaque obcaecati fugiat, autem odit totam at atque!`
                    }
                </p>
            </div>
        </div>
    );
}

export default MovieModal;
