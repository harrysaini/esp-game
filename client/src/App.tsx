import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PrivateRoute from './_shared-components/PrivateRoute';
import Game from './components/game/Game';
import Login from './components/login/Login';
import Account from './components/account/Account';
import { ReactComponent } from '*.svg';
import { AuthService } from './services/auth.service';

interface Props {
}
interface State {
  user: any;
}
class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = async () => {
    const user = await AuthService.authenticate();
    this.setState({
      user: user
    });
  }

  render(){
    return (
      <Router>
        <div className="App">
          <header className="App-header">
              <Link to= '/'><div className="logo">ESP-GAME</div></Link>
              <div className="header-btns">
              { this.state.user && this.state.user.id ?
                ( <div className="user-buttons">
                    <Link to='/account'>
                      <button type="button" className="btn btn-outline-primary">My Account</button>
                    </Link>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => AuthService.logout()}>LogOut</button>
                  </div>
                ) : (
                  <Link to='/login'>
                    <button type="button" className="btn btn-outline-primary">Login</button>
                  </Link>
                )
              }
            </div>
          </header>
          <Switch>
            <Route exact path='/'>
              <div className="index-wrapper">
                <div className="text-center">
                  <br></br><br/><br/>
                  <h6>A ESP GAME</h6>
                  <p>Just select images related to shown images.</p>
                  <p>You will be paired with random player. If your answers are same you will get points</p>
                  <br></br>
                  <Link to='/game'>
                    <button type="button" className="btn btn-primary">
                        Start Game
                    </button>
                  </Link>

                </div>
              </div>
            </Route>
            <PrivateRoute exact path="/game">
              <Game />
            </PrivateRoute>
            <PrivateRoute exact path="/account">
              <Account />
            </PrivateRoute>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
