import React from 'react'
import baseUrl from '../constants/baseUrl'

class StatusBarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: 1}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if(!this.props.grid.includes('yellow')) {
      fetch('{$baseUrl}/api/v1/gamestates.json', {
        credentials: 'same-origin',
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
        .then(response => response.json())
        .then(body => {
          var level = body[0].current_state.level
          this.state = {value: level}
        })
        .catch(function(error) {console.log(error)})
    }
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    var newLevel = this.state.value
    this.props.changeLevel(newLevel)
  }

  render() {
    return (
      <div className='bar'>
        <form className='stat' onSubmit={this.handleSubmit}>
          <input className='header start' type='submit' value='Start&nbsp;&nbsp;|'/>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value='1'>Level 1</option>
            <option value='2'>Level 2</option>
            <option value='3'>Level 3</option>
            <option value='4'>Level 4</option>
            <option value='5'>Level 5</option>
            <option value='6'>Level 6</option>
            <option value='7'>Level 7</option>
            <option value='8'>Level 8</option>
            <option value='9'>Level 9</option>
            <option value='10'>Level 10</option>
            <option value='11'>Level 11</option>
            <option value='12'>Level 12</option>
            <option value='13'>Level 13</option>
            <option value='14'>Level 14</option>
            <option value='15'>Level 15</option>
            <option value='16'>Level 16</option>
            <option value='17'>Level 17</option>
            <option value='18'>Level 18</option>
            <option value='19'>Level 19</option>
            <option value='20'>Level 20</option>
            <option value='21'>Level 21</option>
            <option value='22'>Level 22</option>
            <option value='23'>Level 23</option>
            <option value='24'>Level 24</option>
            <option value='25'>Level 25</option>
            <option value='26'>Level 26</option>
            <option value='27'>Level 27</option>
            <option value='28'>Level 28</option>
            <option value='29'>Level 29</option>
            <option value='30'>Level 30</option>
          </select>
        </form>
        <div className='stat'>
          <div className='header'>All-Time Best&nbsp;&nbsp;|&nbsp;&nbsp;</div>
          {this.props.allTimeBest} by {this.props.usernameAllTimeBest} in {this.props.dateAllTimeBest}
        </div>
        <div className='stat'>
          <div className='header'>Personal Best&nbsp;&nbsp;|&nbsp;&nbsp;</div>
          {this.props.personalBest}
        </div>   
        <div className='stat'>
          <div className='header'>Current Score&nbsp;&nbsp;|&nbsp;&nbsp;</div>
          {this.props.currentScore}
        </div>
      </div> 
    )
  }
}

export default StatusBarContainer
