import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import City from './components/City'
import State from './components/State'
import Country from './components/Country'
import AddCity from './components/AddCity'
import AddState from './components/AddState'
import AddCountry from './components/AddCountry'
import EditState from './components/EditState'
import EditCountry from './components/EditCountry'
import EditCity from './components/EditCity'
import Projects from './components/Projects'
import View from './components/View'
const base_url = '/';
class App extends React.Component {
  render() {

    return (
      <div>
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <a className="navbar-brand" href={base_url}>REACT CSC APP</a>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'} className="nav-link">Home</Link></li>
                    <li><Link to={'/city'} className="nav-link">City</Link></li>
                    <li><Link to={'/state'} className="nav-link">State</Link></li>
                    <li><Link to={'/country'} className="nav-link">Country</Link></li>
                    <li><Link to={'/projects'} className="nav-link">Projects</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                <Route path='/addcity' component={AddCity} />
              </Switch>
              <Switch>
                <Route path='/addstate' component={AddState} />
              </Switch>
              <Switch>
                <Route path='/addcountry' component={AddCountry} />
              </Switch>
              <Switch>
                <Route path='/city/' component={City} />
              </Switch>
              <Switch>
                <Route path='/state' component={State} />
              </Switch>
              <Switch>
                <Route path='/country' component={Country} />
              </Switch>
              <Switch>
                <Route path='/edit/:id' component={EditState} />
              </Switch>
              <Switch>
                <Route path='/cedit/:id' component={EditCountry} />
              </Switch>
              <Switch>
                <Route path='/editc/:id' component={EditCity} />
              </Switch>
              <Switch>
                <Route path='/view/:id/:type' component={View} />
              </Switch>
              <Switch>
                <Route path='/view_c/:id/:type' component={View} />
              </Switch>
              <Switch>
                <Route path='/view_s/:id/:type' component={View} />
              </Switch>
              <Switch>
                <Route path='/del/:id' component={State} />
              </Switch>
              <Switch>
                <Route path='/del_c/:id' component={City} />
              </Switch>
              <Switch>
                <Route path='/projects' component={Projects} />
              </Switch>
              <Switch>
                <Route path='/in_house' component={Projects} />
              </Switch>
              <Switch>
                <Route path='/client' component={Projects} />
              </Switch>
            </div>
          </Router>

        </div>
      </div>
    )
  }
}
export default App;