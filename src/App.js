import './App.css';
import React, { Component } from 'react';
import { Redirect, Router, Route, Switch, NavLink } from 'react-router-dom';
import { connect } from "react-redux"
import { history } from "./helper"
import routes from './routes';

const loading = () => <div>Loading...</div>;

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <React.Suspense fallback={loading()}>
          <div>
            <ul className="header">
              <li><NavLink to="/covid">Covid Summary</NavLink></li>
              <li><NavLink to="/details">View by countries </NavLink></li>
            </ul>
            <div className="content">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      component={route.component}
                    />
                  ) : (null);
                })}
                <Redirect from="/" to="/covid" />
              </Switch>
            </div>
          </div>
        </React.Suspense>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(App)
