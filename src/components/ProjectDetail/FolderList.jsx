import { FolderDetailTab } from "./RepoTab";
import Link from "next/link";

export default function FolderList({ folders, pathname }){
    return (
      <>
        {folders.map((folder, index) => {
          const tempPath = pathname.includes("tree/main")
            ? `${pathname}/${folder.name}`
            : `${pathname}/tree/main/${folder.absPath}`;
  
          return (
            <Link key={folder._id} href={tempPath}>
              <FolderDetailTab folderData={folder} />
            </Link>
          );
        })}
      </>
    );
};


