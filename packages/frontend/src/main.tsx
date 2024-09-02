import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Executions } from "./routes/Executions.tsx";
import { GoBack } from "./routes/GoBack.tsx";
import { Home } from "./routes/Home.tsx";
import Root from "./routes/Root.tsx";
import { Visualization } from "./routes/Visualization.tsx";
import { WebsiteRecord } from "./routes/WebsiteRecord.tsx";
import { WebsiteRecords } from "./routes/WebsiteRecords.tsx";

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <GoBack />,
        children: [
          {
            path: "/website-records",
            element: <WebsiteRecords />,
          },
          {
            path: "/website-records/:id",
            element: <WebsiteRecord />,
          },
          {
            path: "/executions",
            element: <Executions />,
          },
          {
            path: "/visualization",
            element: <Visualization />
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>,
);
