import type { paths } from 'packages/openapi-specification/dist/api-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RecordRow } from './RecordRow';
import { Loading, WebsiteRecord, useClient } from '../utils/ApiContext';

export function WebsiteRecordList(props: paths['/records']['get']['parameters']['query']) {
    const { sort, filter, filterBy, limit, offset } = props || {};

    console.log(props);

    const [records, setRecords] = useState<Loading<WebsiteRecord[]>>({ loading: true, data: null });
    const api = useClient();

    useEffect(() => {
        api?.GET('/records', {
            params: {
                query: {
                    sort: sort ?? 'url:asc',
                    filter: filter ?? '',
                    filterBy: filterBy ?? 'url',
                    limit: limit ?? 10,
                    offset: offset ?? 0,
                },
            },
        },
        ).then((response) => {
            setRecords({ loading: false, data: response.data ?? [] });
        }).catch((error) => {
            console.error(error);
        });
    }, [api, props]);

    return (
        records.loading
            ? 'Loading...'
            : records.data
                .slice(0, limit ?? records.data.length)
                .map((execution, i) => (
                    <Link to={`/website-records/${execution.id}`} key={i}>
                        <RecordRow
                            key={i}
                            label={execution.label ?? ''}
                            tags={execution.tags?.join(', ') ?? ''}
                            periodicity={execution.periodicity?.toString() ?? ''}
                            lastExecutionTime={execution.lastExecutionTime?.toString() ?? ''}
                            lastExecutionStatus={execution.lastExecutionStatus ?? ''}
                            isActive={execution.isActive ?? false}
                        />
                    </Link>
                ))
    );
}
