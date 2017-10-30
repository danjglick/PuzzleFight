import React from 'react'

class GridContainer extends React.Component {
	constructor(props) {
		super(props)
		this.initialState = {
			grid: Array(36).fill(null),
			currentScore: 0
		}
		this.state = this.initialState
		this.handleReds()
		this.resetGame()
		this.resetGame = this.resetGame.bind(this)
		this.movePlayer = this.movePlayer.bind(this)
		this.handleReds = this.handleReds.bind(this)
	}
	
	resetGame() {
		this.setState({
			grid: Array(36).fill(null),
			currentScore: 0
		}, () => {
			let takenSpots = [0]
			let gamepieces = ['yellow', 'blue', 'red']
			for(let gamepiece in gamepieces) {
				gamepiece = gamepieces[gamepiece]
				let randSpot = 0
				while(takenSpots.includes(randSpot)) {
					randSpot = Math.floor((Math.random() * 35) + 1)
				}
				takenSpots.push(randSpot)
				var newGrid = this.state.grid
				if(gamepiece == 'yellow') {
					newGrid[randSpot] = ':)'
				} else if(gamepiece == 'blue') {
					newGrid[randSpot] = '*'
				}	else if(gamepiece == 'red') {
					newGrid[randSpot] = '!'
				}
				this.setState({grid: newGrid})
				console.log(this.state)
			}
		})
	}
	
	movePlayer(e) {
		let arrows = [37, 38, 39, 40]
		if(arrows.includes(e.keyCode)) {
			for(let spot in this.state.grid) {
				spot = this.state.grid[spot]
				if(spot == ':)') {
					var oldSpot = parseInt(this.state.grid.indexOf(spot))
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
			this.handleReds(newSpot)
			let newGrid = this.state.grid
			newGrid[newSpot] = ':)'
			newGrid[oldSpot] = null
			this.setState({
				grid: newGrid,
				currentScore: this.state.currentScore + 1
			})
		}
	}
	
	handleReds(newSpot) {
		let grid = this.state.grid
		for(let spot in grid) {
			spot = grid[spot]
			if(spot == '!') {
				var redSpot = grid.indexOf(spot)
			}
		}
		if(newSpot == redSpot) {
			this.resetGame()
		}
	}
	
	render() {
		let grid = this.state.grid.map(gridbox => {
			return(
				<h1 className='grid'>{gridbox}</h1>
			)
		})
		return(
			<div>
				<button onClick={this.resetGame}>Start!</button>
				<input value='arrow keys to move' onKeyDown={this.movePlayer} />
				<h4>Moves: {this.state.currentScore}</h4>
				<div>{grid}</div>
			</div>
		)
	}
}
	
export default GridContainer