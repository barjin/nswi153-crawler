import { useParams } from 'react-router-dom';

import { ExecutionList } from '../components/ExecutionList';
import { WebsiteRecordData } from '../components/WebsiteRecordData';

export function WebsiteRecord() {
    const { id: recordId } = useParams<{ id: string }>();

    return (
        <>
            <div>
                <div>
                    <WebsiteRecordData />
                </div>
                <div className='border-4 border-blue-800 rounded-lg mt-10 px-2 py-4'>
                    <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                        Executions
                    </h1>
                    <ExecutionList sort='lastCrawl:dsc' id={Number(recordId)} />
                </div>
            </div>
        </>
    );
}
