import { Link } from 'react-router-dom';

import { ExecutionList } from '../components/ExecutionsList';
import { WebsiteRecordList } from '../components/WebsiteRecordList';

export function Home() {
    return (
        <>
            <ExecutionList limit={5}/>
            <div className='w-full text-center text-xs text-blue-600 underline py-2'>
                <Link to='/executions'>View all executions</Link>
            </div>
            <WebsiteRecordList limit={5}/>
            <div className='w-full text-center text-xs text-blue-600 underline py-2'>
                <Link to='/website-records'>View all website records</Link>
            </div>
        </>
    );
}
