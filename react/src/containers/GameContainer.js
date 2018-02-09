import React from 'react'
import StatusBarContainer from './StatusBarContainer'

class GameContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			grid: Array(64).fill(0),
			level: 1,
			allTimeBest: 0,
			personalBest: 0,
			currentScore: 0,
			bluesLeft: 0,
			playMode: false,
			usernameAllTimeBest: 'n/a',
			dateAllTimeBest: 'n/a',
			firstTime: false,
			currentUser: null
		}
		this.changeLevel = this.changeLevel.bind(this)
		this.resetGame = this.resetGame.bind(this)
		this.getAllTimeBest = this.getAllTimeBest.bind(this)
		this.getPersonalBest = this.getPersonalBest.bind(this)
		this.movePlayer = this.movePlayer.bind(this)
		this.handleBlues = this.handleBlues.bind(this)
		this.handleReds = this.handleReds.bind(this)
	}
	
	componentWillMount() {
		document.addEventListener('keydown', this.movePlayer)
	}
	
	changeLevel(newLevel) {
		fetch('/api/v1/gamestates.json', {
			credentials: 'same-origin',
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => response.json())
			.then(body => {
				this.setState(
					{ level: newLevel }, 
					() => this.resetGame()
				)
			})
			.catch(function(error) {
				console.log(error)
			})
	}
	
	resetGame() {
		this.getAllTimeBest()
		this.getPersonalBest()
		if(!this.state.grid.includes('yellow')) {
			fetch('/api/v1/gamestates.json', {
				credentials: 'same-origin',
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			})
				.then(response => response.json())
				.then(body => {
					console.log(!!this.state.currentUser)
					if(
						// below line evalues to true
						body[0].current_state.currentUser == this.state.currentUser 
						// below 2 lines evaluates to false
						&& body[0].current_state.grid.includes('yellow')
						&& !!this.state.currentUser
					) {
						var savedState = body[0].current_state
						this.setState(savedState)
					} else {
						this.setState({ firstTime: true })
					}
				})
				.catch(function(error) {
					console.log(error)
				})
		}
		if(this.state.grid.includes('yellow') || this.state.firstTime == true) {
			this.setState({
				playMode: true, 
				firstTime: false
			})
			var newGrid = Array(64).fill(0)
			var takenSpots = [0]
			var yellowRandSpot = 0
			while(takenSpots.includes(yellowRandSpot)) {
				yellowRandSpot = Math.floor((Math.random() * 64))
			}
			newGrid[yellowRandSpot] = 'yellow'
			takenSpots.push(yellowRandSpot)
			var pieces = ['blue', 'red']
			for(var i = 1; i <= this.state.level; i++) {
				for(var piece in pieces) {
					piece = pieces[piece]
					var randSpot = 0
					while(takenSpots.includes(randSpot)) {
						randSpot = Math.floor((Math.random() * 64))
					}
					takenSpots.push(randSpot)
					if(piece == 'yellow') {
						newGrid[randSpot] = 'yellow'
					} else if(piece == 'blue') {
						newGrid[randSpot] = 'blue'
					} else if(piece == 'red') {
						newGrid[randSpot] = 'red'
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
		fetch('/api/v1/gamestates', {
			credentials: 'same-origin',
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ currentState: this.state })
		})
			.then(response => response.json())
			.catch(function(error) {
				console.log(error)
			})
	}	
	
	getAllTimeBest() {
		fetch('/api/v1/scores.json', {
			credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
		  .then(response => response.json())
		  .then(body => {
				var newAllTimeBest = 0
				for(var i=0; i<Object.keys(body.all_scores).length; i++) {
					var userScore = body.all_scores[i]
					if(
						userScore.level_id == this.state.level 
						&& (newAllTimeBest == 0 || userScore.score < newAllTimeBest) 
					) {
						newAllTimeBest = userScore.score
						var newUsernameAllTimeBest = userScore.username
						var newDateAllTimeBest = userScore.created_at.slice(0, 4)
						this.setState({
							allTimeBest: newAllTimeBest, 
							usernameAllTimeBest: newUsernameAllTimeBest,
							dateAllTimeBest: newDateAllTimeBest
						})
					}
				}
				if(newAllTimeBest == 0) {
					this.setState({
						allTimeBest: 0, 
						usernameAllTimeBest: 'n/a',
						dateAllTimeBest: 'n/a'
					})
				}
			})
		  .catch(function(error) {
				console.log(error)
			})
	}
	
	getPersonalBest() {
		fetch('/api/v1/scores', {
			credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
		  .then(response => response.json())
		  .then(body => {
				var newPersonalBest = 0
				var newCurrentUser = null
				if(body.current_user) {
					newCurrentUser = body.current_user.username
					for(var i=0; i<Object.keys(body.all_scores).length; i++) {
						var userScore = body.all_scores[i]
						if(userScore.user_id == body.current_user.id 
						&& userScore.level_id == this.state.level) {
							newPersonalBest = userScore.score
						}
					}
				}
				this.setState({
					personalBest: newPersonalBest, 
					currentUser: newCurrentUser
				})
			})
		  .catch(function(error) {
				console.log(error)
			})	
	}
	
	movePlayer(e) {
		if(this.state.playMode == true) {
			var grid = this.state.grid;
			var arrows = [37, 38, 39, 40]
			if(arrows.includes(e.keyCode)) {
				for(var spot in grid) {
					spot = grid[spot]
					if(spot == 'yellow') {
						var oldSpot = parseInt(grid.indexOf(spot))
					}
				}
				if(e.keyCode == 37) {
					var newSpot = oldSpot - 1
				} else if(e.keyCode == 38) {
					var newSpot = oldSpot - 8
				} else if(e.keyCode == 39) {
					var newSpot = oldSpot + 1
				} else if(e.keyCode == 40) {
					var newSpot = oldSpot + 8
				}
				if(!(newSpot < 0 || newSpot > 63)) {
					this.handleBlues(grid, newSpot)
					this.handleReds(grid, newSpot)
					var newGrid = grid
					newGrid[newSpot] = 'yellow'
					newGrid[oldSpot] = 0
					var newCurrentScore = this.state.currentScore + 1
					this.setState({
						grid: newGrid, 
						currentScore: newCurrentScore
					})
				}	
			}
		}
		fetch('/api/v1/gamestates', {
			credentials: 'same-origin',
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ currentState: this.state })
		})
			.then(response => response.json())
			.catch(function(error) {
				console.log(error)
			})
	}
	
	handleBlues(grid, newSpot) {
		var blueSpots = []
		for(var i in grid) {
			var spot = grid[i]
			if(spot == 'blue') {
				blueSpots.push(parseInt(i))
			}
		}
		if(blueSpots.includes(newSpot)) {
			var newBluesLeft = this.state.bluesLeft - 1
			this.setState({ bluesLeft: newBluesLeft })
		}
		if(newBluesLeft == 0) {
			let payload = JSON.stringify({
				currentScore: this.state.currentScore,
				level: this.state.level
			})
			fetch('/api/v1/scores.json', {
				credentials: 'same-origin',
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					level: this.state.level, 
					score: this.state.currentScore
				})
	    })
		  	.then(response => response.json())
				.then(body => {
					this.getAllTimeBest()
					this.getPersonalBest()
				})
			  .catch(function(error) {
					console.log(error)
				})
		}
	}	
	
	handleReds(grid, newSpot) {
		var redSpots = []
		for(var i in grid) {
			var spot = grid[i]
			if(spot == 'red') {
				redSpots.push(parseInt(i))
			}
		}
		if(redSpots.includes(newSpot)) {
			var randNum = Math.floor((Math.random() * 5) + 1)
			var newCurrentScore = this.state.currentScore + randNum
			this.setState({ currentScore: newCurrentScore })
		}
	}
			
	render() {
		var grid = this.state.grid.map(spot => {
			if(spot == 'yellow') {
				return(<div className='yellowSpot'></div>)
			} else if(spot == 'blue') {
				return(<div className='blueSpot'></div>)
			} else if(spot == 'red') {
				return(<div className='redSpot'></div>)
			} else {
				return(<div className='spot'></div>
			)}
		})
		return(
			<div>
				<StatusBarContainer
					resetGame={this.resetGame} 
					movePlayer={this.movePlayer}
					level={this.state.level}
					allTimeBest={this.state.allTimeBest}
					personalBest={this.state.personalBest}
					currentScore={this.state.currentScore}
					usernameAllTimeBest={this.state.usernameAllTimeBest}
					dateAllTimeBest={this.state.dateAllTimeBest}
					changeLevel={this.changeLevel}
					grid={this.state.grid}
				/>
				<div className='grid'>{grid}</div>
			</div>
		)
	}
}
	
export default GameContainer