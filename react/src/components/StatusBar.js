import React from 'react'

const StatusBar = (props) => {
  return(
    <h4 className='statusBar'>
      <button 
        className='statusBar'
        id='column1' 
        onClick={props.resetGame}
      >Start!
      </button>
      ...Level:{props.level}
      ...AllTimeBest:{props.allTimeBest}
      ...PersonalBest:{props.personalBest}
      ...CurrentScore:{props.currentScore}
      ...BluesLeft:{props.bluesLeft}
    </h4>
  )
}

export default StatusBar