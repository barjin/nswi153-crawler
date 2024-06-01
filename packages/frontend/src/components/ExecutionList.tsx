import { useEffect, useState } from 'react';
import { ExecutionRow } from './ExecutionRow'
import { Execution, Loading, useClient } from '../utils/ApiContext';

export function ExecutionList({ sort, filter, id, limit }: { sort: string, filter?: {[filter: string]: string}, id?: number, limit?: number }) : JSX.Element[] | null {
    const [executions, setExecutions] = useState<Loading<Execution[]>>({ loading: true, data: null });
    const api = useClient();

    useEffect(() => {
        api?.GET('/execution', {
            params: {
                query: {
                    sort: sort,
                    ...(id !== null && id !== undefined && {recordId: id}),
                    ...(filter !== null && filter !== undefined && 'url' in filter && filter['url'].length > 0 && {url: filter['url']}),
                    ...(filter !== null && filter !== undefined && 'label' in filter && filter['label'].length > 0 && {label: filter['label']})
                }
            }
        }).then((response) => {
            setExecutions({
                loading: false,
                data: response.data ?? [],
            });
        }).catch((error) => {
            console.error(error);
        });
    }, [api]);

    return (
        executions.loading
            ? null
            : executions.data.slice(0, limit).map((execution, i) => (
                <ExecutionRow
                    key={i}
                    label={execution.startURL ?? ''}
                />
            ))
    );
}
