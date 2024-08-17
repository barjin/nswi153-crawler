import type { paths } from "@nswi153-crawler/openapi-spec";
import createClient from "openapi-fetch";
import { createContext, useContext } from "react";

export type WebsiteRecord = Exclude<
  paths["/api/records"]["get"]["responses"]["200"]["content"]["application/json"]["records"],
  undefined
>[number];
export type Execution = Exclude<
  paths["/api/executions"]["get"]["responses"]["200"]["content"]["application/json"]["records"],
  undefined
>[number];

export type SingleWebsiteRecord =
  paths["/api/records/{recordId}"]["get"]["responses"]["200"]["content"]["application/json"];

export type Loading<T> =
  | {
      loading: true;
      data: null;
    }
  | {
      loading: false;
      data: T;
    };

export const ApiContext = createContext<{
  client: ReturnType<typeof createClient<paths>> | null;
}>({ client: null });
export const useClient = () => useContext(ApiContext).client;
