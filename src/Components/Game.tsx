import Grid from '@mui/material/Grid';

import Board from './Board';

function Game() {
  
  return (
    <Grid 
      container 
      spacing={0} 
      justifyContent="center" 
      alignItems="center" 
      sx={{
        height: "100%", 
        textAlign: "center", 
        padding: 2
      }}
    >
      <Board index={0} />
      <Board index={1} />
      <Board index={2} />
      <Board index={3} />
      <Board index={4} />
      <Board index={5} />
      <Board index={6} />
      <Board index={7} />
      <Board index={8} />
    </Grid>
  )
}

export default Game;
