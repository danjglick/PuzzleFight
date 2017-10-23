import React from 'react';

class GridContainer extends React.Component {
	constructor(props) {
		super(props);
		this.reset = {
			box1: 1, 
			box2: 2, 
			box3: 3,
			box4: 4,
			box5: 5,
			box6: 6,
			box7: 7,
			box8: 8,
			box9: 9
		};
		this.state = this.reset;
		this.handleKeyPress = this.handleKeyPress.bind(this);
	};
	
	handleKeyPress(event) {
		if(event.key == 1) {
			this.setState(this.reset);
			this.setState({box1: '*'});
		} else if(event.key == 2) {
			this.setState(this.reset);
			this.setState({box2: '*'});
		} else if(event.key == 3) {
			this.setState(this.reset);
			this.setState({box3: '*'});
		} else if(event.key == 4) {
			this.setState(this.reset);
			this.setState({box4: '*'});
		} else if(event.key == 5) {
			this.setState(this.reset);
			this.setState({box5: '*'});
		} else if(event.key == 6) {
			this.setState(this.reset);
			this.setState({box6: '*'});
		} else if(event.key == 7) {
			this.setState(this.reset);
			this.setState({box7: '*'});
		} else if(event.key == 8) {
			this.setState(this.reset);
			this.setState({box8: '*'});
		} else if(event.key == 9) {
			this.setState(this.reset);
			this.setState({box9: '*'});
		}
	};

	render() {
		return(
			<div>	
				<div className='grid' id='box1'>{this.state.box1}</div>
				<div className='grid' id='box2'>{this.state.box2}</div>
				<div className='grid' id='box3'>{this.state.box3}</div>
				<div className='grid' id='box4'>{this.state.box4}</div>
				<div className='grid' id='box5'>{this.state.box5}</div>
				<div className='grid' id='box6'>{this.state.box6}</div>
				<div className='grid' id='box7'>{this.state.box7}</div>
				<div className='grid' id='box8'>{this.state.box8}</div>
				<div className='grid' id='box9'>{this.state.box9}</div>
				<input onKeyPress={this.handleKeyPress} />
			</div>
		);
	};
};
	
export default GridContainer;