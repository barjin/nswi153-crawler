import { useState } from 'react';
import './App.css';

import createClient from 'openapi-fetch';
import { paths } from '@nswi153-crawler/openapi-spec/lib/api-types';

const api = createClient<paths>({
    baseUrl: 'http://localhost:8080/api',
});

function App() {
    // Example usage of the generated client - note that the API is fully typed, so you get autocompletion and type checking
    api.GET('/user/login', {
        params: {
            query: {
                username: 'admin',
                password: 'admin',
            },
        },
    }).then(() => {});

    const [count, setCount] = useState(0);

    return (
        <>
            <h1>NSWI153 Crawler</h1>
            <p>
        So far, there is nothing much here.
            </p>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
                </button>
            </div>
        </>
    );
}

export default App;
