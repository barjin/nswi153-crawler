import { ExecutionList } from '../components/ExecutionList';

export function Executions() {
    return (
        <>
            <div className="h-full grid grid-cols-2 grid-rows-[auto_auto_1fr_auto] gap-4">
                <div className='col-span-2 justify-self-stretch'>
                    <h1 className='text-2xl font-bold text-slate-900 mb-4'>
                        Executions
                    </h1>
                </div>
                <div className='col-span-2 justify-self-stretch'>
                    <ExecutionList sort='url:asc' pagination={true} />
                </div>
            </div>
        </>
    );
}
