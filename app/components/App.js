var React = require('react');
var Popular = require('./Popular');
var Nav = require('./Nav');
var Home = require('./Home');
var { Battle} = require('./Battle');
var Results = require('./Results');
var {Route, BrowserRouter, Switch} = require('react-router-dom');

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav/>
          <Switch>
            <Route exact path='/' component ={Home}/>
            <Route exact path='/popular' component={Popular}/>
            <Route exact path = '/battle' component={Battle}/>
            <Route path='/battle/results' component={Results}/>
            <Route render = {() => (
                <p> 404 </p>
              )}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

module.exports = App;