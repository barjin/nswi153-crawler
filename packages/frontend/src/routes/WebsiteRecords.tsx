import { useState, useEffect } from 'react';

import { CreateRecordPopup } from '../components/CreateRecordPopup';
import { FilterBar } from '../components/FilterBar';
import { PaginationBar } from '../components/PaginationBar';
import { SortBar } from '../components/SortBar';
import { WebsiteRecordList } from '../components/WebsiteRecordList';
import { useClient } from '../utils/ApiContext';

export function WebsiteRecords() {
    // Create New Record Window
    const [showCreateWindow, setCreateWindow] = useState(false);
    const createNewRecord = (formData: FormData) => {
        const api = useClient();

        useEffect(() => {
            api?.POST('/records', {
                body: {
                    id: 0,
                    url: formData.get('url') as string,
                    boundaryRegEx: formData.get('regex') as string,
                    periodicity: 0,
                    label: formData.get('label') as string,
                    isActive: formData.has('active'),
                    tags: (formData.get('tags') as string).split(',').map((tag) => tag.trim()),
                    lastExecutionTime: undefined,
                    lastExecutionStatus: undefined,
                },
            },
            );
        }, [api]);
    };

    // Filter
    const [filterPhrase, setFilterPhrase] = useState('');
    const [filterType, setFilterType] = useState('url');

    // Sort
    const [sortType, setSortType] = useState('url');
    const [sortDirection, setSortDirection] = useState('asc');

    // Get records
    const recordList = WebsiteRecordList({ sort: `${sortType}:${sortDirection}`, filter: { [filterType]: filterPhrase } });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, _] = useState(10);
    const lastRecordIndex = currentPage * recordsPerPage;
    const firstRecordIndex = lastRecordIndex - recordsPerPage;

    return (
        <>
            <div className="h-full grid grid-cols-2 grid-rows-[auto_auto_1fr_auto] gap-4">
                <div className='col-span-1 justify-self-stretch'>
                    <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                        Website records
                    </h1>
                </div>
                <div className='col-span-1 justify-self-end'>
                    <button className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl' onClick={() => setCreateWindow(true)}>
                        Create New Record
                    </button>
                </div>
                <div className='col-span-1 justify-self-stretch'>
                    <FilterBar setFilterPhrase={setFilterPhrase} setFilterType={setFilterType} optionTag={true} />
                </div>
                <div className='col-span-1 justify-self-end'>
                    <SortBar sortType={sortType} setSortType={setSortType} sortDirection={sortDirection} setSortDirection={setSortDirection}/>
                </div>
                <div className='col-span-2 justify-self-stretch'>
                    { recordList === null ? 'Loading...' : recordList.slice(firstRecordIndex, lastRecordIndex)}
                </div>
                <div className='col-span-2 justify-self-stretch static'>
                    { recordList === null ? '' : <PaginationBar recordsPerPage={recordsPerPage} totalRecords={recordList.length} currentPage={currentPage} switchPage={(n: number) => setCurrentPage(n)} /> }
                </div>
            </div>

            <CreateRecordPopup showPopup={showCreateWindow} closePopup={() => setCreateWindow(false)} createNewRecord={(data: FormData) => createNewRecord(data)} />
        </>
    );
}
