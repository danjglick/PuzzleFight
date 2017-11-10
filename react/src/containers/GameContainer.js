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
		fetch('http://localhost:3000/api/v1/gamestates.json', {
			credentials: 'same-origin',
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		})
			.then(response => response.json())
			.then(body => {this.setState({level: newLevel}, ()=>this.resetGame())})
			.catch(function(error) {console.log(error)})
	}
	
	resetGame() {
		this.getAllTimeBest()
		this.getPersonalBest()
		if(!this.state.grid.includes('yellow')) {
			fetch('http://localhost:3000/api/v1/gamestates.json', {
				credentials: 'same-origin',
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			})
				.then(response => response.json())
				.then(body => {
					if((body[0].current_state.currentUser == 'daniel' && body[0].current_state.currentUser !== null)
					|| this.state.currentUser == null 
					) {
						var savedState = body[0].current_state
						this.setState(savedState)
					} else {
						this.setState({firstTime: true})
					}
				})
				.catch(function(error) {console.log(error)})
		}
		if(this.state.grid.includes('yellow') 
		|| this.state.firstTime == true) {
			this.setState({playMode: true, firstTime: false})
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
					}	else if(piece == 'red') {
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
		fetch('http://localhost:3000/api/v1/gamestates', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({currentState: this.state})
		})
			.then(response => response.json())
			.catch(function(error) {console.log(error)})
	}	
	
	getAllTimeBest() {
		fetch('http://localhost:3000/api/v1/scores', {
			credentials: 'same-origin',
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
		  .then(response => response.json())
		  .then(body => {
				var newAllTimeBest = 0
				for(var i=0; i<Object.keys(body.all_scores).length; i++) {
					var userScore = body.all_scores[i]
					if((userScore.level_id == this.state.level) 
					&& (newAllTimeBest == 0 || userScore.score < newAllTimeBest)) {
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
		  .catch(function(error) {console.log(error)})
	}
	
	getPersonalBest() {
		fetch('http://localhost:3000/api/v1/scores',{
			credentials: 'same-origin',
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
		  .then(response => response.json())
		  .then(body => {
				var newPersonalBest = 0
				for(var i=0; i<Object.keys(body.all_scores).length; i++) {
					var userScore = body.all_scores[i]
					if(userScore.user_id == body.current_user.id 
					&& userScore.level_id == this.state.level) {
						newPersonalBest = userScore.score
					}
				}
				this.setState({personalBest: newPersonalBest, currentUser: body.current_user.username})
			})
		  .catch(function(error) {console.log(error)})	
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
				if(e.keyCode == 37) var newSpot = oldSpot - 1
				else if(e.keyCode == 38) var newSpot = oldSpot - 8
				else if(e.keyCode == 39) var newSpot = oldSpot + 1
				else if(e.keyCode == 40) var newSpot = oldSpot + 8
				if(!(newSpot < 0 || newSpot > 63)) {
					this.handleBlues(grid, newSpot)
					this.handleReds(grid, newSpot)
					var newGrid = grid
					newGrid[newSpot] = 'yellow'
					newGrid[oldSpot] = 0
					var newCurrentScore = this.state.currentScore + 1
					this.setState({grid: newGrid, currentScore: newCurrentScore})
				}	
			}
		}
		fetch('http://localhost:3000/api/v1/gamestates', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({currentState: this.state})
		})
			.then(response => response.json())
			.catch(function(error) {console.log(error)})
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
			this.setState({bluesLeft: newBluesLeft})
		}
		if(newBluesLeft == 0) {
			let payload = JSON.stringify({
				currentScore: this.state.currentScore,
				level: this.state.level
			})
			fetch('http://localhost:3000/api/v1/scores', {
				credentials: 'same-origin',
	      method: 'POST',
	      headers: {'Content-Type': 'application/json'},
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
			  .catch(function(error) {console.log(error)})
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
			this.setState({currentScore: newCurrentScore})
		}
	}
			
	render() {
		var grid = this.state.grid.map(spot => {
			if(spot == 'yellow') {
				return(<h1 className='yellowSpot'></h1>)
			} else if(spot == 'blue') {
				return(<h1 className='blueSpot'></h1>)
			} else if(spot == 'red') {
				return(<h1 className='redSpot'></h1>)
			} else {
				return(<h1 className='spot'></h1>
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
				<div>{grid}</div>
			</div>
		)
	}
}
	
export default GameContainer