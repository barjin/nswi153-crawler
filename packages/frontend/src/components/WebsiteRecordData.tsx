import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading, WebsiteRecord, useClient } from '../utils/ApiContext';

export function WebsiteRecordData() : JSX.Element | null {
    const [record, setRecord] = useState<Loading<WebsiteRecord>>({ loading: true, data: null });
    const api = useClient();
    const { id } = useParams();

    useEffect(() => {
        api?.GET('/records/{recordId}', {
            params: {
                path: {
                    recordId: Number(id),
                },
            },
        }).then((response) => {
            setRecord({
                loading: false,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data: response.data ?? ({} as any),
            });
        }).catch((error) => {
            console.error(error);
        });
    }, [api]);

    return (record.loading
        ? null
        : <>
            <h1 className='text-2xl font-bold text-slate-900 mb-8'>
                { record.data.label }
            </h1>
            <div className='grid grid-cols-3'>
                <div className='col-span-1 text-l font-bold text-slate-800 mb-2'>Starting URL</div>
                <div className='col-span-2 mb-2'>{record.data.url}</div>
                <div className='col-span-1 text-l font-bold text-slate-800 mb-2'>Boundary regular expression</div>
                <div className='col-span-2 mb-2'>{record.data.boundaryRegEx}</div>
                <div className='col-span-1 text-l font-bold text-slate-800 mb-2'>Periodicity</div>
                <div className='col-span-2 mb-2'>{record.data.periodicity}</div>
                <div className='col-span-1 text-l font-bold text-slate-800 mb-2'>Tags</div>
                <div className='col-span-2 mb-2'>{record.data.tags?.join(', ')}</div>
                <div className='col-span-1 text-l font-bold text-slate-800 mb-2'>Is Active?</div>
                <div className='col-span-2 mb-2'>{record.data.isActive ? 'yes' : 'no'}</div>
            </div>
        </>
    );
}
