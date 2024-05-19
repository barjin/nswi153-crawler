import { paths } from '@nswi153-crawler/openapi-spec/lib/api-types';
import createClient from 'openapi-fetch';
import { useState } from 'react';

import './App.css';

const api = createClient<paths>({
    baseUrl: 'http://localhost:8080/api',
});

function App() {
    // Example usage of the generated client - note that the API is fully typed, so you get autocompletion and type checking
    api.GET('/execution/{executionId}', {
        params: {
            path: {
                executionId: 123,
            },
        },
    }).then(() => {}).catch(() => {});

    const [count, setCount] = useState(0);

    return (
        <>
            <h1>NSWI153 Crawler</h1>
            <p>
        So far, there is nothing much here.
            </p>
            <div className="card">
                <button onClick={() => setCount(() => count + 1)}>
          count is {count}
                </button>
            </div>
        </>
    );
}

export default App;
