import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Game from './components/game/Game';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          ESP-GAME
      </header>
      <Switch>
        <Route exact path="/game">
          <Game />
        </Route>
        <Route exact path="/">
          <div>login</div>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
