import { useState, type MouseEventHandler } from 'react';
import styles from './ContentCard.module.css';
// import { Ellipses } from './icons/Ellipses.tsx'
import { useNavigate } from 'react-router';
import type { Content, CardSetLink, Folder } from "@models/UserData";

// Component representing a file icon that could either be a card set or another
// folder
export interface ContentCardProps {
  content: Content,
  onClick: MouseEventHandler
}
export function ContentCard({content, onClick}: ContentCardProps) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  function redirect() {
    const csl = content as CardSetLink;
    const quizKey = csl.key;
    if (quizKey != null) {
      navigate(`quiz/${quizKey}`);
    }
  }

  const handleEllipseClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setShowPopup(prev => !prev);
  }

  const handleCopyClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    
  }

  const handleCutClick: MouseEventHandler = (e) => {
    e.stopPropagation();

  }

  const handleDeleteClick: MouseEventHandler = (e) => {
    e.stopPropagation();

  }

  const handleOptionsClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    navigate("contentOptions/" + quizKey);
  }

  return (
    <div className={`card ${styles.contentCard}`} onClick={quizKey != null ? redirect : onClick}>
    {//<img src={ellipses} /* style={{ color:"red" }} */ className={styles.cardEllipseButton} alt="More options."/>
    }
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.cardEllipseButton} lucide lucide-ellipsis-icon lucide-ellipsis`} onClick={handleEllipseClick}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      <p className={styles.cardTitle}>{name}</p>

      {/* pop up menu*/}
      <div className={`${styles.popupMenu} ${showPopup && styles.popupShow}`}>
        <button onClick={handleCopyClick}>Copy</button>
        <button onClick={handleCutClick}>Cut</button>
        <button onClick={handleDeleteClick}>Delete</button>
        <button onClick={handleOptionsClick}>More options...</button>
      </div>
    </div>
  )
}

export default ContentCard
