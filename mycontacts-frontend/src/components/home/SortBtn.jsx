import { useState } from 'react'
import SortPopup from './SortPopup';

function SortBtn({ curSortedType, onSortClick }) {
    const [isShowSortPopup, setIsShowSortPopup] = useState(false);

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