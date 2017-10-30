import React from 'react'

class GridContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			grid: Array(36).fill(),
			currentScore: 0,
			bluesLeft: 1,
			isWinner: 'false'
		}
		this.resetGame = this.resetGame.bind(this)
		this.populateBoard = this.populateBoard.bind(this)
		this.movePlayer = this.movePlayer.bind(this)
		this.handleBlues = this.handleBlues.bind(this)
		this.handleReds = this.handleReds.bind(this)
	}
	
	resetGame() {
		// 21-26 should be dryer: setState to intitalState
		this.setState({
			grid: Array(36).fill(null),
			currentScore: 0,
			bluesLeft: 1,
			isWinner: 'false'
		}, 
		this.populateBoard())
	}
	
	populateBoard() {
		let takenSpots = [0]
		let pieces = ['yellow', 'blue', 'red']
		for(let piece in pieces) {
			piece = pieces[piece]
			let randSpot = 0
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
			this.setState({grid: newGrid})
		}
	}
	
	movePlayer(e) {
		let grid = this.state.grid;
		let arrows = [37, 38, 39, 40]
		if(arrows.includes(e.keyCode)) {
			for(let spot in grid) {
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
				this.handleReds(grid, newSpot)
				this.handleBlues(grid, newSpot)
				let newGrid = grid
				newGrid[newSpot] = ':)'
				newGrid[oldSpot] = null
				this.setState({grid: newGrid, currentScore: this.state.currentScore + 1})
			}
		}
	}
	
	handleBlues(grid, newSpot) {
		for(let spot in grid) {
			spot = grid[spot]
			if(spot == '*') {
				var blueSpot = grid.indexOf(spot)
			}
		}
		if(newSpot == blueSpot) {
			this.setState(
				{bluesLeft: this.state.bluesLeft - 1},
				function() {
					if(this.state.bluesLeft == 0) {
						this.setState({isWinner: 'true'})
					}
				}
			)
		}
	}	
	
	handleReds(grid, newSpot) {
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
		let grid = this.state.grid.map(spot => {
			return(
				<h1 className='spot'>{spot}</h1>
			)
		})
		return(
			<div>
				<button onClick={this.resetGame}>Start!</button>
				<input value='arrow keys to move' onKeyDown={this.movePlayer} />
				<h4>Moves: {this.state.currentScore}</h4>
				<h4>Winner: {this.state.isWinner}</h4>
				<div>{grid}</div>
			</div>
		)
	}
}
	
export default GridContainer