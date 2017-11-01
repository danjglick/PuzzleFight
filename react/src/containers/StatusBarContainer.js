import React from 'react'

const StatusBarContainer = (props) => {
  return(
    <h4 className='statusBar'>
      <button className='statusBar' onClick={props.resetGame}>Start!</button>
      <input className='statusBar' value='arrow keys to move' onKeyDown={props.movePlayer} />
        CurrentScore:{props.currentScore}...
        Level: {props.level}
    </h4>
  )
}

export default StatusBarContainer