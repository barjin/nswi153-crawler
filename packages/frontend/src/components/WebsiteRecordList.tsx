import type { paths } from "packages/openapi-specification/dist/api-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PaginationBar } from "./PaginationBar";
import { RecordRow } from "./RecordRow";
import { Loading, useClient } from "../utils/ApiContext";

type WebsiteRecordListProps =
  paths["/records"]["get"]["parameters"]["query"] & { pagination?: boolean };
type WebsiteRecordsResponse =
  paths["/records"]["get"]["responses"]["200"]["content"]["application/json"];

export function WebsiteRecordList(props: WebsiteRecordListProps) {
  const { sort, filter, filterBy, limit, offset } = props || {};

  const [records, setRecords] = useState<Loading<WebsiteRecordsResponse>>({
    loading: true,
    data: null,
  });
  const api = useClient();

  useEffect(() => {
    api
      ?.GET("/records", {
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
  }, [api, props]);

  console.log(records.data);

  return (
    <>
      {!records.data?.records
        ? "Loading..."
        : records.data.records.map((execution, i) => (
            <Link to={`/website-records/${execution.id}`} key={i}>
              <RecordRow
                key={i}
                label={execution.label ?? ""}
                tags={execution.tags?.join(", ") ?? ""}
                periodicity={execution.periodicity ?? 0}
                lastExecutionTime={
                  execution.lastExecutionTime?.toString() ?? ""
                }
                lastExecutionStatus={execution.lastExecutionStatus ?? ""}
                isActive={execution.isActive ?? false}
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
