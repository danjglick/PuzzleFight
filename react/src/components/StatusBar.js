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
      ...AllTimeBest:{props.allTimeBest}({props.usernameAllTimeBest} {props.dateAllTimeBest})
      ...PersonalBest:{props.personalBest}
      ...CurrentScore:{props.currentScore}
    </h4>
  )
}

export default StatusBar