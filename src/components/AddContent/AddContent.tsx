import { useState, type MouseEventHandler } from "react";
import styles from "./AddContent.module.css";
import type { Content } from "@/models/UserData";

export interface AddContentProps {
  addContent: (content: Content) => void;
}
export default function AddContent({addContent}: AddContentProps) {
  const [showDash, setShowDesh] = useState(false);
  const handleClick: MouseEventHandler = () => {
    
  }

  return (
    <>
      <div className={`${styles.addContentCard} card contentCard`} onClick={handleClick}>
        <b>+</b>
      </div>
      <CreateContentDash show={showDash} addContent={addContent} />
    </>
  )
}
