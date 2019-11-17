
import { config } from '../config';
import { each } from 'lodash';

const loginUrl = config.apiUrl + '/api/v1/auth/login';
const signupUrl = config.apiUrl + '/api/v1/auth/signup';
const authenticateUrl = config.apiUrl + '/api/v1/auth/me'

const headers = {
  "Content-type": "application/json"
}

export interface ICreds {
  username: string;
  password: string;
}

const TOKEN_KEY = 'token';

export class AuthService {
  static isAuthenticated: boolean = false;
  static user: any = null;

  /**
   * Login uer
   * @param creds
   */
  static async login(creds: ICreds) {
    try {
      const resp = await fetch(loginUrl, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          username: creds.username,
          password: creds.password
        })
      });
      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }
      const userCreds = response.data;
      const user = userCreds.user;
      const token = userCreds.token;

      localStorage.setItem(TOKEN_KEY, token);
      AuthService.isAuthenticated = true;
      AuthService.user = user;

      return user;

    } catch (e) {
      alert(e.message);
      throw e;
    }
  }

  static async signup(creds: ICreds) {
    try {
      const resp = await fetch(signupUrl, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          username: creds.username,
          password: creds.password
        })
      });
      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }

      return response.data;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }

  static getAuthHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
      Authorization: `Bearer ${token}`
    }
  }

  static async authenticate() {
    try {
      const resp = await fetch(authenticateUrl, {
        method: 'get',
        headers: AuthService.getAuthHeaders()
      });
      if ([401, 403].indexOf(resp.status) !== -1) {
        AuthService.isAuthenticated = false;
        return null;
      }
      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }

      const user =  response.data;
      AuthService.isAuthenticated = true;
      AuthService.user = user;

      return user;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }

  static logout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
  }


}
