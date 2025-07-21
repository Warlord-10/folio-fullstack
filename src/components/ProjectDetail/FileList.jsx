import Link from "next/link";
import { FileDetailTab } from "./RepoTab";

export default function FileList({ files, pathname }){
    return (
      <>
        {files.map((file, index) => {
          const tempPath = pathname.includes("tree/main")
            ? `${pathname.replace("tree", "blob")}/${file.name}`
            : `${pathname}/blob/main/${file.absPath}`;
  
          return (
            <Link key={file._id} href={tempPath}>
              <FileDetailTab fileData={file} />
            </Link>
          );
        })}
      </>
    );
};
  