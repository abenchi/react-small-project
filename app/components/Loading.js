var React = require('react');
var PropTypes = require('prop-types');


class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      text: props.text
    }
  }

  componentDidMount(){
    this.stopText = this.props.text + '...';

    this.intervalId = setInterval(()=>{
      if (this.state.text === this.stopText) {
        this.setState(()=> ({text: this.props.text}));
      }  else {
        this.setState(previousState => ({text: previousState.text + '.'}));
      }
    }, this.props.speed)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    return(
      <div>
        {this.state.text}
      </div>
    )

  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'loading',
  speed: 300
}

module.exports = Loading;