// make state hash an array tied to key grid

import React from 'react';

class GridContainer extends React.Component {
	constructor(props) {
		super(props);
		this.currentScore = 0;
		this.numBlues = 1;
		this.isWinner = 'False';
		this.emptyGrid = {
			1: null, 2: null, 3: null, 4: null, 5: null, 6: null,
			7: null, 8: null, 9: null, 10: null, 11: null, 12: null, 
			13: null, 14: null, 15: null, 16: null, 17: null, 18: null,
			19: null, 20: null, 21: null, 22: null, 23: null, 24: null,
			25: null, 26: null, 27: null, 28: null, 29: null, 30: null,
			31: null, 32: null, 33: null, 34: null, 35: null, 36: null
		}; 
		this.state = this.emptyGrid;
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.randomizeSpot = this.randomizeSpot.bind(this);
	};	
	
	randomizeSpot() {
		this.currentScore = 0;
		this.setState(this.emptyGrid);
		var takenSpots = [0];
		//yellow
		var yellowRandSpot = 0;
		while (takenSpots.includes(yellowRandSpot)) {
			var yellowRandSpot = Math.floor((Math.random() * 36) + 1);
		}
		takenSpots.push(yellowRandSpot);
		this.setState({[yellowRandSpot]: ':)'});
		//blue
		var blueRandSpot = 0;
		while (takenSpots.includes(blueRandSpot)) {
			var blueRandSpot = Math.floor((Math.random() * 36) + 1);
		}
		takenSpots.push(blueRandSpot);
		this.setState({[blueRandSpot]: '*'});
		//red
		var redRandSpot = 0;
		while (takenSpots.includes(redRandSpot)) {
			var redRandSpot = Math.floor((Math.random() * 36) + 1);
		}
		takenSpots.push(redRandSpot);
		this.setState({[redRandSpot]: '!'});
	};
	
	handleKeyDown(e) {
		//up
		if(e.keyCode == 38) {
			for(var key in this.state) {
				if(this.state[key] == ':)') {
					var oldSpot = parseInt(key);
				};   
			};
			var newSpot = oldSpot - 6;
			this.setState({[oldSpot]: null, [newSpot]: ':)'});
			this.currentScore += 1;
			//account for reds
			for(var key in this.state) {
				if(this.state[key] == '!') {
					var redSpot = key;
				}; 
			};
			if(newSpot == redSpot) {
				this.setState(this.emptyGrid);
				this.currentScore = 0;
			};
			//account for blues NEEDS WORK
			for(var key in this.state) {
				if(this.state[key] == '*') {
					var blueSpot = key;
				}; 
			};
			if(newSpot == blueSpot) {		
				this.numBlues -= 1;
				if(this.numBlues == 0) {
						this.winner = 'True';
				};
			};	
			console.log(this.numBlues);
			console.log(this.winner);
		//down		
		} else if(e.keyCode == 40) {
			for(var key in this.state) {
				if(this.state[key] == ':)') {
					var oldSpot = key;
				};   
			};
			var newSpot = parseInt(oldSpot) + 6;
			this.setState({[oldSpot]: null, [newSpot]: ':)'});
			this.currentScore += 1;
			//account for reds
			for(var key in this.state) {
				if(this.state[key] == '!') {
					var redSpot = key;
				}; 
			};
			if(newSpot == redSpot) {
				this.setState(this.emptyGrid);
				this.currentScore = 0;
			};	
		//right		
		} else if(e.keyCode == 39) {
			for(var key in this.state) {
				if(this.state[key] == ':)') {
					var oldSpot = key;
				};   
			};
			var newSpot = parseInt(oldSpot) + 1;
			this.setState({[oldSpot]: null, [newSpot]: ':)'});
			this.currentScore += 1;
			//account for reds
			for(var key in this.state) {
				if(this.state[key] == '!') {
					var redSpot = key;
				}; 
			};
			if(newSpot == redSpot) {
				this.setState(this.emptyGrid);
				this.currentScore = 0;
			};
		//left
		} else if(e.keyCode == 37) {
			for(var key in this.state) {
				if(this.state[key] == ':)') {
					var oldSpot = key;
				};   
			};
			var newSpot = parseInt(oldSpot) - 1;
			this.setState({[oldSpot]: null, [newSpot]: ':)'});	
			this.currentScore += 1;
			for(var key in this.state) {
				if(this.state[key] == '!') {
					var redSpot = key;
				}; 
			};
			if(newSpot == redSpot) {
				this.setState(this.emptyGrid);
				this.currentScore = 0;
			};	
		};
	};
			
	render() {
		return(
			<div>
				<button onClick={this.randomizeSpot}>Start!</button>
				<input value='arrow keys to move' onKeyDown={this.handleKeyDown} />
				<h4>Moves: {this.currentScore}</h4>
				<h4>Winner: {this.isWinner}</h4>
				<h1 className='grid'>{this.state[1]}</h1>
				<h1 className='grid'>{this.state[2]}</h1>
				<h1 className='grid'>{this.state[3]}</h1>
				<h1 className='grid'>{this.state[4]}</h1>
				<h1 className='grid'>{this.state[5]}</h1>
				<h1 className='grid'>{this.state[6]}</h1>
				<h1 className='grid'>{this.state[7]}</h1>
				<h1 className='grid'>{this.state[8]}</h1>
				<h1 className='grid'>{this.state[9]}</h1>
				<h1 className='grid'>{this.state[10]}</h1>
				<h1 className='grid'>{this.state[11]}</h1>
				<h1 className='grid'>{this.state[12]}</h1>
				<h1 className='grid'>{this.state[13]}</h1>
				<h1 className='grid'>{this.state[14]}</h1>
				<h1 className='grid'>{this.state[15]}</h1>
				<h1 className='grid'>{this.state[16]}</h1>
				<h1 className='grid'>{this.state[17]}</h1>
				<h1 className='grid'>{this.state[18]}</h1>
				<h1 className='grid'>{this.state[19]}</h1>
				<h1 className='grid'>{this.state[20]}</h1>
				<h1 className='grid'>{this.state[21]}</h1>
				<h1 className='grid'>{this.state[22]}</h1>
				<h1 className='grid'>{this.state[23]}</h1>
				<h1 className='grid'>{this.state[24]}</h1>
				<h1 className='grid'>{this.state[25]}</h1>
				<h1 className='grid'>{this.state[26]}</h1>
				<h1 className='grid'>{this.state[27]}</h1>
				<h1 className='grid'>{this.state[28]}</h1>
				<h1 className='grid'>{this.state[29]}</h1>
				<h1 className='grid'>{this.state[30]}</h1>
				<h1 className='grid'>{this.state[31]}</h1>
				<h1 className='grid'>{this.state[32]}</h1>
				<h1 className='grid'>{this.state[33]}</h1>
				<h1 className='grid'>{this.state[34]}</h1>
				<h1 className='grid'>{this.state[35]}</h1>
				<h1 className='grid'>{this.state[36]}</h1>
			</div>
		);
	};
};
	
export default GridContainer;