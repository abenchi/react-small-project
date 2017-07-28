var React = require('react');
var { Link } = require('react-router-dom');

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Github Battle: Battle your friends... andstuff.
        </h1>
        <Link className='button' to='/battle'>
          battle
        </Link>
      </div>
    );
  }
}

module.exports = Home;