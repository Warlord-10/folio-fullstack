import React from 'react';
import PopUpBox from '../PopUpBox';

function FileDeletePopup({ isOpen, onClose, onConfirm, fileName }) {
    return (
        <PopUpBox
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Confirm Delete?"
            confirmTitle="Delete"
        >
            <div className='flex flex-col items-center justify-center'>
                <p className='text-gray-300'>
                    Are you sure you want to delete file
                    <span className='text-red-400 font-semibold text-lg'> &quot;{fileName}&quot; </span>?
                    Once deleted, it cannot be recovered.
                </p>
            </div>
        </PopUpBox>
    );
}

export default FileDeletePopup;
