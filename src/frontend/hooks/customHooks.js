import { useContext, useState } from "react";

export const useActionQueue = () => {
  const [undoQueue, setUndoQueue] = useState([]);
  // console.log(undoQueue);
  function addToQ(val) {
    setUndoQueue((q) => [...q, val]);
    console.log(undoQueue);
  }
  // useEffect(() => {
  //   // setUndoQueue();
  // });
  return [undoQueue, addToQ];
};
// export const GameContext = .createContext({});
// interface GameState {
//   kicking_teamId: number;
//   agents: {
//     penalized: boolean;
//   }[];
// }

export const useGameState = () => {
  let initialState = {
    agents: [],
    kicking_teamId: -1,
  };
  const [gameState, setGameState] = useState(initialState);

  return [gameState, setGameState];
};
