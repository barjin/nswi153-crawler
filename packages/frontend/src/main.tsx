import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import './index.css';
import { Executions } from './routes/Executions.tsx';
import { GoBack } from './routes/GoBack.tsx';
import { Home } from './routes/Home.tsx';
import Root from './routes/Root.tsx';
import { WebsiteRecord } from './routes/WebsiteRecord.tsx';
import { WebsiteRecords } from './routes/WebsiteRecords.tsx';

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
                path: '/',
                element: <GoBack />,
                children: [
                    {
                        path: '/website-records',
                        element: <WebsiteRecords />,
                    },
                    {
                        path: '/website-records/:id',
                        element: <WebsiteRecord />,
                    },
                    {
                        path: '/executions',
                        element: <Executions />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
