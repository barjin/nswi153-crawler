export function FilterBar({ setFilterPhrase, setFilterType, optionTag }: { setFilterPhrase: Function, setFilterType: Function, optionTag: boolean }) {
    return (
        <>
            <form className='flex flex-row py-4' onSubmit={(e) => e.preventDefault()}>
                <input className="shadow appearance-none border-2 border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="filter" type="text" placeholder="Enter filter phrase..." onChange={(e) => { setFilterPhrase(e.target.value); }} />

                <select className="ml-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-2xl" onChange={(e) => { setFilterType(e.target.value); }}>
                    <option value='url'>URL</option>
                    <option value='label'>Label</option>
                    { optionTag ? <option value='tag'>Tag</option> : ''}
                </select>
            </form>
        </>
    );
}
