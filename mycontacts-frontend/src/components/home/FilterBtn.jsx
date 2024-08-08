import { useState, useEffect } from 'react';

function FilterBtn({ type, curFilterArr, setCurFilterArr }) {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        curFilterArr.includes(type) ? setIsActive(true) : setIsActive(false);
    }, [curFilterArr])

    function onFilterClick() {
        let newCurFilterArr = [...curFilterArr];
        const curFilterIsAll = newCurFilterArr.length === 1 && type === 'All';
        
        /*
            Case 1: All => Click a => ['a']

            Case 2: a => Click All => ['All']

            Case 3(add): a => Click b => [a, b]
            
            Case 4(remove): a, b => Click b => [a]

            Case 5(remove): a => Click a => ['All']
        */

        if (type === 'All') {
            newCurFilterArr = ['All'];
            setCurFilterArr(newCurFilterArr);
            return;
        }

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
            className={`px-4 py-1 rounded-lg text-white cursor-pointer select-none ${isActive ? 'bg-indigo-500' : 'bg-indigo-800'} hover:bg-indigo-500 hover:scale-105 ease-in-out`}
        >
            {type}
        </div>
    )
}

export default FilterBtn;