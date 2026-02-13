import './Card.css'

export function Card({name}: {name: string}) {
  return (
    <div className="card" onClick={}>
      <p>{name}</p>
      <img src=""/>
    </div>
  )
}

export default Card