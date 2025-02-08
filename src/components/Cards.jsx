

export default function Cards({data, handleClick}) {
  return (
    <div>
       {data.map((d, i) => {
            return(
                <li key={i}>
                    <div className="card" onClick={() => {handleClick(d)}}>
                        <p>Name: {d.name}</p>
                        <img src={d.img} alt={`Image of ${d.name}`}/>
                    </div>
                </li>
            )
        })} 
    </div>
  )
}
