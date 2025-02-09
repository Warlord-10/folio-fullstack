import React from 'react';
import TreeNode from './TreeNode';



function DirectoryTree({ params }) {
    return (
        <div className='overflow-y-auto border-r border-[#e2e8f0] h-screen'>
            <div className='p-4 font-semibold border-b border-[#e2e8f0]'>
                Files
            </div>
            <div className='p-2 text-md'>
                <TreeNode
                    name={params.projectName}
                    level={0}
                    currPath={""}
                    redirectUrl={`/${params.userId}/${params.projectName}`}
                />
            </div>
        </div>
    );
}

export default DirectoryTree