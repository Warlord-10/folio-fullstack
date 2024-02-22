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


const getDeleteUserAllProjects = (uid)=>{
    return `/projects/${uid}`
}
const getUpdateDeleteProjectById = (pid)=>{
    return `/projects/s/${pid}`
}
const createUserProject = ()=>{
    return '/projects/s'
}
const transpileProject = (pid)=>{
    return `/projects/transpile/${pid}`
}


const getUpdateDeleteFolderById = (fid)=>{
    return `repo/folder/${fid}`
} 
const createFolder = ()=>{
    return `repo/folder`
}


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


const testApi = ()=>{
    return `/user/test`
}

export default {
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
