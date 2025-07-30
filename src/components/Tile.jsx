import React from "react";

const Tile = ({ className, value, onClick, playerTurn }) => {    //Here className is props from Board.jsx
  
   // Determine the hover class based on the value or playerTurn
   const hoverClass = value ? '' : playerTurn === 'X' ? 'x-hover' : 'o-hover';   
          //If Tile already has value (x or o) then HoverClass='' else If tile has no value, then
         //If playerTurn = 'X',hoverClass is set to 'x-hover' else set to 'o-hover'
 
  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
      {value}    {/* value is prop from Board.jsx that contains X or O */ }
    </div>
  );
};

export default Tile;
