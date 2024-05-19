import type { paths } from '@nswi153-crawler/openapi-spec';
import createClient from 'openapi-fetch';
import { createContext, useContext } from 'react';

export type WebsiteRecord = paths['/records']['get']['responses']['200']['content']['application/json'][number];
export type Execution = paths['/execution']['get']['responses']['200']['content']['application/json'][number];

export type SingleWebsiteRecord = paths['/records/{recordId}']['get']['responses']['200']['content']['application/json'];

export type Loading<T> = {
    loading: true;
    data: null;
} | {
    loading: false;
    data: T;
};

export const ApiContext = createContext<{client: ReturnType<typeof createClient<paths>> | null}>({ client: null });
export const useClient = () => useContext(ApiContext).client;
