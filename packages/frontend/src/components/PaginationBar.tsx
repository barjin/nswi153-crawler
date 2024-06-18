import { useSearchParams } from "react-router-dom";

interface PaginationBarProps {
  totalPages: number;
}

export function PaginationBar({ totalPages }: PaginationBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  const switchPage = (page: number) => {
    setSearchParams(
      (p) => {
        p.set("page", page.toString());
        return p;
      },
      { replace: true },
    );
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <button
          className={`${
            currentPage === 1
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-900"
          } text-white font-bold py-2 px-4 rounded-l-2xl`}
          onClick={() => switchPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="bg-blue-700 text-white font-bold py-2 px-4">
          {currentPage} of {totalPages > 0 ? totalPages : 1}
        </div>
        <button
          className={`${
            currentPage === totalPages || totalPages === 0
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-900"
          } text-white font-bold py-2 px-4 rounded-r-2xl`}
          onClick={() => switchPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </>
  );
}
