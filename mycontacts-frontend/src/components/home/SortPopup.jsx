import sortType from "../../../constant/sortType";

function SortPopup({ onSortClick, setIsShowSortPopup }) {
    const sortTypeArr = sortType.sortTypeArr;

    return (
        <div className="absolute top-0 right-0 w-40 text-center m-2">
            {sortTypeArr.map(type => 
                <div 
                    key={type}
                    className="bg-zinc-300 border border-slate-700 rounded-md cursor-pointer"
                    onClick={() => {onSortClick(type); setIsShowSortPopup(false); }}
                >
                    {type}
                </div> 
            )}
        </div>
    )
}

export default SortPopup;