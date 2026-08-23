import { useState, type MouseEventHandler } from "react";
import styles from "./AddContent.module.css";
import type { Content } from "@models/UserData";
import CreateContentDash from "@components/CreateContentDash/CreateContentDash";

export interface AddContentProps {
  addContent: (content: Content) => void;
}
export default function AddContent({addContent}: AddContentProps) {
  const [showDash, setShowDash] = useState(false);
  const handleClick: MouseEventHandler = () => {
    setShowDash(true);
  }

  function onClose() {
    setShowDash(false);
  }

  return (
    <>
      <div className={`${styles.addContentCard} card contentCard`} onClick={handleClick}>
        <b>+</b>
      </div>
      <CreateContentDash show={showDash} addContent={addContent} onClose={onClose} />
    </>
  )
}
