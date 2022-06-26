import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import LoginForm from './components/loginForm';
import RegisterForm from "./components/registerForm"
import NotFound from './components/notFound';
import Cloud from './components/cloud';
import Teams from './components/teams';
import Stats from './components/stats';
import NavBar from './components/navbar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/cloud" component={Cloud}></Route>
            <Route path="/teams" component={Teams}></Route>
            <Route path="/stats" component={Stats}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/cloud" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(App); 
