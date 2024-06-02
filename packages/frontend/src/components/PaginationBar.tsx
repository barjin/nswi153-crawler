export function PaginationBar({ recordsPerPage, totalRecords, currentPage, switchPage }: { recordsPerPage: number, totalRecords: number, currentPage: number, switchPage: Function }) {
    const pageLinks = [];

    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pageLinks.push(
            <div key={i} className={`inline-block text-black float-left px-4 py-2 m-1 border-2 hover:cursor-pointer ${i !== currentPage ? 'hover:bg-slate-200' : ''} ${i === currentPage ? 'bg-blue-200' : ''}`} onClick={() => switchPage(i)}>
                {i}
            </div>,
        );
    }

    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div>
                    { currentPage == 1 ? ''
                        : <div className="inline-block text-black float-left px-4 py-2 m-1 border-2 hover:cursor-pointer hover:bg-slate-200" onClick={() => switchPage(currentPage - 1)}>
                            {'<'}
                        </div>
                    }
                </div>
                <div>
                    {pageLinks}
                </div>
                <div>
                    { currentPage == Math.ceil(totalRecords / recordsPerPage) ? ''
                        : <div className="inline-block text-black float-left px-4 py-2 m-1 border-2 hover:cursor-pointer hover:bg-slate-200" onClick={() => switchPage(currentPage + 1)}>
                            {'>'}
                        </div>
                    }
                </div>

            </div>
        </>
    );
}
