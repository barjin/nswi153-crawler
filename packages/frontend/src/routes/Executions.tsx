import { useState } from 'react';

import { ExecutionList } from '../components/ExecutionList';
import { FilterBar } from '../components/FilterBar';
import { SortBar } from '../components/SortBar';

export function Executions() {
    const setFilterPhrase = useState('')[1];
    const setFilterType = useState('url')[1];

    return (
        <>
            <div className="h-full grid grid-cols-2 grid-rows-[auto_auto_1fr_auto] gap-4">
                <div className='col-span-2 justify-self-stretch'>
                    <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                        Executions
                    </h1>
                </div>
                <div className='col-span-1 justify-self-stretch'>
                    <FilterBar setFilterPhrase={setFilterPhrase} setFilterType={setFilterType} optionTag={true} />
                </div>
                <div className='col-span-1 justify-self-end'>
                    <SortBar />
                </div>
                <div className='col-span-2 justify-self-stretch'>
                    <ExecutionList sort='url:asc' />

                </div>
            </div>
        </>
    );
}
