import React from 'react';
import {map} from 'lodash';
import { AuthService } from '../../services/auth.service';
import GameService from '../../services/game.service';
import './Account.css';

interface State {
  user: any;
  games: any[];
}

interface Props {
}

class Account extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      user: null,
      games: []
    }
  }

  componentDidMount= async () => {
    this.setState({
      user: AuthService.user
    });
    try {
      const userGames = await GameService.getUserGames();
      this.setState({
        games: userGames.games
      });
    } catch(e) {
      alert('bad happened');
    }
  }

  render() {

    const user = this.state.user || {};
    const games = this.state.games;

    const userGames = map(games, (game) => {
      return (
        <li>
          You played gameId {game.id} -  got points {game.points}. <br></br>
          { !game.isGamePlayedBySecondUser ? 'Game not played by second user' : ''}
        </li>
      )
    })

    return (
      <div className="user-wrapper">
        <h6>Hi {user.username}</h6>

        <br></br>
        <br></br>

        Your games:

        <br>
        </br>

        <ol>
          {userGames}
        </ol>
      </div>
    );
  }

}

export default Account;
