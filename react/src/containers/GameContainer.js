import React from 'react'
import StatusBarContainer from './StatusBarContainer'

class GameContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			grid: Array(36).fill(null),
			level: 1,
			currentScore: 0,
			bluesLeft: null
		}
		this.resetGame = this.resetGame.bind(this)
		this.movePlayer = this.movePlayer.bind(this)
		this.handleBlues = this.handleBlues.bind(this)
		this.handleReds = this.handleReds.bind(this)
	}

	resetGame() {
		var newGrid = Array(36).fill(null)
		var takenSpots = [0]
		var yellowRandSpot = 0
		while(takenSpots.includes(yellowRandSpot)) {
			yellowRandSpot = Math.floor((Math.random() * 36))
		}
		newGrid[yellowRandSpot] = ':)'
		var pieces = ['blue', 'red']
		for(var i = 1; i <= this.state.level; i++) {
			for(var piece in pieces) {
				piece = pieces[piece]
				var randSpot = 0
				while(takenSpots.includes(randSpot)) {
					randSpot = Math.floor((Math.random() * 36))
				}
				takenSpots.push(randSpot)
				if(piece == 'yellow') {
					newGrid[randSpot] = ':)'
				} else if(piece == 'blue') {
					newGrid[randSpot] = '*'
				}	else if(piece == 'red') {
					newGrid[randSpot] = '!'
				}
			}
		}
		var newBluesLeft = this.state.level
		this.setState({
			grid: newGrid, 
			currentScore: 0, 
			bluesLeft: newBluesLeft
		})
	}	
		
	movePlayer(e) {
		var grid = this.state.grid;
		var arrows = [37, 38, 39, 40]
		if(arrows.includes(e.keyCode)) {
			for(var spot in grid) {
				spot = grid[spot]
				if(spot == ':)') {
					var oldSpot = parseInt(grid.indexOf(spot))
				}
			}
			if(e.keyCode == 37) {
				var newSpot = oldSpot - 1
			} else if(e.keyCode == 38) {
				var newSpot = oldSpot - 6
			}	else if(e.keyCode == 39) {
				var newSpot = oldSpot + 1
			}	else if(e.keyCode = 40) {
				var newSpot = oldSpot + 6
			}
			if(!(newSpot < 0 || newSpot > 35)) {
				this.handleBlues(grid, newSpot)
				this.handleReds(grid, newSpot)
				var newGrid = grid
				newGrid[newSpot] = ':)'
				newGrid[oldSpot] = null
				var newCurrentScore = this.state.currentScore + 1
				this.setState({
					grid: newGrid, 
					currentScore: newCurrentScore
				})
			}	
		}
	}
	
	handleBlues(grid, newSpot) {
		for(var spot in grid) {
			spot = grid[spot]
			if(spot == '*') {
				var blueSpot = grid.indexOf(spot)
			}
		}
		if(newSpot == blueSpot) {
			var newBluesLeft = this.state.bluesLeft - 1
			this.setState({bluesLeft: newBluesLeft},
				function() {
					if(this.state.bluesLeft == 0) {
						var newLevel = this.state.level + 1
						this.setState({level: newLevel}) 
						this.resetGame()
					}
				}
			)
		}
	}	
	
	handleReds(grid, newSpot) {
		for(var spot in grid) {
			spot = grid[spot]
			var redSpot
			if(spot == '!') {
				var redSpot = grid.indexOf(spot)
			}
			if(newSpot == redSpot) {
				this.resetGame()
			}	
		}
	}
		
	render() {
		var grid = this.state.grid.map(spot => {
			return(
				<h1 className='spot'>{spot}</h1>
			)
		})
		return(
			<div>
				<StatusBarContainer
					resetGame={this.resetGame} 
					movePlayer={this.movePlayer}
					level={this.state.level}
					currentScore={this.state.currentScore}
				/>
				<div className='grid'>{grid}</div>
			</div>
		)
	}
}
	
export default GameContainer