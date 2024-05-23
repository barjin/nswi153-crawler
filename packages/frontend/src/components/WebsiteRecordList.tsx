import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Row } from './Row';
import { Loading, WebsiteRecord, useClient } from '../utils/ApiContext';

export function WebsiteRecordList({ limit }: { limit?: number }) {
    const [records, setRecords] = useState<Loading<WebsiteRecord[]>>({ loading: true, data: null });
    const navigate = useNavigate();
    const api = useClient();

    useEffect(() => {
        api?.GET('/records').then((response) => {
            setRecords({
                loading: false,
                data: response.data ?? [],
            });
        }).catch((error) => {
            console.error(error);
        });
    }, [api]);

    return (
        <>
            <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                Website records
            </h1>
            <div className='w-full flex flex-col'>
                {
                    records.loading
                        ? 'Loading...'
                        : records.data
                            .slice(0, limit ?? records.data.length)
                            .map((execution, i) => (
                                <Row
                                    key={i}
                                    title={execution.label ?? execution?.url}
                                    subtitle={execution.url}
                                    detail={execution.boundaryRegEx}
                                    Icon={FaPencilAlt}
                                    onClick={() => navigate(`/website-records/${execution.id}`)}
                                />
                            ))
                }
            </div>
        </>
    );
}
