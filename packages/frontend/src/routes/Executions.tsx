import { useState } from 'react';

import { ExecutionList } from '../components/ExecutionList';
import { FilterBar } from '../components/FilterBar';
import { PaginationBar } from '../components/PaginationBar';
import { SortBar } from '../components/SortBar';

export function Executions() {
    // Filter
    const [filterPhrase, setFilterPhrase] = useState('');
    const [filterType, setFilterType] = useState('url');

    // Sort
    const [sortType, setSortType] = useState('url');
    const [sortDirection, setSortDirection] = useState('asc');

    // Get executions
    const executions = ExecutionList({ sort: `${sortType}:${sortDirection}`, filter: { [filterType]: filterPhrase } });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, _] = useState(10);
    const lastRecordIndex = currentPage * recordsPerPage;
    const firstRecordIndex = lastRecordIndex - recordsPerPage;

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
                    <SortBar sortType={sortType} setSortType={setSortType} sortDirection={sortDirection} setSortDirection={setSortDirection}/>
                </div>
                <div className='col-span-2 justify-self-stretch'>
                    { executions === null ? 'Loading...' : executions.slice(firstRecordIndex, lastRecordIndex)}
                </div>
                <div className='col-span-2 justify-self-stretch static'>
                    { executions === null ? '' : <PaginationBar recordsPerPage={recordsPerPage} totalRecords={executions.length} currentPage={currentPage} switchPage={(n: number) => setCurrentPage(n)} /> }
                </div>
            </div>
        </>
    );
}
