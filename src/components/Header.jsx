

export default function Header({score, bestScore}) {
  return (
    <div>
        <h1>Memory card game</h1>
        <p className="instructions">
            Instruction: Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laudantium totam saepe incidunt assumenda ex quasi in placeat nam. Eum omnis ipsum ut dolorem, error amet reprehenderit aspernatur dolores laborum.
        </p>
        <p className="scores">
            <span>Score: {score}</span> <br />
            <span>Best score: {bestScore}</span>
        </p>
    </div>
  )
}
