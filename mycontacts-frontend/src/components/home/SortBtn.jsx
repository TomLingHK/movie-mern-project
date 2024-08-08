import { useState, useEffect } from 'react'

// constant
import sortType from "../../../constant/sortType";

import SortPopup from './SortPopup';

function SortBtn({ movies, setMovies, sortMoviesByType, curSortedType, setCurSortedType, isAscending, setIsAscending }) {
    const [isShowSortPopup, setIsShowSortPopup] = useState(false);

    const allowedSortType = sortType.sortTypeArr;

    function onSortClick($sortType) {
        const newMovieOrders = JSON.parse(JSON.stringify(movies));

        if (!movies || !$sortType || !allowedSortType.includes($sortType)) {
            console.error(`${$sortType} is not a valid sortType!`);
            return;
        }

        if (curSortedType != "" && curSortedType === $sortType) {
            newMovieOrders.reverse();
            setMovies(newMovieOrders);
            setIsAscending(!isAscending);
            return;
        }

        sortMoviesByType($sortType, newMovieOrders);
        setCurSortedType($sortType);
        setMovies(newMovieOrders);
        setIsAscending(true);
    }

    function getArrowStyle() {
        const _size = '10px',
              _direction = isAscending ? 'borderTop' : 'borderBottom';

        const _style = {
            borderLeft: _size + ' solid transparent',
            borderRight: _size + ' solid transparent',
        }

        _style[_direction] = _size + ' solid rgb(79 70 229)';
        return _style;
    }

    return (
        <div className='relative select-none'>
            <div className='inline-block'>Sort By: </div>
            <div 
                className='relative inline-block w-40 text-center cursor-pointer border border-slate-700 rounded-md m-2 bg-zinc-300'
                onClick={() => {setIsShowSortPopup(true)}}
            >
                {curSortedType}
                <div style={getArrowStyle()} className='absolute top-[7px] right-3 w-0 h-0'></div>
            </div>
            { isShowSortPopup && <SortPopup onSortClick={onSortClick} setIsShowSortPopup={setIsShowSortPopup} />}
        </div>
    )
}

export default SortBtn;