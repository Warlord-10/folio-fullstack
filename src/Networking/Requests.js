
// Static files
const publicFiles = ()=>{
    if(process.env.NODE_ENV === "development"){
        return `${process.env.NEXT_PUBLIC_DEV_URL}public/`
    }
    return `${process.env.NEXT_PUBLIC_PROD_URL}public/`
}
const userBundles = ()=>{
    if(process.env.NODE_ENV === "development"){
        return `${process.env.NEXT_PUBLIC_DEV_URL}test/`
    }
    return `${process.env.NEXT_PUBLIC_PROD_URL}test/`
}


// User
const userSignIn = ()=>{
    return `/auth/login`
}
const userSignUp = ()=>{
    return `/auth/register`
}
const getSession = ()=>{
    return `/auth/session`
}
const userSignOut = ()=>{
    return `/auth/logout`
}
const getDeleteUpdateUserById = (uid)=>{
    return `/user/s/${uid}`
}
const getUserProfilePage = (uid)=>{
    return `/user/page/${uid}`
}
const getSearchUser = (name)=>{
    return `/user/find/?name=${name}`
}


// Projects
const getDeleteUserAllProjects = ()=>{
    return `/projects`
}
const getUpdateDeleteProjectById = (pid)=>{
    return `/projects/s/${pid}`
}
const createUserProject = ()=>{
    return `/projects/s`
}
const transpileProject = ()=>{
    return `/projects/transpile`
}


// Folders
const getUpdateDeleteFolderById = (fid)=>{
    return `repo/folder/${fid}`
} 
const createFolder = ()=>{
    return `repo/folder`
}


// Files
const createFile = ()=>{
    return `repo/file`
}
const updateDeleteFile = (fid)=>{
    return `repo/file/${fid}`;
} 
const getFileData = (fid)=>{
    return `repo/file/data/${fid}`
}
const getFileDetail = (fid)=>{
    return `repo/file/detail/${fid}`
}
const uploadFile = (fid)=>{
    return `repo/file/upload/${fid}`
}


// Test
const testApi = ()=>{
    return `/user/test`
}

export default {
    publicFiles,
    userBundles,

    userSignIn, 
    userSignUp, 
    getSession,
    userSignOut,
    getDeleteUpdateUserById,
    getUserProfilePage,
    getSearchUser,

    getDeleteUserAllProjects,
    getUpdateDeleteProjectById,
    createUserProject,
    transpileProject,

    getUpdateDeleteFolderById,
    createFolder,

    createFile,
    updateDeleteFile,
    getFileData,
    getFileDetail,
    uploadFile,

    testApi
};
