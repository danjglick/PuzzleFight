import React from 'react'

const StatusBarContainer = (props) => {
  return(
    <h4 className='statusBar'>
      <button 
        className='statusBar' 
        onClick={props.resetGame}
      >
      Start!
      </button>
      ...Level:{props.level}
      ...AllTimeBest{props.allTimeBest}
      ...PersonalBest:{props.personalBest}
      ...CurrentScore:{props.currentScore}
    </h4>
  )
}

export default StatusBarContainer