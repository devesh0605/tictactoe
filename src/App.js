import React,{useState} from "react";
import Board from './components/Board'
import History from './components/History'
import { calculateWinner } from "./helpers";
import './styles/root.scss'

const App = () =>{
  const [history,setHistory] = useState([
    {board:Array(9).fill(null),isXnext:true},
  ]);

  const [currentMove,setCurrentMove]=useState(0);

  const current = history[currentMove];

  const winner = calculateWinner(current.board); 
  const message = winner 
  ? 'Winner is '+winner
  : 'Next player is '+(current.isXnext ? 'X' : 'O');
  const handleSquareClick = position =>{
      if (current.board[position]||winner){
          return;
      }

      setHistory(prev=>{

        const last =prev[prev.length-1];
          const newBoard= last.board.map((Square,pos)=>{
              if (pos==position){
                  return last.isXnext ? 'X':'O';
              }
              return Square;

          })
          return prev.concat({board:newBoard,isXnext: !last.isXnext});

      });
      setCurrentMove(prev=>prev+1)

  };
  const moveTo = (move) =>{
    setCurrentMove(move)
  }
  return(
    <div className="app">
      
    <h1>TIC TAC TOE</h1>
    <h2> {message} </h2>
    <Board board={current.board}handleSquareClick={handleSquareClick}/>
    <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>

  )
}

export default App;
