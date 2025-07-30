import React from 'react'

const Scores = ({XScore, OScore }) => {
    
  return (
    <div className="scores">
      <p>Player X : {XScore}</p>
      <p>Player O : {OScore}</p>

    </div>
  )
}

export default Scores
