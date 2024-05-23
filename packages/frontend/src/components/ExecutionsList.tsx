import { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import { Row } from './Row';
import { Execution, Loading, useClient } from '../utils/ApiContext';

export function ExecutionList({ limit }: { limit?: number }) {
    const [executions, setExecutions] = useState<Loading<Execution[]>>({ loading: true, data: null });
    const api = useClient();

    useEffect(() => {
        api?.GET('/execution').then((response) => {
            setExecutions({
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
                Executions
            </h1>
            <div className='w-full flex flex-col'>
                {
                    executions.loading
                        ? 'Loading...'
                        : executions.data.slice(0, limit).map((execution, i) => (
                            <Row
                                key={i}
                                title={execution.startURL ?? ''}
                                subtitle={new Date(execution.nodes?.[0].crawlTime ?? new Date()).toLocaleString() ?? ''}
                                detail={execution.nodes?.[0].url ?? ''}
                                Icon={FaMagnifyingGlass}
                            />
                        ))
                }
            </div>
        </>
    );
}
