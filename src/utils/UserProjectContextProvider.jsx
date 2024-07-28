"use client"
import React, {useState} from 'react'
import UserProjectContext from './UserProjectContext';

const UserProjectContextProvider = ({children}) => {
    const [projectData, setProjectData] = useState()

  return (
    <UserProjectContext.Provider value={{projectData, setProjectData}}>
        {children}
    </UserProjectContext.Provider>
  )
}

export default UserProjectContextProvider;