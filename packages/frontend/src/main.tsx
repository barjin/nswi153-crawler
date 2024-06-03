import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import './index.css';
import { Executions } from './routes/Executions.tsx';
import { Home } from './routes/Home.tsx';
import Root from './routes/Root.tsx';
import { WebsiteRecords } from './routes/WebsiteRecords.tsx';
import { WebsiteRecordView } from './routes/WebsiteRecordView.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/website-records',
                element: <WebsiteRecords />,
            },
            {
                path: '/website-records/:id',
                element: <WebsiteRecordView />,
            },
            {
                path: '/executions',
                element: <Executions />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
