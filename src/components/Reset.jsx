import React from "react";
import GameState from "./GameState";    

const Reset = ({ gameState, onReset }) => {
  if (gameState === GameState.inProgress) {     //check if game state is in progress then do nothing and return
    return;
  }
  return (
    <button onClick={onReset} className="reset-button">  {/* onReset fxn (prop) is accessed from TicTacToe.jsx */}
      Play Again                                         {/* that sets all Tiles value null and gamestate in progress*/}
    </button>
  );
};

export default Reset;
