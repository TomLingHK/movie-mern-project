import { useState, useEffect } from 'react';

function GenreCheckbox({GenreType, selectedGenre, setSelectedGenre}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        selectedGenre.includes(GenreType) ? setChecked(true) : setChecked(false);
    }, [selectedGenre]);
    

    function updateChangeStatus() {
        if (!!checked && selectedGenre.includes(GenreType)) {
            const newGenreArr = [...selectedGenre];
            const index = newGenreArr.indexOf(GenreType);

            newGenreArr.splice(index, 1);
            setSelectedGenre(newGenreArr);
        }
        else if (!checked && !selectedGenre.includes(GenreType)) {
            const newGenreArr = [...selectedGenre, GenreType];
            newGenreArr.sort();

            setSelectedGenre(newGenreArr);
        }
    }

    return (
        <div className='relative m-[1.1%] w-32 h-32 max-md:h-36 max-md:w-36 aspect-square bg-teal-500 rounded-xl hover:bg-teal-300 cursor-pointer'>
            <input 
                id={GenreType} 
                type="checkbox" 
                checked={checked}
                onChange={updateChangeStatus}
                name={GenreType} 
                className='section-box relative h-full w-full appearance-none rounded-xl cursor-pointer checked:bg-gradient-to-r checked:from-teal-300 checked:to-blue-500 border-2 border-solid border-teal-300 checked:border-0'
            />
            <label className='absolute bottom-2 left-[50%] -translate-x-1/2 text-white flex justify-center content-center flex-col cursor-pointer' htmlFor={GenreType}>
                <img className='my-[4%] select-none' src={`/img/${GenreType}_${checked ? 'active' : 'normal'}.png`} alt="GenreType" />
                <div className='text-center select-none'>{GenreType}</div>
            </label>
        </div>
    )
}
export default GenreCheckbox;