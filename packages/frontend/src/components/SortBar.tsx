import { PiSortAscendingBold } from 'react-icons/pi';
import { TbSortAscending } from 'react-icons/tb';
import { useSearchParams } from 'react-router-dom';

export function SortBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortType, sortDirection] = searchParams.get('sort')?.split(':') ?? ['url', 'asc'];

    return (
        <>
            <div className="grid grid-cols-[auto_auto_auto_auto] justify-end items-end">
                <div className="font-bold col-span-4 pl-4">Sort By</div>
                {[
                    {
                        sortType: 'url',
                        label: 'URL',
                    },
                    {
                        sortType: 'lastExecutionTime',
                        label: 'Last Crawl Time',
                    },
                ].map((sort) => {
                    return (
                        <div key={sort.sortType} className="col-span-1 m-2 px-2">
                            <input
                                type="radio"
                                id={`${sort.sortType}-sort`}
                                name="sort"
                                value={sort.sortType}
                                defaultChecked={sortType === sort.sortType}
                                onClick={() => setSearchParams((p) => {
                                    p.set('sort', `${sort.sortType}:${sortDirection}`);
                                    return p;
                                }, { replace: true })}
                            />
                            <label className='ml-1'>{sort.label}</label>
                        </div>
                    );
                })}
                {
                    [{
                        direction: 'asc',
                        icon: <TbSortAscending />,
                    },
                    {
                        direction: 'dsc',
                        icon: <PiSortAscendingBold />,
                    }].map((sort) => {
                        return (
                            <button
                                key={sort.direction}
                                className={`
                                    p-1
                                    justify-self-end
                                    mb-2
                                    mx-2
                                    scale-125
                                    ${sortDirection === sort.direction
                                ? 'bg-blue-400'
                                : 'bg-blue-100 hover:bg-blue-200'
                            }`
                                }
                                onClick={() => setSearchParams((p) => {
                                    p.set('sort', `${sortType}:${sort.direction}`);
                                    return p;
                                }, { replace: true })}
                            >
                                {sort.icon}
                            </button>
                        );
                    })
                }
            </div>
        </>
    );
}
