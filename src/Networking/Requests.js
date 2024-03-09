
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
const getDeleteUpdateUserById = (uid)=>{
    if(uid !== null){
        return `/user/s/${uid}`
    }
    else{
        return `/user/s/`
    }
}
const getUserProfilePage = (uid)=>{
    return `/user/page/${uid}`
}


// Projects
const getDeleteUserAllProjects = (uid)=>{
    return `/projects/${uid}`
}
const getUpdateDeleteProjectById = (pid)=>{
    return `/projects/s/${pid}`
}
const createUserProject = (uid)=>{
    return `/projects/s/${uid}`
}
const transpileProject = (uid)=>{
    return `/projects/transpile/${uid}`
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
    getDeleteUpdateUserById,
    getUserProfilePage,

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
