import type { paths } from "packages/openapi-specification/dist/api-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PaginationBar } from "./PaginationBar";
import { RecordRow } from "./RecordRow";
import { Loading, useClient } from "../utils/ApiContext";

type WebsiteRecordListProps =
  paths["/api/records"]["get"]["parameters"]["query"] & {
    pagination?: boolean;
    canSelect?: boolean;
  };
type WebsiteRecordsResponse =
  paths["/api/records"]["get"]["responses"]["200"]["content"]["application/json"];

export function WebsiteRecordList(props: WebsiteRecordListProps) {
  const { sort, filter, filterBy, limit, offset } = props || {};
  const pollingPeriod = 5000; // 5s

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
              sort: sort ?? "url:asc",
              filter: filter ?? "",
              filterBy: filterBy ?? "url",
              limit: limit ?? 10,
              offset: offset ?? 0,
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
  }, [api, filter, filterBy, limit, offset, sort]);

  return (
    <>
      {!records.data?.records
        ? "Loading..."
        : records.data.records.map((record, i) => (
            <Link to={`/website-records/${record.id}`} key={i}>
              <RecordRow
                key={i}
                id={record.id ?? 0}
                label={record.label ?? ""}
                tags={record.tags?.join(", ") ?? ""}
                periodicity={record.periodicity ?? 0}
                lastExecutionTime={record.lastExecutionTime?.toString() ?? ""}
                lastExecutionStatus={record.lastExecutionStatus ?? ""}
                isActive={record.isActive ?? false}
                canSelect={props.canSelect ?? false}
              />
            </Link>
          ))}
      {props.pagination && records.data ? (
        <PaginationBar
          totalPages={Math.ceil(records.data.total! / records.data.limit!)}
        />
      ) : (
        ""
      )}
    </>
  );
}
