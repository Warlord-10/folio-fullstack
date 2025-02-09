import React from 'react'
import DirectoryTree from '@/components/DirectoryTree';


function Layout({ children, params }) {
    return (
        <div className='grid grid-cols-5 gap-1'>
            <div className='col-span-1'>
                <DirectoryTree params={params}/>
            </div>
            <div className='col-span-4'>
                {children}
            </div>
        </div>
    );
}

export default Layout