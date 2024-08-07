import { useState, useEffect } from 'react';

function FilterBtn({ type, curFilterArr, setCurFilterArr}) {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        curFilterArr.includes(type) ? setIsActive(true) : setIsActive(false);
    }, [curFilterArr])

    function onFilterClick() {
        const newCurFilterArr = [...curFilterArr];
        const curFilterIsAll = newCurFilterArr.length === 1 && type === 'All';

        if (!!curFilterArr.includes(type)) {
            if (curFilterIsAll) return;

            const index = newCurFilterArr.indexOf(type);
            newCurFilterArr.splice(index, 1);

            if (newCurFilterArr.length === 0)
                newCurFilterArr.push('All');
        }
        else {
            newCurFilterArr.push(type);
            newCurFilterArr.sort();

            if (!!curFilterArr.includes('All')) {
                const index = newCurFilterArr.indexOf('All');
                newCurFilterArr.splice(index, 1);
            }
        }

        setCurFilterArr(newCurFilterArr);
    }
    
    return (
        <div 
            onClick={onFilterClick}
            className={`px-4 py-1 rounded-lg text-white cursor-pointer hover:bg-indigo-800 ${isActive ? 'bg-indigo-800' : 'bg-indigo-500'} `}
        >
            {type}
        </div>
    )
}

export default FilterBtn;