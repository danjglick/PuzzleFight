import React from 'react';

class GridContainer extends React.Component {
	constructor(props) {
		super(props);
		this.test = 'test'
		initialState = {
			grid: Array(36).fill(null),
			currentScore: 0
		};
		this.state = this.initialState;
		this.resetGame = this.resetGame.bind(this);
		this.movePlayer = this.movePlayer.bind(this);
	};
	
	resetGame() {
		this.setState(this.initialState);
		let takenSpots = [0];
		let gamepieces = ['yellow', 'blue', 'red'];
		for(let gamepiece in gamepieces) {
			gamepiece = gamepieces[gamepiece];
			let randSpot = 0;
			while(takenSpots.includes(randSpot)) {
				randSpot = Math.floor((Math.random() * 36) + 1);
			};
			takenSpots.push(randSpot);
			let newGrid = this.state.grid;
			if(gamepiece == 'yellow') { 
				newGrid[randSpot] = ':)';
			} else if(gamepiece == 'blue') {
				newGrid[randSpot] = '*';
			}	else if(gamepiece == 'red') {
				newGrid[randSpot] = '!';
			};
			this.setState({grid: newGrid});
		};
	};
	
	movePlayer(e) {
		let arrows = [37, 38, 39, 40];
		if(arrows.includes(e.keyCode)) {
			for(let spot in this.state.grid) {
				if(spot == ':)') {
					let oldSpot = parseInt(this.state.grid.indexOf(spot));
				};
			};
			if(e.keyCode == 37) {
				let newSpot = oldSpot - 1;
			} else if(e.keyCode == 38) {
				let newSpot = oldSpot - 6;
			}	else if(e.keyCode == 39) {
				let newSpot = oldSpot + 1;
			}	else if(e.keyCode = 40) {
				let newSpot = oldSpot + 6;
			};
			let newGrid = this.state.grid;
			newGrid[newSpot] = ':)';
			this.setState({
				grid: newGrid,
				currentScore: currentScore + 1
			});
			handleReds();
		};
	};
	
	handleReds() {
		for(let spot in this.state.grid) {
			if(spot == '!') {
				let redSpot = spot;
			};
		};
		if(newSpot == redSpot) {
			resetGame();
		};
	};
	
	render() {
		let grid = this.state.grid.map(gridbox => {
			return(
				<h1 className='grid'>{gridbox}</h1>
			);
		});
		return(
			<div>
				<button onClick={this.resetGame}>Start!</button>
				<input value='arrow keys to move' onKeyDown={this.movePlayer} />
				<h4>Moves: {this.state.currentScore}</h4>
				<div>{grid}</div>
			</div>
		);
	};
};
	
export default GridContainer;