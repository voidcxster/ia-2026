import type { MouseEventHandler } from 'react';
import styles from './ContentCard.module.css';
// import { Ellipses } from './icons/Ellipses.tsx'
import { useNavigate } from 'react-router';

// Component representing a file icon that could either be a card set or another
// folder
export function ContentCard({name, link, onClick}: {name: string, link?: string, onClick?: MouseEventHandler}) {
  const navigate = useNavigate();
  function redirect() {
    if (link != null) {
      navigate(link);
    }
  }

  return (
    <div className={`card ${styles.contentCard}`} onClick={link != null ? redirect : onClick}>
    {//<img src={ellipses} /* style={{ color:"red" }} */ className={styles.cardEllipseButton} alt="More options."/>
    }
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.cardEllipseButton} lucide lucide-ellipsis-icon lucide-ellipsis`}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      <p className={styles.cardTitle}>{name}</p>
    </div>
  )
}

export default ContentCard
