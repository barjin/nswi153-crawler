import { useState } from 'react'
import './App.css';

import createClient from 'openapi-fetch';
import { paths } from '@nswi153-crawler/openapi-spec/lib/api-types';

function App() {
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
  )
}

export default App
