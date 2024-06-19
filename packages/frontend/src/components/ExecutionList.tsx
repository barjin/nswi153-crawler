import { paths } from "packages/openapi-specification/dist/api-types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ExecutionRow } from "./ExecutionRow";
import { PaginationBar } from "./PaginationBar";
import { Loading, useClient } from "../utils/ApiContext";

type ExecutionListProps = paths["/executions"]["get"]["parameters"]["query"] & {
  pagination?: boolean;
};

const PAGE_SIZE = 5;

export function ExecutionList(props: ExecutionListProps) {
  const { limit = PAGE_SIZE, recordId } = props ?? {};

  const [executions, setExecutions] = useState<
    Loading<
      paths["/executions"]["get"]["responses"]["200"]["content"]["application/json"]
    >
  >({
    loading: true,
    data: null,
  });
  const [searchParams] = useSearchParams();
  const api = useClient();

  useEffect(() => {
    api
      ?.GET("/executions", {
        params: {
          query: {
            limit,
            recordId,
            offset: (parseInt(searchParams.get("page") ?? "1", 10) - 1) * limit,
          },
        },
      })
      .then((response) => {
        setExecutions({
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
  }, [api, searchParams]);

  return (
    <>
      {executions.loading
        ? "Loading..."
        : executions.data.records?.map((execution, i) => (
            <ExecutionRow key={i} execution={execution} />
          ))}
      {props.pagination && executions.data ? (
        <PaginationBar totalPages={Math.ceil(executions.data.total! / limit)} />
      ) : null}
    </>
  );
}
