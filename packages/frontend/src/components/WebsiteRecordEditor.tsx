import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading, WebsiteRecord, useClient } from '../utils/ApiContext';

export function WebsiteRecordEditor() {
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

    return (
        <>
            <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                Editing <span className='text-slate-600'>{record.loading ? '...' : record.data?.label ?? record.data?.url}</span>
            </h1>
            <pre>
                {JSON.stringify(record.data, null, 2)}
            </pre>
        </>
    );
}
