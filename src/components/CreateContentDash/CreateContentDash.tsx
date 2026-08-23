import type { Content } from "@models/UserData";
import styles from "./CreateContentDash.module.css"

export interface CreateContentDashProps {
  show: boolean;
  addContent: (content: Content) => void;
  onClose: () => void;
}
export default function CreateContentDash({show, addContent, onClose}: CreateContentDashProps) {
  return (
    <div className={`${show && styles.show} ${styles.createContentDash}`}>
      
    </div>
  )
}
