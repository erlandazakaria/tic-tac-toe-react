import { useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Game from './Components/Game';
import Status from './Components/Status';
import { useGameStatus } from "./Contexts/GameStatus";

function App() {
  const { changeP1, changeP2, changeTie } = useGameStatus();

  const updateScore = () => {
    changeP1(localStorage.getItem("TIKET_TICTACTOE_P1") ?? 0)
    changeP2(localStorage.getItem("TIKET_TICTACTOE_P2") ?? 0)
    changeTie(localStorage.getItem("TIKET_TICTACTOE_TIE") ?? 0)
  }

  useEffect(() => {
    updateScore();
  }, [])

  return (
    <Container 
      disableGutters 
      maxWidth="lg" 
      sx={{ 
        height: "100vh", 
        backgroundColor: "black",
        color: "white", 
        boxSizing: "border-box" 
      }}>
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        flex={1} 
        height="100%">
        <Game />
        <Status />
      </Box>
    </Container>
  );
}

export default App;
