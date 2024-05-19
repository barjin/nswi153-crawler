import { paths } from '@nswi153-crawler/openapi-spec/lib/api-types';
import createClient from 'openapi-fetch';
import { useEffect, useState } from 'react';
import './App.css';

const api = createClient<paths>({
    baseUrl: 'http://localhost:3000/',
});

type WebsiteRecord = paths['/records']['get']['responses']['200']['content']['application/json'][number];

function RecordRow({ record }: { record: WebsiteRecord }) {
    return (
        <tr
            key={record.id}
            className={`
        even:bg-slate-100 
        odd:bg-slate-50 
        cursor-pointer
        hover:bg-slate-200
      `}
        >
            <td>{record.isActive ? '✅' : '❌'}</td>
            <td>
                <div className='flex flex-col py-2'>
                    <span>{record.label}</span>
                    <span className='text-xs'>
                        <span className='font-semibold'>
                            {record.url}
                        </span>&nbsp;|&nbsp;
                        <span className='text-gray-500'>
                            { record.boundaryRegEx }
                        </span>
                    </span>
                </div>
            </td>
        </tr>
    );
}

function App() {
    const [records, setRecords] = useState<WebsiteRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.GET('/records').then((response) => {
            setRecords(response.data ?? []);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <div
                className='grid grid-cols-3'
            >
                <div
                    className='col-start-2 col-span-1 h-screen border-r border-slate-100 shadow-md rounded-lg p-4'
                >
                    <h1>Website Records</h1>
                    <table
                        className={`
          bg-slate-50
          w-full

        `}
                    >
                        <thead
                            className={`
              bg-slate-100
              text-left
              text-black
              text-sm
              font-semibold
            `}
                        >
                            <tr>
                                <th>Active</th>
                                <th>Record</th>
                            </tr>
                        </thead>
                        <tbody
                            className='text-sm text-left text-black'
                        >
                            {loading ? <tr><td>Loading...</td></tr> : records.map((record) => (
                                <RecordRow record={record} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default App;
