import type { paths } from "packages/openapi-specification/dist/api-types";
import { useEffect, useState } from "react";

import { PaginationBar } from "./PaginationBar";
import { RecordRow } from "./RecordRow";
import { Loading, useClient } from "../utils/ApiContext";

type WebsiteRecordsResponse =
  paths["/api/records"]["get"]["responses"]["200"]["content"]["application/json"];

export function WebsiteRecordListVisualization() {
    const pollingPeriod = 10000; // 10s

    const [records, setRecords] = useState<Loading<WebsiteRecordsResponse>>({
        loading: true,
        data: null,
      });

    const api = useClient();

    useEffect(() => {
      function getRecords() {
        api
          ?.GET("/api/records", {
            params: {
              query: {
                sort: "url:asc",
                filter: "",
                filterBy: "url",
                limit: 100,
                offset: 0,
              },
            },
          })
          .then((response) => {
            setRecords({
              loading: false,
              data: response.data ?? {
                limit: 0,
                offset: 0,
                total: 0,
                records: [],
              },
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
  
      getRecords();
  
      const interval = setInterval(() => {
        getRecords();
      }, pollingPeriod);
  
      return () => clearInterval(interval);
    }, [api]);
    return (
        <>
        {!records.data?.records
        ? "Loading..."
        : records.data.records.map((record, i) => (
              <RecordRow
              key={i}
              id={record.id ?? 0}
              label={record.label ?? ""}
              tags={record.tags?.join(", ") ?? ""}
              periodicity={record.periodicity ?? 0}
              lastExecutionTime={record.lastExecutionTime?.toString() ?? ""}
              lastExecutionStatus={record.lastExecutionStatus ?? ""}
              isActive={record.isActive ?? false}
              canSelect={true}
              />
          ))}
      {records.data ? (
        <PaginationBar
          totalPages={Math.ceil(records.data.total! / records.data.limit!)}
        />
      ) : (
        ""
      )}
        </>            
    );
}