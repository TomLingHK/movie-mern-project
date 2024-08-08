import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

function MoviesTable({ movies, onSortClick }) {
    return (
        <div className='overflow-auto h-[86%] w-full'>
            <table className='w-full border-separate border-spacing-2'>
                <thead className='sticky top-[8px] bg-white shadow-2xl' style={{boxShadow: `0 0 8px 8px #fff`}}>
                    <tr className='bg-white'>
                        <th className='w-[5%] border border-slate-600 rounded-md'>No</th>
                        <th className='w-[40%] border border-slate-600 rounded-md cursor-pointer' onClick={ () => onSortClick('Name') }>Name</th>
                        <th className='w-[10%] border border-slate-600 rounded-md cursor-pointer' onClick={ () => onSortClick('Director') }>Director</th>
                        <th className='w-[10%] border border-slate-600 rounded-md cursor-pointer' onClick={ () => onSortClick('Year') }>Year</th>
                        <th className='w-[20%] border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => 
                        <tr key={movie._id} className='h-8 even:bg-white odd:bg-zinc-200'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {movie.name}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {movie.director}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {movie.year}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/movies/details/${movie._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800'/>
                                    </Link>
                                    <Link to={`/movies/edit/${movie._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                                    </Link>
                                    <Link to={`/movies/delete/${movie._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-600'/>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default MoviesTable;