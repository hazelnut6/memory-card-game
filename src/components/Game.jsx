import { useState, useEffect } from 'react'
import Header from './Header.jsx';
import Cards from './Cards.jsx';
import '../css/game.css'

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
        } else if(score === 10) {
            alert('YOU WIN🎉')
            setScore(0);
            setClicked([]);
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
            <div className='container'>
                <div className="header">
                    <Header score={score} bestScore={bestScore} />
                </div>
                <div className="deck">
                    <ul>
                        <Cards data={data} handleClick={handleClick} />
                    </ul>
                </div>
            </div>
        )
    }

    return null
}
