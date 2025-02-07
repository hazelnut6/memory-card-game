import { useState, useEffect } from 'react'

export default function Game() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clicked, setClicked] = useState([]);

    //Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';
                const response = await fetch(URL);

                if(!response.ok) {
                    throw new error(`ERROR: ${response.status}`)
                }

                const json = await response.json();
                setData(
                    json.results.map((pokemon, index) => {
                        let id = index + 1;
                        let name = pokemon.name;
                        let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                        return { id, name, img };
                    })
                );
            }
            catch(error) {
                setError(error);
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    function handleClick(item) {
        setData(random(data));

        if(!clicked.includes(item.id)) {
            setClicked([...clicked, item.id]);
            setScore(score + 1);
        } else {
            alert('GAME OVER💀💀💀');
            setScore(0);
            setClicked([]);
        }

        if(score > bestScore) {
            setBestScore(score);
        }
    }

    //Randomize the array
    function random(arr) {
        const newArray = [...arr];
        for(let i = newArray.length - 1; i > 0; i--) {
            const randomize = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[randomize]] = [newArray[randomize], newArray[i]];
        }
        return newArray;
    }

    //Fetching data
    if(loading) {
        return(
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }

    //Unsuccessfully fecthed data
    if(error) {
        <div>
            <h3>Error: {error.message}</h3>
        </div>
    }

    //Successfully fetched data
    if(data) {
        return (
            <div>
                <div className="header">
                    <h1>Memory card game</h1>
                    <p className="instructions">
                        Instruction: Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laudantium totam saepe incidunt assumenda ex quasi in placeat nam. Eum omnis ipsum ut dolorem, error amet reprehenderit aspernatur dolores laborum.
                    </p>
                    <p className="scores">
                        <span>Score: {score}</span> <br />
                        <span>Best score: {bestScore}</span>
                    </p>
                </div>
                <div className="deck">
                    <ul>
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
                    </ul>
                </div>
            </div>
        )
    }

    return null
}
