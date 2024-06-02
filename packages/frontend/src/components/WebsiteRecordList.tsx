import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RecordRow } from './RecordRow';
import { Loading, WebsiteRecord, useClient } from '../utils/ApiContext';

export function WebsiteRecordList({ sort, filter, limit }: { sort: string, filter?: {[filter: string]: string}, limit?: number }) : JSX.Element[] | null {
    const [records, setRecords] = useState<Loading<WebsiteRecord[]>>({ loading: true, data: null });
    const navigate = useNavigate();
    const api = useClient();

    useEffect(() => {
        api?.GET('/records', {
            params: {
                query: {
                    sort,
                    ...(filter !== null && filter !== undefined && 'url' in filter && filter.url.length > 0 && { url: filter.url }),
                    ...(filter !== null && filter !== undefined && 'label' in filter && filter.label.length > 0 && { label: filter.label }),
                    ...(filter !== null && filter !== undefined && 'tag' in filter && filter.tag.length > 0 && { tag: filter.tag }),
                },
            },
        },
        ).then((response) => {
            setRecords({ loading: false, data: response.data ?? [] });
        }).catch((error) => {
            console.error(error);
        });
    }, [api]);

    return (
        records.loading
            ? null
            : records.data
                .slice(0, limit ?? records.data.length)
                .map((execution, i) => (
                    <RecordRow
                        key={i}
                        label={execution.label ?? ''}
                        tags={execution.tags?.join(', ') ?? ''}
                        periodicity={execution.periodicity?.toString() ?? ''}
                        lastExecutionTime={execution.lastExecutionTime?.toString() ?? ''}
                        lastExecutionStatus={execution.lastExecutionStatus ?? ''}
                        isActive={execution.isActive ?? false}
                        onClick={() => navigate(`/website-records/${execution.id}`)}
                    />
                ))
    );
}
