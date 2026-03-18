import './ContentCard.css'
import { Ellipses } from './icons/Ellipses.tsx'
import { useNavigate } from 'react-router';

export function Card({name, link}: {name: string, link: string}) {
  const navigate = useNavigate();
  function redirect() {
    navigate(link);
  }

  return (
    <div className="card contentCard" onClick={redirect}>
    {//<img src={ellipses} /* style={{ color:"red" }} */ className="cardEllipseButton" alt="More options."/>
    }
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cardEllipseButton lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      <p className="cardTitle">{name}</p>
    </div>
  )
}

export default Card
