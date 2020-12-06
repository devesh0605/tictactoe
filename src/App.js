import React,{useState} from "react";
import Board from './components/Board'
import { calculateWinner } from "./helpers";
import './styles/root.scss'

const App = () =>{
  const [board,setBoard] = useState(Array(9).fill(null));
  const [isXnext, setIsNext]=useState(false);

  const winner = calculateWinner(board); 
  const message = winner 
  ? 'Winner is '+winner
  : 'Next player is '+(isXnext ? 'X' : 'O');
  const handleSquareClick = position =>{
      if (board[position]||winner){
          return;
      }

      setBoard((prev)=>{
          return prev.map((Square,pos)=>{
              if (pos==position){
                  return isXnext ? 'X':'O';
              }
              return Square;

          })
      })
      setIsNext((prev)=>!prev)

  };
  return(
    <div className="app">
      
    <h1>TIC TAC TOE</h1>
    <h2> {message} </h2>
    <Board board={board}handleSquareClick={handleSquareClick}/>
    </div>

  )
}

export default App;
