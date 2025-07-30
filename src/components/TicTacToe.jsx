// 'handleTileClick(index)' fxn  is passed ('()=>{onTileClick(0)}' or 'onClick' ) not called in Tile.jsx and Board.jsx
// "Because if Event handler is calling then it fires every time when page re-renders, passing eventhandlers call
// only when user clicked " 
import { useState, useEffect } from "react";
import React from "react";
import Board from "./Board";
import GameOver from "./gameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import Scores from "./Scores";
import gameOverSoundAsset from "../sounds/game_over.mp3";
import clickSoundAsset from "../sounds/click.wav";

// Accessing Sounds 
const gameOverSound = new Audio(gameOverSoundAsset)
gameOverSound.volume = 0.2
const clickSound = new Audio(clickSoundAsset)
clickSound.volume= 0.5

const PLAYER_O = "O";
const PLAYER_X = "X";

const winningCombinations = [
  //rows
   {combo:[0,1,2], strikeClass:'strike-row-1'},
   {combo:[3,4,5], strikeClass:'strike-row-2'},
   {combo:[6,7,8], strikeClass:'strike-row-3'},

   //columns
   {combo:[0,3,6], strikeClass:'strike-column-1'},
   {combo:[1,4,7], strikeClass:'strike-column-2'},
   {combo:[2,5,8], strikeClass:'strike-column-3'},

   //diagonals
   {combo:[0,4,8], strikeClass:'strike-diagonal-1'},
   {combo:[2,4,6], strikeClass:'strike-diagonal-2'}
]

function checkWinner(tiles,setstrikeClass,setgameState,setXScore,setOScore){
  for(const {combo,strikeClass} of winningCombinations){
    const tileValue1 = tiles[combo[0]];     //combo[0,1,2] gives you position of tile
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];
    if(tileValue1!==null && tileValue1===tileValue2 && tileValue1===tileValue3){   //Winning condition
      setstrikeClass(strikeClass)
      if(tileValue1===PLAYER_X){
        setgameState(GameState.playerXWins)                //For gameOver component to display winner
        setXScore((prevScore) => prevScore + 1);           
      }else{
        setgameState(GameState.playerOWins)
        setOScore((prevScore) => prevScore + 1);
      }
      return ;                //return and end loop if any player wins              
    }                        // Here 'If' condition shows if any player wins
  }
  const areAllTilesFilledIn = tiles.every((tile)=>tile !== null);     //condition for draw
  if(areAllTilesFilledIn){                                           //if No one wins game after filling all tiles then draw
    setgameState(GameState.draw);
  }
}

const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null)); // tiles = array of 9 elements, stores the current state of the game board.
  const [playerTurn, setplayerTurn] = useState(PLAYER_X); //playerTurn = "X" or "O"
  const [strikeClass, setstrikeClass] = useState()
  const [gameState, setgameState] = useState(GameState.inProgress)
  const [XScore, setXScore] = useState(0)
   const [OScore, setOScore] = useState(0)

  /* `handleTileClick` updates the game board tiles when tile is clicked with the current player's symbol and
    toggles player turn between X and O */
  const handleTileClick = (index) => { 
    if(gameState !== GameState.inProgress){   //condition for if any player wins then tile is not clickable
      return;  }
    if (tiles[index] != null) {       // if tiles at position index is not null or tile is already filled, then return
      return;  }
      
    const newTiles = [...tiles];   // copy of the tiles array is created using the spread operator (...).
    newTiles[index] = playerTurn;  // tile at the specified index is updated with  current player's symbol (X or O)
    setTiles(newTiles);            //  updated newTiles array is passed to the setTiles function to update the state of the game board.
   
    if (playerTurn === PLAYER_X) {
      setplayerTurn(PLAYER_O);     // Toggle the Player Turn:
    } else {
      setplayerTurn(PLAYER_X); } 
  };

  {/* Reset button Logic */}
  const handleReset =()=>{
    setgameState(GameState.inProgress)
    setTiles(Array(9).fill(null))
    setplayerTurn(PLAYER_X)
    setstrikeClass(null)
  }
  {/* When any tile's state is changed from 0 to (X or O) then checkWinner fxn is called */}
  useEffect(() => {
    checkWinner(tiles,setstrikeClass,setgameState,setXScore,setOScore);
  }, [tiles])

  //Sound logic when tile is clicked and game over
  useEffect(()=>{
    if(tiles.some((tile) =>tile !== null)){
      clickSound.play()}
  },[tiles])
  useEffect(()=>{
    if(gameState!==GameState.inProgress){
      gameOverSound.play()
    }
  },[gameState])
  
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Scores XScore={XScore} OScore={OScore}/>
      <Board playerTurn={ playerTurn} tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass} />
      <GameOver gameState={gameState}/>
      <Reset gameState={gameState} onReset ={handleReset}/>
    </div>
  );
};
export default TicTacToe;
