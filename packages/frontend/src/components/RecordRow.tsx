interface RecordRowProps {
    label: string,
    tags: string,
    periodicity: string,
    lastExecutionTime: string,
    lastExecutionStatus: string,
    isActive: boolean,
    onClick: () => void,
}

export function RecordRow({ label, tags, periodicity, lastExecutionTime, lastExecutionStatus, isActive, onClick }: RecordRowProps) {
    return (
        <div
            className={`
                flex
                flex-row
                items-center
                py-2
                pb-3
                px-4
                mb-2
                ${isActive
            ? 'bg-green-200 hover:bg-green-400'
            : 'bg-slate-200 hover:bg-slate-400'
        }
                cursor-pointer
                rounded
            `}
            onClick={onClick}
        >
            <div className='flex flex-col flex-1'>
                <span>
                    <span className='font-bold'>{label}</span>
                    <span className='px-2 text-xs'>(tags: {tags})</span>
                </span>
                <span className='text-xs'>
                    <span>{periodicity}</span>
                    &nbsp;|&nbsp;
                    <span>{lastExecutionTime}</span>
                    &nbsp;|&nbsp;
                    <span>{lastExecutionStatus}</span>
                </span>
            </div>
        </div>
    );
}
