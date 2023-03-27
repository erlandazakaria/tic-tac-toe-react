import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useGameStatus } from "../Contexts/GameStatus";

interface BoardParameter {
  index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 
}

const boardIndexBorderEnum = {
  0: { borderRight: true, borderBottom: true},
  1: { borderRight: true, borderBottom: true},
  2: { borderRight: false, borderBottom: true},
  3: { borderRight: true, borderBottom: true},
  4: { borderRight: true, borderBottom: true},
  5: { borderRight: false, borderBottom: true},
  6: { borderRight: true, borderBottom: false},
  7: { borderRight: true, borderBottom: false},
  8: { borderRight: false, borderBottom: false}
}

const winningCondition = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

const Board = ({index} : BoardParameter) => {
  const { gameStatus, changeTurn, addMove, resetMove, changeP1, changeP2, changeTie, resetTurn } = useGameStatus();
  const [ clickedBy, setClickedBy ] = useState("");

  useEffect(() => {
    resetAll();
  }, [gameStatus.p1, gameStatus.p2, gameStatus.tie])

  const resetAll = () => {
    resetMove();
    resetTurn();
    setClickedBy("");
  }

  const isWin = (currentMove: Array<number>) => {
    let result = false;
    winningCondition.forEach(win => {
      const intersection = currentMove.filter(move => win.includes(move));
      if (intersection.length === 3) {
        result = true;
      }
    });
    return result;
  }

  const checkWinStatus = () => {
    let currentMove = gameStatus.turn === "P2" ? [...gameStatus.p2Move, index] : [...gameStatus.p1Move, index];
    if (gameStatus.p1Move.length + gameStatus.p2Move.length + 1 === 9) {
      localStorage.setItem("TIKET_TICTACTOE_TIE", gameStatus.tie + 1);
      changeTie();
    }
    if (isWin(currentMove)) {
      if (gameStatus.turn === "P2") {
        localStorage.setItem("TIKET_TICTACTOE_P2", gameStatus.p2 + 1);
        changeP2();
      } else {
        localStorage.setItem("TIKET_TICTACTOE_P1", gameStatus.p1 + 1);
        changeP1();
      }
    }
  }

  const onBoardClick = () => {
    if (clickedBy === "") {
      checkWinStatus();
      setClickedBy(gameStatus.turn);
      addMove(index);
      changeTurn();
    }
  }

  return (
    <Grid 
      item xs={4} 
      height="33%" 
      sx={{ 
        display:"flex", 
        justifyContent: "center", 
        alignItems: "center", 
        borderRight: boardIndexBorderEnum[index].borderRight ? "3px solid white" : "", 
        borderBottom: boardIndexBorderEnum[index].borderBottom ? "3px solid white" : ""
      }}
      onClick={onBoardClick}
    >
      { clickedBy === "P1" ? <CloseOutlinedIcon sx={{fontSize: {xs: 100, sm: 150, md: 150}}} /> : null}
      { clickedBy === "P2" ? <CircleOutlinedIcon sx={{fontSize: {xs: 100, sm: 150, md: 150}}} /> : null}
    </Grid>
  )
}

export default Board;
