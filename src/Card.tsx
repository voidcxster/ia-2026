import './Card.css'
import { Ellipses } from './icons/Ellipses.tsx'
import { useNavigate } from 'react-router';

export function Card({name, link}: {name: string, link: string}) {
  const navigate = useNavigate();
  function redirect() {
    navigate(link);
  }

  return (
    <div className="card" onClick={redirect}>
    {//<img src={ellipses} /* style={{ color:"red" }} */ className="cardEllipseButton" alt="More options."/>
    }
      <Ellipses />
      <p className="cardTitle">{name}</p>
    </div>
  )
}

export default Card
