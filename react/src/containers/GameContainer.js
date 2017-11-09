import React from 'react'
import StatusBar from '../Components/StatusBar'

class GameContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			grid: Array(64).fill(null),
			level: 10,
			allTimeBest: 0,
			personalBest: 0,
			currentScore: 0,
			bluesLeft: 0,
			playMode: false,
			usernameAllTimeBest: 'username',
			dateAllTimeBest: 'date'
		}
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
	
	resetGame() {
		//GET this.state from db (POSTED at beginning of movePlayer). setState to response body
		// fetch('http://localhost:3000/api/v1/gamestates', {
		// 	credentials: 'same-origin',
		// 	method: 'GET',
		// 	headers: {'Content-Type': 'application/json'}
		// })
		// 	.then(response => {
		// 		if(response.ok) {
		// 			return response
		// 		} else {
		// 			let errorMessage = `${response.status} (${response.statusText})`
		// 			let error = new Error(errorMessage)
		// 			throw(error)
		// 		}
		// 	})
		// 	.then(response => response.json())
		// 	.then(body => {this.setState(body)})
		// 	.catch(error => console.error(`Error in fetch: ${error.message}`))
		//may have to delete the following 2 function calls
		this.getAllTimeBest()
		this.getPersonalBest()
		this.setState({playMode: true})
		var newGrid = Array(64).fill(null)
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
	
	getAllTimeBest() {
		fetch('http://localhost:3000/api/v1/scores', {
			credentials: 'same-origin',
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
		  .then(response => {
		    if(response.ok) {
					return response
				} else {
		      let errorMessage = `${response.status} (${response.statusText})`
		      let error = new Error(errorMessage)
		      throw(error)
		    }
		  })
		  .then(response => response.json())
		  .then(body => {
				var newAllTimeBest = 0
				for(var i=0; i<Object.keys(body.all_scores).length; i++) {
					var userScore = body.all_scores[i]
					if((userScore.level_id == this.state.level) 
					&& (userScore.score < newAllTimeBest || newAllTimeBest == 0)) {
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
			})
		  .catch(error => console.error(`Error in fetch: ${error.message}`))
	}
	
	getPersonalBest() {
		fetch('http://localhost:3000/api/v1/scores',{
			credentials: 'same-origin',
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
		  .then(response => {
		    if(response.ok) {
					return response
				} else {
		      let errorMessage = `${response.status} (${response.statusText})`
		      let error = new Error(errorMessage)
		      throw(error)
		    }
		  })
		  .then(response => response.json())
		  .then(body => {
				var newPersonalBest = 0
				for(var i=0; i<Object.keys(body.all_scores).length; i++) {
					var userScore = body.all_scores[i]
					if(userScore.user_id == body.current_user.id && userScore.level_id == this.state.level) {
						newPersonalBest = userScore.score
					}
				}
				this.setState({personalBest: newPersonalBest})
			})
		  .catch(error => console.error(`Error in fetch: ${error.message}`))		
	}
	
	movePlayer(e) {
		fetch('http://localhost:3000/api/v1/gamestates', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({currentState: this.state})
		})
			.then(response => {
				if (response.ok) {return response} 
				else {
					let errorMessage = `${response.status} (${response.statusText})`
					let error = new Error(errorMessage);
					throw(error)
				}
			})
			.then(response => {response.json()})
			.catch(error => console.error(`Error in fetch: ${error.message}`))
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
				}	else if(e.keyCode == 39) {
					var newSpot = oldSpot + 1
				}	else if(e.keyCode == 40) {
					var newSpot = oldSpot + 8
				}
				if(!(newSpot < 0 || newSpot > 63)) {
					this.handleBlues(grid, newSpot)
					this.handleReds(grid, newSpot)
					var newGrid = grid
					newGrid[newSpot] = 'yellow'
					newGrid[oldSpot] = null
					var newCurrentScore = this.state.currentScore + 1
					this.setState({
						grid: newGrid, 
						currentScore: newCurrentScore
					})
				}	
			}
		}
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
			  .then(response => {
			    if (response.ok) {return response} 
					else {
			      let errorMessage = `${response.status} (${response.statusText})`
			      let error = new Error(errorMessage);
			      throw(error)
			    }
			  })
			  .then(response => {response.json()})
				.then(body => {
					this.getAllTimeBest()
					this.getPersonalBest()
				})
			  .catch(error => console.error(`Error in fetch: ${error.message}`))
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
			var randNum = Math.floor((Math.random() * 10))
			var newCurrentScore = this.state.currentScore + randNum
			this.setState({currentScore: newCurrentScore})
		}
	}
			
	render() {
		var grid = this.state.grid.map(spot => {
			if(spot == 'yellow') {
				spot = null
				return(<h1 className='yellowSpot'>{spot}</h1>)
			} else if(spot == 'blue') {
				spot = null
				return(<h1 className='blueSpot'>{spot}</h1>)
			} else if(spot == 'red') {
				spot = null
				return(<h1 className='redSpot'>{spot}</h1>)
			} else {
				return(<h1 className='spot'>{spot}</h1>
			)}
		})
		return(
			<div>
				<StatusBar
					resetGame={this.resetGame} 
					movePlayer={this.movePlayer}
					level={this.state.level}
					allTimeBest={this.state.allTimeBest}
					personalBest={this.state.personalBest}
					currentScore={this.state.currentScore}
					usernameAllTimeBest={this.state.usernameAllTimeBest}
					dateAllTimeBest={this.state.dateAllTimeBest}
				/>
				<div>{grid}</div>
			</div>
		)
	}
}
	
export default GameContainer