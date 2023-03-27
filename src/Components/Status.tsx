import Box from '@mui/material/Box';

import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

import { useGameStatus } from '../Contexts/GameStatus';

function Status() {
  const { gameStatus } = useGameStatus();

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        minHeight: 200, 
        width: "100%",
        fontSize: {xs: 18, md: 28, lg: 40}
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box minHeight={50}>
          Player 1 (X)
        </Box>
        <Box>
          {gameStatus.p1}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
         TIE
        </Box>
        <Box>
          {gameStatus.tie}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
        Player 2 (O)
        </Box>
        <Box>
          {gameStatus.p2}
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          { gameStatus.turn === "P2" ? <GroupIcon fontSize="large" /> : <PersonIcon fontSize="large" /> }
        </Box>
        <Box sx={{fontSize: {xs: 14, md: 14, lg: 20}}}>
          { gameStatus.turn }
        </Box>
      </Box>
    </Box>
  )
}

export default Status;
