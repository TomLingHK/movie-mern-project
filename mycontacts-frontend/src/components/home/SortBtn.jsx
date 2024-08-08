import React from 'react'

function SortBtn({ curSortedType }) {
  return (
    <div>
        <div className='inline-block'>Sort By: </div>
        <div className='inline-block w-32 text-center cursor-pointer border border-slate-700 rounded-md m-2 bg-zinc-300'>{curSortedType}</div>
    </div>
  )
}

export default SortBtn;