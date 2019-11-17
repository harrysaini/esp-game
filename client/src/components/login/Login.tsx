import React, { KeyboardEvent } from 'react';
import './Login.css';
import {map} from 'lodash';
import { AuthService, ICreds } from '../../services/auth.service';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';

interface State {
  isLoginShown: boolean;
  loginPassword: string;
  loginUsername: string;
  signupPassword: string;
  signupUsername: string;
  signupPasswordConfirm: string;
  errorMessage: string;
}

interface Props extends RouteComponentProps {
}

type targetName = 'loginPassword' | 'loginUsername' | 'signupPassword' | 'signupUsername' ;

class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isLoginShown: true,
      loginPassword: '',
      loginUsername: '',
      signupPassword: '',
      signupUsername: '',
      signupPasswordConfirm: '',
      errorMessage: ''
    }

    if(AuthService.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleInputChange = (event: React.BaseSyntheticEvent) => {
    const target = event.target;
    const value = target.value as string;
    const name: targetName = target.name as targetName;

    this.setState({
      [name]: value
    } as unknown as State);
  }

  validateInput = (creds: ICreds, isSignup?: boolean) => {
    if(!creds.username) {
      throw new Error('username empty');
    }
    if(!creds.password) {
      throw new Error('password empty');
    }

    if(isSignup && !(creds.password === this.state.signupPasswordConfirm)) {
      throw new Error('confirm password does not match');
    }
  }

  onLoginClick = async () => {
    try {

      this.setState({
        errorMessage: ''
      });
      const creds = {
        username: this.state.loginUsername,
        password: this.state.loginPassword
      }

      this.validateInput(creds);

      const user = await AuthService.login(creds);
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      window.location.href = (from.pathname);

    } catch(e) {
      this.setState({
        loginPassword: ''
      })
      this.showErrorMessage(e);
    }
  }

  onSignupClick = async () => {
    try {

      this.setState({
        errorMessage: ''
      });

      const creds = {
        username: this.state.signupUsername,
        password: this.state.signupPassword
      }

      this.validateInput(creds, true);

      const user = await AuthService.signup(creds);
      alert('Account created login to continue');

      this.setState({
        isLoginShown: true,
        errorMessage: '',
        signupPasswordConfirm: '',
        signupUsername: '',
        signupPassword: ''
      });

    } catch(e) {
      this.setState({
        signupPassword: '',
        signupPasswordConfirm: ''
      });
      this.showErrorMessage(e);
    }
  }

  showErrorMessage = (error: Error) => {
    this.setState({
      errorMessage: error.message
    });
  }



  // jSX

  render() {

    if(AuthService.isAuthenticated) {
      return <Redirect to='/'/>
    }

    let renderedComponent: JSX.Element;

    if(this.state.isLoginShown) {
      renderedComponent = (
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                id="username"
                className="form-control"
                placeholder="User name"
                name="loginUsername"
                value={this.state.loginUsername}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={this.state.loginPassword}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="login-btns">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onLoginClick}
                >Login</button>
              <a onClick={() => {this.setState({isLoginShown: false, errorMessage: ''})} }>Create an account.</a>
            </div>
          </form>
        </div>
      )
    } else {
      renderedComponent = (
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="s-username">Username</label>
              <input
                type="email"
                id="username"
                className="form-control"
                placeholder="User name"
                name="signupUsername"
                value={this.state.signupUsername}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="form-group">
              <label htmlFor="s-password">Password</label>
              <input
                type="password"
                id="s-password"
                className="form-control"
                placeholder="Password"
                name="signupPassword"
                value={this.state.signupPassword}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="form-group">
              <label htmlFor="c-password">Confirm Password</label>
              <input
                type="password"
                id="c-password"
                className="form-control"
                placeholder="Confirm Password"
                name="signupPasswordConfirm"
                value={this.state.signupPasswordConfirm}
                onChange={this.handleInputChange}
                />
            </div>
            <div className="login-btns">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSignupClick}
                >Signup</button>
              <a onClick={() => {this.setState({isLoginShown: true, errorMessage: ''})} }>Already have an account?</a>
            </div>
          </form>
        </div>
      )
    }

    return (
      <div className="login-wrapper">
        <div className="text-center">
          <h6>Welcome to A ESP GAME</h6>
          <p>Please login or signup.</p>
        </div>
        <br/>
        { this.state.errorMessage &&
          <div>
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          </div>
        }
        {renderedComponent}
      </div>
    );
  }

}

export default withRouter(Login);
