import { Link } from 'react-router-dom';

import { ExecutionList } from '../components/ExecutionList';
import { WebsiteRecordList } from '../components/WebsiteRecordList';

export function Home() {
    return (
        <>
            <div>
                <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                    Website records
                </h1>

                <div className='w-full flex flex-col'>
                    <WebsiteRecordList sort={'url:dsc'} limit={5}/>
                </div>

                <div className='w-full text-center text-xs text-blue-600 underline py-2'>
                    <Link to='/website-records'>View all website records</Link>
                </div>
            </div>

            <div>
                <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                    Executions
                </h1>

                <div className='w-full flex flex-col'>
                    <ExecutionList sort="url:asc" limit={5}/>
                </div>

                <div className='w-full text-center text-xs text-blue-600 underline py-2'>
                    <Link to='/executions'>View all executions</Link>
                </div>
            </div>
        </>
    );
}
