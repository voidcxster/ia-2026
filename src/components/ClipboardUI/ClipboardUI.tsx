import type { MouseEventHandler } from "react";
import styles from "./ClipboardUI.module.css";

export interface ClipboardUIProps {
  contentKey: string;
  title: string;
  type: string | null;
  onPasteClick: MouseEventHandler;
  isCut: boolean;
}
export default function ClipboardUI({contentKey, title, type, onPasteClick, isCut}: ClipboardUIProps) {
  if (contentKey === "") {
    return;
  }
  return (
    <>
      <span>Key: {contentKey}</span><br />
      <span>Title: {title}</span><br />
      <span>Type: {type}</span><br />
      {isCut && (<><span>Cut Operation</span><br /></>)}
      <button onClick={onPasteClick}>Paste</button>
    </>
  )
}
