var React = require('react');
var Api = require('../utils/api');
var PropTypes = require('prop-types');
var {Link} = require('react-router-dom');

function PlayerPreview(props) {
  return (
    <div className='preview'>
      <div className='column'>
        <img className='avatar' src={props.image}/>
        <h2>@{props.username}</h2>
        {props.children}
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      username : ''
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(event.target.value)

    this.props.onSubmit(this.state.username);
  }

  onChange(event) {
    event.preventDefault();
    var value = event.target.value;

    this.setState(() => ({
      username: value
    }))
  }

  render() {
    return (
      <form className='column' onSubmit= {this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder= 'Username'
          type= 'text'
          autoComplete= 'off'
          value= {this.state.username}
          onChange = {this.onChange}
        />
        <button className='button' type= 'submit' disabled={!this.state.username}>
          submit
        </button>
      </form>
    )
  }
}
PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      playerOneName: '',
      playerTwoName:'',
      playerOneImage:null,
      playerTwoImage:null

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => {
      var newState= {};
      newState[id+ 'Name'] = username;
      newState[id + 'Image'] = `https://github.com/${username}.png?size=200`;
      
      return newState;
    }
    )
  }

handleReset(id) {
  this.setState(() => ({
    [id+ 'Name'] : '',
    [id + 'Image'] : null
  }));
}

  render() {
    return (
      <div>
        <div className='row'>
          {!this.state.playerOneName ?
            <PlayerInput 
              id = 'playerOne'
              label = 'Player One'
              onSubmit={this.handleSubmit.bind(null, 'playerOne')}
            /> :
            <PlayerPreview
             username={this.state.playerOneName} 
             image= {this.state.playerOneImage} 
            >
               <button className='button' onClick= {this.handleReset.bind(null, 'playerOne')}>reset</button>
            
            </PlayerPreview>
          }
          {!this.state.playerTwoName ? 
            <PlayerInput 
              id = 'playerTwo'
              label = 'Player Two'
              onSubmit={this.handleSubmit.bind(null, 'playerTwo')}
            />:
            <PlayerPreview
             username={this.state.playerTwoName} 
             image= {this.state.playerTwoImage} 
             >
               <button className='button' onClick= {this.handleReset.bind(null, 'playerTwo')}>reset</button>
            
            </PlayerPreview>
          }
        </div>
        {
          this.state.playerOneName 
          && this.state.playerTwoName 
          && <Link to= {{
            pathname: this.props.match.url + '/results',
            search: `playerOneName=${this.state.playerOneName}&playerTwoName=${this.state.playerTwoName}`
          }} className='button'>Battle</Link>
        }
      </div>
    );
  }
}

module.exports = {
  Battle,
  PlayerPreview
};