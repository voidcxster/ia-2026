import { useState, type MouseEventHandler } from 'react';
import styles from './ContentCard.module.css';
// import { Ellipses } from './icons/Ellipses.tsx'
import { useNavigate } from 'react-router';
import type { Content } from "@models/UserData";

// Component representing a file icon that could either be a card set or another
// folder
export interface ContentCardProps {
  content: Content;
  contentKey: string;
  handlers: ContentCardHandlers;
  onClick?: MouseEventHandler;
}
export interface ContentCardHandlers {
  handleCopyClick: MouseEventHandler;
  handleCutClick: MouseEventHandler;
  handleDeleteClick: MouseEventHandler;
}
export function ContentCard({content, contentKey, handlers, onClick}: ContentCardProps) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  if (onClick == null) {
    onClick = () => {
        navigate(`quiz/${contentKey}`);
    }
  }

  const handleEllipseClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setShowPopup(prev => !prev);
  }

  const handleOptionsClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    navigate("contentOptions/" + contentKey);
  }

  return (
    <div className={`card contentCard`} onClick={onClick}>
    {//<img src={ellipses} /* style={{ color:"red" }} */ className={styles.cardEllipseButton} alt="More options."/>
    }
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.cardEllipseButton} lucide lucide-ellipsis-icon lucide-ellipsis`} onClick={handleEllipseClick}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      <p className={styles.cardTitle}>{content.title}</p>

      {/* pop up menu*/}
      <div className={`${styles.popupMenu} ${showPopup && styles.popupShow}`}>
        <button onClick={handlers.handleCopyClick}>Copy</button>
        <button onClick={handlers.handleCutClick}>Cut</button>
        <button onClick={handlers.handleDeleteClick}>Delete</button>
        <button onClick={handleOptionsClick}>More options...</button>
      </div>
    </div>
  )
}

export default ContentCard
