
// Static files
const publicFiles = (path)=>{
    return `${process.env.NEXT_PUBLIC_BASE_URL}/public/${path}`
}
const projectBundles = (url)=>{
    return `${process.env.NEXT_PUBLIC_BASE_URL}/bundle/${url}`
}
const bannerFiles = (path)=>{
    return `${process.env.NEXT_PUBLIC_BASE_URL}/banner/${path}`
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
const getDeleteUserAllProjects = (uid)=>{
    return `/projects/${uid}`
}
const getUpdateDeleteProjectById = (pid)=>{
    return `/projects/s/${pid}`
}
const createUserProject = ()=>{
    return `/projects/s`
}
const transpileProject = (pid)=>{
    return `/projects/transpile/${pid}`
}


// Folders
const getUpdateDeleteFolderById = (fid)=>{
    return `/repo/folder/${fid}`
} 
const createFolder = ()=>{
    return `/repo/folder`
}


// Files
const createFile = ()=>{
    return `/repo/file`
}
const updateDeleteFileById = (fid)=>{
    return `/repo/file/${fid}`;
} 
const getFileData = (fid)=>{
    return `/repo/file/data/${fid}`
}
const getFileDetail = (fid)=>{
    return `/repo/file/detail/${fid}`
}
const uploadFile = (fid)=>{
    return `/repo/file/upload/${fid}`
}


// AI
const getCodeSuggestions = ()=>{
    return `/api/copilot`
}

// v2 APIs
const getProjectByName = (uid, pname)=>{
    return `/v2/project/${uid}/${pname}`
}
const getFolder_v2 = (uid, pname, repo_path=null)=>{
    if (repo_path != null) return `/v2/${uid}/${pname}/tree/main/${repo_path}`
    return `/v2/${uid}/${pname}/tree/main/`
}
const getFileDetails_v2 = (uid, pname, repo_path)=>{
    return `/v2/${uid}/${pname}/blob/main/${repo_path}`
}

// Portfolio
const fetchPortfolios_v2 = (page=1)=>{
    return `/portfolio/all?page=${page}`
}
const addPortfolioLike = (portfolio_id)=>{
    return `/portfolio/like/${portfolio_id}`
}
const removePortfolioLike = (portfolio_id)=>{
    return `/portfolio/like/${portfolio_id}`
}



// For testing only
const forTesting = ()=>{
    return `/test`
}


export default {
    publicFiles,
    projectBundles,
    bannerFiles,

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
    updateDeleteFileById,
    getFileData,
    getFileDetail,
    uploadFile,

    getCodeSuggestions,

    getProjectByName,
    getFolder_v2,
    getFileDetails_v2,

    fetchPortfolios_v2,
    addPortfolioLike,
    removePortfolioLike,



    forTesting,
};
