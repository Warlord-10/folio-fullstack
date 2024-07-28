"use client"
import React, {useState} from 'react'
import UserDataContext from './UserDataContext';

const UserDataContextProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const [userPermission, setUserPermission] = useState(null);

  return (
    <UserDataContext.Provider value={{userData, setUserData, userPermission, setUserPermission}}>
        {children}
    </UserDataContext.Provider>
  )
}

export default UserDataContextProvider