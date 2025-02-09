import { format, set } from 'date-fns';

function FileDetailTab({fileData}) {
    return (
        <div className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300'>
            <div className='flex gap-2 items-center justify-center cursor-pointer'>
                <img src="/fileIcon.svg" alt="" className="w-5 h-5" />
                <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>{fileData.name}</h1>
            </div>
            <div className='flex items-center justify-end gap-6'>
                <h1 className='text-gray-500 text-sm'>{format(new Date(fileData.updatedAt), "dd/MM/yy HH:mm")}</h1>
            </div>
        </div>
    );
}


function FolderDetailTab({folderData}) {
    return (
        <div className='flex p-3 hover:bg-gray-800 justify-between items-center rounded-lg transition duration-300'>
            <div className='flex gap-2 items-center justify-center cursor-pointer'>
                <img src="/folderIcon.svg" alt="" className="w-5 h-5" />
                <h1 className='text-base cursor-pointer hover:text-purple-400 transition duration-300'>{folderData.name}</h1>
            </div>
            <div className='flex items-center justify-end gap-6'>
                <h1 className='text-gray-500 text-sm'>{format(new Date(folderData.updatedAt), "dd/MM/yy HH:mm")}</h1>
            </div>
        </div>
    );
}

export { FileDetailTab, FolderDetailTab }