import type { IconType } from 'react-icons';

export function Row({
    title,
    subtitle,
    detail,
    Icon,
    onClick,
}: { title: string; subtitle: string; detail: string; Icon: IconType, onClick?: () => void }) {
    return (
        <div
            className='flex flex-row items-center py-2 px-4 odd:bg-slate-100 even:bg-slate-50 hover:bg-slate-200 cursor-pointer'
            onClick={onClick}
        >
            <div className="flex flex-col flex-1">
                <span>{title}</span>
                <span className='text-xs'>
                    <span className='font-semibold'>
                        {subtitle}
                    </span>&nbsp;|&nbsp;
                    <span className='text-gray-500'>
                        {detail}
                    </span>
                </span>
            </div>
            <Icon
                color="gray"
            />
        </div>
    );
}
