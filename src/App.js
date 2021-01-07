
import { useState } from 'react';
import './App.css';
import Game from './Game/Game';
import Intro from './Intro/Intro'

function App() {
  const [playing, setPlaying]=useState(false);
  const [player1, setPlayer1]=useState('');
  const [player2, setPlayer2]=useState('');

  const setUsernames=(username1, username2)=>{
    setPlaying(true);
    setPlayer1(username1);
    setPlayer2(username2);
  }

  const changePlayers = () =>{
    setPlaying(false);
    setPlayer1("");
    setPlayer2("");
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>Tic-Tac-Toe</h1>
      </header>
      {!playing &&
      <Intro 
        setUsernames={setUsernames}
        ></Intro>}
      {playing &&
      <Game 
        player1={player1}
        player2={player2}
        changePlayers={changePlayers}> 
      </Game>}
    </div>
  );
}

export default App;
