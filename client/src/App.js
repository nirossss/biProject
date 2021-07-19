import { useEffect, useState } from 'react';
import './App.css';
import MatchCard from './components/MatchCard';
import MyIcon from './components/MyIcon';

// 3.	Show UI as attached
// The links should open a new browser tab
// Add data from server

function App() {
    const [matchData, setMatchData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch('http://localhost:3001/get_investors_for_startup/1')
        const data = await res.json()

        if (data.match.length) {
            setMatchData(data.apply);
        } else {
            console.log('Error');
        }
    }

    const renderCards = () => {
        return matchData.map((data, i) => {
            return (<MatchCard key={i} data={data} />)
        })
    }

    return (
        <div className="App">
            <div className="header">
                <MyIcon />
                <div className="dashboard">Dashboard</div>
            </div>
            <div className='breadcrambs'>
                <div className='cramb inProgress'>
                    In progress (3)
                </div>
                <div className='cramb apply'>
                    Apply (6)
                </div>
            </div>
            <div className="cardContainer">
                {matchData.length && renderCards()}
            </div>
        </div>
    );
}

export default App;
