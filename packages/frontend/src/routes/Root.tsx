import { paths } from "@nswi153-crawler/openapi-spec";
import createClient from "openapi-fetch";
import { Outlet } from "react-router-dom";

import { ApiContext } from "../utils/ApiContext";

const api = createClient<paths>({
  baseUrl: "http://localhost:3000/",
});

function Root() {
  return (
    <>
      <ApiContext.Provider value={{ client: api }}>
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] bg-slate-500">
          <div className="col-start-1 lg:col-start-2 col-span-1 h-screen border-r border-slate-100 shadow-md p-4 bg-white">
            <Outlet />
          </div>
        </div>
      </ApiContext.Provider>
    </>
  );
}

export default Root;
