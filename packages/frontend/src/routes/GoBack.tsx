import { Link, Outlet } from 'react-router-dom';

export function GoBack() {
    return (
        <>
            <Link
                to='/'
                className='text-blue-700 hover:text-blue-900 cursor-pointer'
            >
                &lt; Go home
            </Link>
            <Outlet />
        </>
    );
}
