var React = require('react');
var api = require('../utils/api');
var queryString = require('query-string');
var Link = require('react-router-dom');
var PropTypes = require('prop-types');
var {PlayerPreview} = require('./Battle')


function Profile(props) {
  return (
    <PlayerPreview
      username={props.info.login}
      image={props.info.avatar_url}>
      <p>{props.info.login}
      </p>
      <p>{props.info.blog}
      </p>
      <p>{props.info.organizations_url}
      </p>
      <p>{props.info.created_at}
      </p>
      <p>{props.info.company}
      </p>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  console.log(props.profile)
  return (
    <div>
      <h1>
        {props.status}</h1>
      <h1 style={{
        textAlign: 'center'
      }}>{props.profile.score}</h1>
      <Profile info={props.profile.profile}/>
    </div>
  )
}

Player.propTypes = {
  profile: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired
}

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  
  componentDidMount() {
    var {playerOneName, playerTwoName} = queryString.parse(this.props.location.search)

    console.log(playerOneName, playerTwoName);
    api
      .battle([playerOneName, playerTwoName])
      .then(data => {
        this.setState(() => ({winner: data[0], loser: data[1], loading: false, error: null}))
      })
      .catch(err => {
        this.setState(() => ({error: err, loading: false}))
      })
  }

  render() {
    if (this.state.loading) {
      return <p>Loading!</p>
    }

    if (this.state.error) {
      return (
        <div> Error! 
          <Link to='/battle'>Rebattle....</Link>
        </div>
        
      )
    }
    return (
      <div className='row'>
         <Player profile= {this.state.winner} status= 'winner'/>
        <Player profile= {this.state.loser} status= 'loser'/> 
        {/* <Link to='/battle'>Rebattle....</Link> */}
      </div>
    )
  }
}

module.exports = Results;