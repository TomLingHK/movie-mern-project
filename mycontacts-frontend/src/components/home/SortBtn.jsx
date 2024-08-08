import { useState } from 'react'

// constant
import sortType from "../../../constant/sortType";

import SortPopup from './SortPopup';

function SortBtn({ movies, setMovies }) {
    const [isShowSortPopup, setIsShowSortPopup] = useState(false);
    const [curSortedType, setCurSortedType] = useState("Name");

    const allowedSortType = sortType.sortTypeArr;

    function onSortClick($sortType) {
        const newMovieOrders = JSON.parse(JSON.stringify(movies)),
              _sortTypeKey = $sortType.toLowerCase();

        if (!movies || !$sortType || !allowedSortType.includes($sortType)) {
            console.error(`${$sortType} is not a valid sortType!`);
            return;
        }

        if (curSortedType != "" && curSortedType === $sortType) {
            newMovieOrders.reverse();
            setMovies(newMovieOrders);
            return;
        }

        sortMoviesByType();
        setMovies(newMovieOrders);
        setCurSortedType($sortType);

        function sortMoviesByType() {
            if (_sortTypeKey === 'year'){
                newMovieOrders.sort(function(a, b) { return a[_sortTypeKey] - b[_sortTypeKey] });
                return;
            }

            newMovieOrders.sort(function(a, b) {
                let x = a[_sortTypeKey].toLowerCase();
                let y = b[_sortTypeKey].toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
        }
    }

    return (
        <div className='relative'>
            <div className='inline-block'>Sort By: </div>
            <div 
                className='inline-block w-40 text-center cursor-pointer border border-slate-700 rounded-md m-2 bg-zinc-300'
                onClick={() => {setIsShowSortPopup(true)}}
            >
                {curSortedType}
            </div>
            { isShowSortPopup && <SortPopup onSortClick={onSortClick} setIsShowSortPopup={setIsShowSortPopup} />}
        </div>
    )
}

export default SortBtn;