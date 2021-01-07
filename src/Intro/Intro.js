
import { useState } from 'react';
import './Intro.css';

function Intro({setUsernames}) {
    const [player1, setPlayer1]=useState('');
    const [player2, setPlayer2]=useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        setUsernames(player1, player2);
    }
  return (
      <>
    <form onSubmit={handleSubmit}>
        <input 
            className="m-3" 
            type="text" 
            name="player2" 
            placeholder="Player 1" 
            onChange= {e => setPlayer1(e.target.value)} 
            required/>
        vs
        <input 
            className="m-3" 
            type="text" 
            name="player2" 
            placeholder="Player 2" 
            onChange= {e => setPlayer2(e.target.value)} 
            required/>
        <button 
            className="btn btn-primary d-block mx-auto m-3" 
            type="submit" > 
            Play </button>
        </form>
        </>
  );
}

export default Intro;
