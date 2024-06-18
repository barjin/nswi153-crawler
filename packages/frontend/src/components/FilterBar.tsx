import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterBarProps {
  categories: string[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("filter") ?? "");
  const [filterBy, setFilterBy] = useState(
    searchParams.get("filterBy") ?? "url",
  );

  const submitFilter = useCallback((value: string) => {
    setQuery(value);

    setSearchParams(
      (p) => {
        p.set("filter", value);
        p.set("filterBy", filterBy);
        return p;
      },
      { replace: true },
    );
  }, [query, setSearchParams, filterBy]);

  return (
    <>
      <form
        className="flex flex-row py-4"
      >
        <input
          className={`
                        shadow
                        appearance-none
                        border-2
                        border-slate-500
                        rounded
                        w-full
                        py-2
                        px-3
                        text-gray-700
                        leading-tight
                        focus:outline-none
                        focus:shadow-outline`}
          id="filter"
          type="text"
          placeholder="Enter filter phrase..."
          value={query}
          onChange={(e) => {
            submitFilter(e.target.value);
          }}
        />

        <select
          className="ml-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-2xl"
          onChange={(e) => setFilterBy(e.target.value)}
          value={filterBy}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}
