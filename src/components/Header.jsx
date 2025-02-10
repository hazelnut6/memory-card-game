import '../css/header.css'

export default function Header({score, bestScore}) {
  return (
    <header>
        <h1>Memory: Card game</h1>
        <p className="rule">
          <span className='instruction'>Instruction:</span> Click the cards <span className="line">once</span> to gain points. Avoid clicking the same cards <span className='line'>twice</span>, as this will result in a game over and reset your score to zero.  
        </p>
        <p className="scores">
          <span>Score: {score}</span> <br />
          <span>Best score: {bestScore}</span>
        </p>
    </header>
  )
}
