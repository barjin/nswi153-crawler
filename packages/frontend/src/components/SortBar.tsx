import { PiSortAscendingBold } from 'react-icons/pi';
import { TbSortAscending } from 'react-icons/tb';

interface SortBarProps {
    sortType: string,
    setSortType: (sortType: string) => void,
    sortDirection: string,
    setSortDirection: (sortDirection: string) => void,
}

export function SortBar({ sortType, setSortType, sortDirection, setSortDirection } : SortBarProps) {
    return (
        <>
            <div className="grid grid-cols-[auto_auto_auto_auto] justify-end items-end">
                <div className="font-bold col-span-4 pl-4">Sort By</div>
                <div className="col-span-1 m-2 px-2">
                    <input type="radio" id="url-sort" name="sort" value="url" defaultChecked={sortType === 'url'} onClick={() => setSortType('url')} />
                    <label className='ml-1'>URL</label>
                </div>
                <div className="col-span-1 m-2 px-2">
                    <input
                        type="radio"
                        id="last-crawl-sort"
                        name="sort"
                        value="last-crawl"
                        defaultChecked={sortType === 'lastCrawl'}
                        onClick={() => setSortType('lastCrawl')}
                    />
                    <label className='ml-1'>Last Crawl Time</label>
                </div>
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
                                    ${sortDirection === 'asc'
                                ? 'bg-blue-400'
                                : 'bg-blue-100 hover:bg-blue-200'
                            }`
                                }
                                onClick={() => setSortDirection(sort.direction)}
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
