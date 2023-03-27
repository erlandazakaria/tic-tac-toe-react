import { createContext, useReducer, useMemo, useContext } from "react";

const initialGameStatusState = {
  turn: "P1",
  p1: 0,
  p2: 0,
  tie: 0,
  p1Move: [],
  p2Move: []
};

const GameStatusContext = createContext();

function GameStatusReducer(state, action) {
  switch (action.type) {
    case "CHANGE_TURN": {
      return Object.assign({}, state, {
        ...state,
        turn: state.turn === "P1" ? "P2" : "P1"
      })
    }
    case "RESET_TURN": {
      return Object.assign({}, state, {
        ...state,
        turn: "P1"
      })
    }
    case "CHANGE_P1": {
      return Object.assign({}, state, {
        ...state,
        p1: action.payload ? parseInt(action.payload, 10) : state.p1 + 1
      })
    }
    case "CHANGE_P2": {
      return Object.assign({}, state, {
        ...state,
        p2: action.payload ? parseInt(action.payload, 10) : state.p2 + 1
      })
    }
    case "CHANGE_TIE": {
      return Object.assign({}, state, {
        ...state,
        tie: action.payload ? parseInt(action.payload, 10) : state.tie + 1
      })
    }
    case "ADD_MOVE": {
      if (state.turn === "P2") {
        return Object.assign({}, state, {
          ...state,
          p2Move: [...state.p2Move, action.payload]
        })
      } else {
        return Object.assign({}, state, {
          ...state,
          p1Move: [...state.p1Move, action.payload]
        })
      }
    }
    case "RESET_MOVE": {
      return Object.assign({}, state, {
        ...state,
        p1Move: [],
        p2Move: []
      })
    }
    default: {
      throw new Error(`Unhandled type}`);
    }
  }
}

function GameStatusProvider(props) {
  const [state, dispatch] = useReducer(GameStatusReducer, initialGameStatusState);
  const value = useMemo(() => ({state, dispatch}), [state]);

  return (
    <GameStatusContext.Provider value={value} {...props} />
  );
}

function useGameStatus() {
  const context = useContext(GameStatusContext);
  if (!context) {
    throw new Error(`useGameStatus must be used within a GameStatusProvider`);
  }

  const changeTurn = () => {
    context.dispatch({ type: "CHANGE_TURN"})
  };

  const changeP1 = (payload) => {
    context.dispatch({ type: "CHANGE_P1", payload })
  };

  const changeP2 = (payload) => {
    context.dispatch({ type: "CHANGE_P2", payload })
  };

  const changeTie = (payload) => {
    context.dispatch({ type: "CHANGE_TIE", payload })
  };

  const addMove = (payload) => {
    context.dispatch({ type: "ADD_MOVE", payload })
  };

  const resetMove = () => {
    context.dispatch({ type: "RESET_MOVE" })
  };

  const resetTurn = () => {
    context.dispatch({ type: "RESET_TURN" })
  };

  return { gameStatus: context.state, changeTurn, changeP1, changeP2, changeTie, addMove, resetMove, resetTurn };
}

export { GameStatusProvider, useGameStatus}
