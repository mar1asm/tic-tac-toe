import { useState } from 'react';
import './Game.css';
import Square from './Square/Square'

function Game({ player1, player2, changePlayers}) {
  var line = [[], [], []];
  const [table, setTable] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
  const [turn, setTurn]=useState(0);
  const [winnerText, setWinnerText]=useState('');
  const [gameOver, setGameOver]=useState(false);
  const [score1, setScore1]=useState(0);
  const [score2, setScore2]=useState(0);

  const checkWinner = pos => { //-1 daca nu a castigat nimeni, 0 daca nu mai sunt locuri libere, 1 daca a castigat cineva
    if (pos % 3 === 0){ //coloana 1
      if (table[0]===table[3] && table [0]===table[6]) //pe coloana
        return 1;
      if (table[pos]===table[pos+1] && table[pos]===table[pos+2]) //pe linie
        return 1;
      if (pos===0 && table[0]===table[4] && table[0]===table[8]) //diagonale
        return 1;
      if (pos===6 && table[6]===table[4] && table[6]===table[2])
        return 1;
    }
    if (pos % 3 === 1){ //coloana 2
      if (table[1]===table[4] && table [1]===table[7]) //pe coloana
        return 1;
      if (table[pos]===table[pos+1] && table[pos]===table[pos-1]) //pe linie
        return 1;
      if (pos===4 && table[0]===table[4] && table[0]===table[8]) //diagonale
        return 1;
      if (pos===4 && table[6]===table[4] && table[6]===table[2])
        return 1;
    }
    if (pos % 3 === 2){ //coloana 3
      if (table[2]===table[5] && table [2]===table[8]) //pe coloana
        return 1;
      if (table[pos]===table[pos-1] && table[pos]===table[pos-2]) //pe linie
        return 1;
      if (pos===2 && table[2]===table[4] && table[2]===table[6]) //diagonale
        return 1;
      if (pos===8 && table[8]===table[4] && table[8]===table[0])
        return 1;
    }
    let full = true;
    for (let i=0; i<9; i++)
      if (table[i]===-1){
        full=false;
        break;
      }
      return full? 0: -1;
  }

  const onStartGame = () => {
    setTable([-1, -1, -1, -1, -1, -1, -1, -1, -1]);
    setTurn(0);
    setGameOver(false);
  }

  const onGameOver = isDraw => {
    setGameOver(true);
    if (isDraw) {
        setWinnerText("Egalitate");
    } else {
      if (turn){
        setWinnerText(`${player2} a castigat`);
        setScore2(score2+1);
      } else {
        
        setWinnerText(`${player1} a castigat`);
        setScore1(score1+1);

      }
    }
  }

  const handleClick = pos => {
    if (gameOver)
      return;
    if (table[pos] != -1)
      return;
      let newTable = table;
      newTable[pos]=turn;
      setTable([...newTable]);
    let winner=checkWinner(pos);
    
    setTurn(1-turn);
    if (winner===-1){
      setTurn(1-turn);
      return;

    }
    if (winner===1)
      onGameOver(false); else
      onGameOver(true);
      
      setTurn(1-turn); 
  }

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      line[i].push(<Square 
                      key={i * 3 + j} 
                      pos={i * 3 + j} 
                      handleClick={handleClick} 
                      content={table[i*3+j] === 0? "X" : table[i*3+j] === 1? "O":""} 
                      />)
  return (
    <>
      <div className="info mb-3">
        {
         gameOver && <div className="outcome p-2">
          {winnerText}
          </div>
       }
        <div className="score">
          {player1} {score1} : {score2} {player2}
        </div>
       
      </div>
      <div className="board">
        <div className="line1">
          {line[0]}
        </div>
        <div className="line2">
          {line[1]}
        </div>
        <div className="line3">
          {line[2]}
        </div>
      </div>
      {
        gameOver &&
        <>
        <button className="btn btn-default p-3" onClick={onStartGame}>
          Play again
        </button>
        <button className="btn btn-default p-3" onClick={changePlayers}>
          Change players
        </button>
        </>
      }
    </>
  );
}

export default Game;