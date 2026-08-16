import {Content, Folder} from "./UserData.tsx";
import "./FileLeaf.css";
import type { MouseEventHandler } from "react";

// recursive element representing files in the file tree
export function FileLeaf({item, onClick}: {item: Folder, onClick: (folder: Content[]) => void}) {
  return (
    <li className="fileTreeLeaf">
      <span onClick={() => onClick(item.getContents())}>{item.getTitle()}</span>
      <ol style={{paddingLeft:"20px"}}>
        {item.getContents().map((child, i) => {
          if (child instanceof Folder) {
            return <FileLeaf key={i} item={child} onClick={onClick}/>;
          }
        })}
      </ol>
    </li>
  );
}