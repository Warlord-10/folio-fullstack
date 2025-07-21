import { FilePlusIcon, FolderPlusIcon, UploadIcon } from "lucide-react";
import Link from "next/link";
import DropDownMenu from "./DropDownMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FolderHeader({
  relPath,
  absPath,
  permission,
  onAddFile,
  onAddFolder,
  onUpload,
  onDelete,
  showDropDown,
  toggleDropDown,
  showDeleteButton,
}) {
  return (
    <div className="p-4 items-center flex justify-between border-gray-950 border-b-4">
      <h1 className="text-md font-thin">
        <Link
          href={`/${relPath.split("/").slice(0, 2).join("/")}`}
          className="text-blue-600"
        >
          {relPath.split("/")[1]}
        </Link>
        <span>{"/" + absPath}</span>
      </h1>
      {permission == "OWNER" && (
        <div className="flex gap-2">
          <DropDownMenu
            title="Add Files"
            isOpen={showDropDown}
            toOpen={toggleDropDown}
          >
            <button
              className="flex gap-4 hover:bg-gray-700 transition duration-100 p-1 rounded-md"
              onClick={onAddFile}
            >
              <FilePlusIcon size={24} />
              <h1>Add File</h1>
            </button>
            <button
              className="flex gap-4 hover:bg-gray-700 transition duration-100 p-1 rounded-md"
              onClick={onAddFolder}
            >
              <FolderPlusIcon size={24} />
              <h1>Add Folder</h1>
            </button>
            <button
              className="flex gap-4 hover:bg-gray-700 transition duration-100 p-1 rounded-md"
              onClick={onUpload}
            >
              <UploadIcon size={24} />
              <h1>Upload Files</h1>
            </button>
          </DropDownMenu>

          {showDeleteButton && (
            <button
              className="rounded-md border border-red-800 hover:bg-red-500 p-2"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
