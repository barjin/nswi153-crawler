import { WebsiteRecordData } from '../components/WebsiteRecordData'
import { PaginationBar } from "../components/PaginationBar"
import { ExecutionList } from "../components/ExecutionList"
import { useState } from "react";
import { useParams } from 'react-router-dom';


export function WebsiteRecordView() {

    const { recordId } = useParams()

    // Get executions
    const record = WebsiteRecordData()
    const executions = typeof record === null ? [] : ExecutionList({ sort: 'lastCrawl:dsc', id: Number(recordId) })

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, _] = useState(5);
    const lastRecordIndex = currentPage * recordsPerPage;
    const firstRecordIndex = lastRecordIndex - recordsPerPage;

    return (
        <>
            <div>
                <div>
                    { record === null ? 'Loading...' : record }
                </div>

                { record === null ? '' : 
                    <>
                        <div className='border-4 border-blue-800 rounded-lg mt-10 px-2 py-4'>
                            <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                                Executions
                            </h1>       

                            { executions === null ? 'Loading...' : 
                                <>
                                    { executions === null ? 'Loading...' : executions.slice(firstRecordIndex, lastRecordIndex)}

                                    <div className='col-span-2 justify-self-stretch static'>
                                        <PaginationBar recordsPerPage={recordsPerPage} totalRecords={executions.length} currentPage={currentPage} switchPage={(n: number) => setCurrentPage(n)} />
                                    </div>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}