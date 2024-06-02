export function CreateRecordPopup({ showPopup, closePopup, createNewRecord } : { showPopup: boolean, closePopup: Function, createNewRecord: Function }) {
    return (!showPopup ? ''
        : <>
            <div className='flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black/50'>
                <form className='relative p-8 w-full max-w-2xl bg-white rounded' onSubmit={(e) => {
                    e.preventDefault();
                    createNewRecord(new FormData(e.currentTarget));
                    closePopup();
                }}>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                            Starting point URL (required)
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="url" id="url" type="text" placeholder="URL" required />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regex">
                            Boundary Regular Expression (required)
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="regex" id="regex" type="text" placeholder="RegExp" required />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="label">
                            Label (required)
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="label" id="label" type="text" placeholder="Label" required />
                    </div>
                    <div className='mb-4'>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                            Tags (separated by commas) (required)
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="tags" id="tags" type="text" placeholder="Tags" required />
                    </div>
                    <div className="grid grid-cols-2 gaps-4">
                        <div className='mb-6'>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="periodicity">
                                Periodicity (required)
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="periodicity" id="periodicity" type="text" placeholder="Periodicity" required />
                        </div>
                        <div className="flex items-center mb-6 pt-6">
                            <div className="w-1/3"></div>
                            <label className="w-2/3 block font-bold">
                                <input className="mr-2 leading-tight" name="active" type="checkbox" defaultChecked />
                                <span className="text-sm">
                                    Active?
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gaps-4">
                        <button className="mr-1 bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl" type="submit">
                            Create
                        </button>
                        <button className="ml-1 bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-2xl" type="button" onClick={() => closePopup()}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
