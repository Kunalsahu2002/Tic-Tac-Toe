import React from "react";
import Tile from "./Tile";
import Strike from "./Strike";

const Board = ({tiles, onTileClick, playerTurn, strikeClass}) => {    //tiles is prop from TicTacToe.jsx 
  return (                                                             // onTileClick is prop from TicTacToe.jsx component
    <>
    <div className="board">
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(0)}} value={tiles[0]} className="right-border bottom-border" />   
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(1)}} value={tiles[1]} className="right-border bottom-border" /> {/* tiles[1] = value(X or O) in this tile */}
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(2)}} value={tiles[2]}  className=" bottom-border"/>
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(3)}} value={tiles[3]}  className="right-border bottom-border"/>
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(4)}} value={tiles[4]}  className="right-border bottom-border"/>
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(5)}} value={tiles[5]}  className="bottom-border"/>
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(6)}} value={tiles[6]}  className="right-border "/>
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(7)}} value={tiles[7]}  className="right-border "/>
      <Tile playerTurn={ playerTurn} onClick={()=>{onTileClick(8)}} value={tiles[8]}  />

      <Strike strikeClass={strikeClass} />
    </div>
    </>
  );
};
export default Board;
