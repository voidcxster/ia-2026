import type {Content, Folder} from "@models/UserData.ts";
import styles from "./FileLeaf.module.css";

// recursive element representing files in the file tree
export function FileLeaf({item, onClick}: {item: Folder, onClick: (folder: Content[]) => void}) {
  return (
    <li className={styles.fileTreeLeaf}>
      <span onClick={() => onClick(item.contents)}>{item.title}</span>
      <ol style={{paddingLeft:"20px"}}>
        {item.contents.map((child, i) => {
          // check if content is folder (TODO: might refactor into custom typeguard later)
          if (Object.hasOwn(child, "contents")) {
            const f = child as Folder;
            return <FileLeaf key={i} item={f} onClick={onClick}/>;
          }
        })}
      </ol>
    </li>
  );
}
