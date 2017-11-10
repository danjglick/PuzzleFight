import React from 'react'

class StatusBarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: '1'}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.changeLevel(this.state.value)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
          <input type="submit" value="Start!" />
        </form>
        ...AllTimeBest:{this.props.allTimeBest}({this.props.usernameAllTimeBest} {this.props.dateAllTimeBest})
        ...PersonalBest:{this.props.personalBest}
        ...CurrentScore:{this.props.currentScore} 
      </div> 
    )
  }
}

export default StatusBarContainer