import React from 'react'

class GridContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			grid: Array(36).fill(null),
			currentScore: 0,
			bluesLeft: 1,
			populateBoardNow: false,
			isWinner: 'false'
		}
		this.resetGame = this.resetGame.bind(this)
		this.initializeState = this.initializeState.bind(this)
		this.populateBoard = this.populateBoard.bind(this)
		this.movePlayer = this.movePlayer.bind(this)
		this.handleBlues = this.handleBlues.bind(this)
		this.handleReds = this.handleReds.bind(this)
	}

	resetGame() {
		new Promise((resolve, reject) => {
			this.initializeState()
			if(this.state == {
				populateBoardNow: true,
				grid: Array(36).fill(null),
				currentScore: 0,
				bluesLeft: 1,
				isWinner: 'false'
			}) {
				resolve()
			} else {
				reject()
			}
		}).then(() => {this.populateBoard()})
		.catch((err) => {
			console.log('error')
			this.setState({grid: Array(36).fill(null)})
			this.populateBoard()
		})
	}
	
	initializeState() {
		this.setState({
			populateBoardNow: true,
			grid: Array(36).fill(null),
			currentScore: 0,
			bluesLeft: 1,
			isWinner: 'false'
		})
	}
	
	populateBoard() {
		var takenSpots = [0]
		var pieces = ['yellow', 'blue', 'red']
		for(var piece in pieces) {
			piece = pieces[piece]
			var randSpot = 0
			while(takenSpots.includes(randSpot)) {
				randSpot = Math.floor((Math.random() * 35) + 1)
			}
			takenSpots.push(randSpot)
			var newGrid = this.state.grid
			if(piece == 'yellow') {
				newGrid[randSpot] = ':)'
			} else if(piece == 'blue') {
				newGrid[randSpot] = '*'
			}	else if(piece == 'red') {
				newGrid[randSpot] = '!'
			}
			this.setState({grid: newGrid, populateBoardNow: false})
		}
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
				var newGrid = grid
				newGrid[newSpot] = ':)'
				newGrid[oldSpot] = null
				var newScore = this.state.currentScore + 1
				this.setState({
					grid: newGrid, 
					currentScore: newScore
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
			var bluesLeft = this.state.bluesLeft - 1
			this.setState(
				{bluesLeft: bluesLeft},
				function() {
					if(this.state.bluesLeft == 0) {
						this.setState({isWinner: 'true'})
					}
				}
			)
		}
	}	
	
	handleReds(grid, newSpot) {
		for(var spot in grid) {
			spot = grid[spot]
			var redSpot = 100
			if(spot == '!') {
				var redSpot = grid.indexOf(spot)
			}
			if(newSpot == redSpot) {
				resetGame()
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
				<button onClick={this.resetGame}>Start!</button>
				<input value='arrow keys to move' onKeyDown={this.movePlayer} />
				<h4>Current Score: {this.state.currentScore}</h4>
				<h4>Winner: {this.state.isWinner}</h4>
				<div>{grid}</div>
			</div>
		)
	}
}
	
export default GridContainer