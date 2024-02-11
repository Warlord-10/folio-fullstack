import React from 'react'
import UserEditLeftSide from './UserEditLeftSide';
import UserEditRightSide from './UserEditRightSide';


function UserEditScreen( {data} ) {
    return (
        <div className='userEditScreen flex p-2 font-mono bg-[#171323] text-white justify-center min-h-[100vh]'>
            <UserEditLeftSide data={data}/>
            <UserEditRightSide data={data.projects}/>
        </div>
    )
}

export default UserEditScreen;