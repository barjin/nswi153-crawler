import { useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { CreateRecordPopup } from "../components/CreateRecordPopup";
import { FilterBar } from "../components/FilterBar";
import { SortBar } from "../components/SortBar";
import { WebsiteRecordList } from "../components/WebsiteRecordList";
import { useClient } from "../utils/ApiContext";

const PAGE_SIZE = 5;

export function WebsiteRecords() {
  const [searchParams, setSearchParams] = useSearchParams();
  const showCreateWindow = searchParams.get("create") === "true";

  const sortType = searchParams.get("sort")?.split(":")[0] ?? "url";
  const sortDirection = searchParams.get("sort")?.split(":")[1] ?? "asc";
  const filterQuery = searchParams.get("filter") ?? "";
  const filterBy = searchParams.get("filterBy") ?? "url";
  const offset =
    (parseInt(searchParams.get("page") ?? "1", 10) - 1) * PAGE_SIZE;

  const api = useClient();

  const createNewRecord = useCallback(
    async (formData: FormData) => {
      const number = parseInt(formData.get("periodicity-number") as string, 10);
      const type = formData.get("periodicity-type");

      let periodicity = 0;
      if (type === "minutes") periodicity = number * 60;
      else if (type === "hours") periodicity = number * 3600;
      else if (type === "days") periodicity = number * 86400;

      try {
        await api
          ?.POST("/records", {
            body: {
              url: formData.get("url") as string,
              boundaryRegEx: formData.get("regex") as string,
              periodicity,
              label: formData.get("label") as string,
              isActive: formData.has("active"),
              tags: (formData.get("tags") as string)
                .split(",")
                .map((tag) => tag.trim()),
              lastExecutionTime: undefined,
              lastExecutionStatus: undefined,
            },
          });
      } catch (error) {
        console.error(error);
      }
    },
    [api],
  );

  return (
    <>
      <div className="h-full grid grid-cols-2 grid-rows-[auto_auto_1fr_auto] gap-4">
        <div className="col-span-1 justify-self-stretch">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Website records
          </h1>
        </div>
        <div className="col-span-1 justify-self-end">
          <Link to="/website-records?create=true" replace={true}>
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl">
              Create New Record
            </button>
          </Link>
        </div>
        <div className="col-span-1 justify-self-stretch">
          <FilterBar categories={["url", "label", "tags"]} />
        </div>
        <div className="col-span-1 justify-self-end">
          <SortBar />
        </div>
        <div className="col-span-2 justify-self-stretch">
          <WebsiteRecordList
            sort={
              `${sortType}:${sortDirection}` as
                | "url:asc"
                | "url:desc"
                | "lastExecutionTime:asc"
                | "lastExecutionTime:desc"
            }
            filter={filterQuery}
            filterBy={filterBy as unknown as "url" | "label" | "tags"}
            limit={10}
            offset={offset}
            pagination={true}
          />
        </div>
      </div>

      <CreateRecordPopup
        showPopup={showCreateWindow}
        closePopup={() =>
          setSearchParams((p) => ({ ...p, create: "false" }), { replace: true })
        }
        createNewRecord={(data: FormData) => createNewRecord(data)}
      />
    </>
  );
}
