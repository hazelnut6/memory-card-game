import '../css/cards.css'

export default function Cards({data, handleClick}) {
  return (
    <div className="board">
      {data.map((d, i) => {
        return(
          <li key={i}>
            <div className="card" onClick={() => {handleClick(d)}}>
              <img src={d.img} alt={`Image of ${d.name}`} className='pokeImg'/>
              <p className='pokeName'>{d.name}</p>
            </div>
          </li>
        )
      })} 
    </div>
  )
}
