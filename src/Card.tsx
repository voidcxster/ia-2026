import './Card.css'
import { Ellipses } from './icons/Ellipses.tsx'

export function Card({name}: {name: string}) {
  function redirect() {
    window.location.assign("./Quiz.tsx")
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
