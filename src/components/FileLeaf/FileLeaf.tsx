import type {FolderIcon, Folders} from "@models/UserData.ts";
import styles from "./FileLeaf.module.css";

interface FileLeafProps {
  contentKey: string,
  item: FolderIcon,
  onClick: (fkey: string) => void,
  folders: Folders
}

// recursive element representing files in the file tree
export function FileLeaf({contentKey, item, onClick, folders}: FileLeafProps) {
  return (
    <li className={styles.fileTreeLeaf}>
      <span onClick={() => onClick(contentKey)}>{item.title}</span>
      <ol style={{paddingLeft:"20px"}}>
        {item.folders.map((key) => {
          // check if content is folder (TODO: might refactor into custom typeguard later)
          const f = folders[key] as FolderIcon;
          return <FileLeaf key={key} contentKey={key} item={f} onClick={onClick} folders={folders}/>;
        })}
      </ol>
    </li>
  );
}
