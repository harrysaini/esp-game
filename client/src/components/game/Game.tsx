import React from 'react';
import './Games.css';
import GameService from '../../services/game.service';
import {map, shuffle} from 'lodash';
import { AuthService } from '../../services/auth.service';

interface State {
  userId?: number;
  isGameStarted: boolean;
  isGameCompleted: boolean;
  tasks?: any;
  gameId?: number;
  currentIndex: number;
  answers: {[key: number]: { [key:number]: boolean}}
}

interface Props {
}

class Game extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      isGameStarted: false,
      isGameCompleted: false,
      currentIndex: 0,
      answers: {}
    }

    this.startGame = this.startGame.bind(this);
    this.onSecondaryImageClick = this.onSecondaryImageClick.bind(this);
  }

  componentDidMount= () => {
    const user = AuthService.user;
    this.setState({
      userId: user.id
    });
  }



  startGame = async () => {
    try {
      const userId = this.state.userId;
      if(!userId) {
        return;
      }
      const game = await GameService.startNewGame(userId);
      const tasks = game.tasks;
      this.setState({
        gameId: game.id,
        tasks: tasks,
        isGameStarted: true,
        currentIndex: 0
      });
    } catch(e) {
      alert('something happen');
    }
  }

  onImageSubmitClick = async () => {
    try {
      let currentIndex = this.state.currentIndex;
      let totalTasks = this.state.tasks.length;

      if(currentIndex < totalTasks - 1) {
        currentIndex = currentIndex + 1;
        this.setState({
          currentIndex
        });
      } else {
        const userId = this.state.userId as number;
        const resp = await GameService.submitAnswers(userId, this.state.gameId as number, this.state.answers);
        this.setState({
          isGameCompleted: true
        });
        alert('Game completed');
      }
    } catch(e) {
      alert('something happen');
    }
  }

  onResetClick = () => {
    this.setState({
      isGameStarted: false,
      isGameCompleted: false,
      currentIndex: 0,
      answers: {},
      gameId: undefined,
      tasks: null
    });
  }

  onSecondaryImageClick = (taskId:number, secondaryImageId:number) => {
    const answers = this.state.answers;
    answers[taskId] = answers[taskId] || {};
    answers[taskId][secondaryImageId] = !answers[taskId][secondaryImageId];
    console.log(taskId, secondaryImageId);
    console.log(answers);
    this.setState({
      answers: answers
    });
  }

  prepareSubImagesJSX(taskId: number, secondaryImages: any[]) {
    const jsxArr = map(secondaryImages, (secondaryImage) => {
      return (
        <div className = "col-sm-3 secondary-image-wrapper" key={secondaryImage.id}>
          <div
            className={ "secondary-image fill " + ((this.state.answers[taskId] && this.state.answers[taskId][secondaryImage.id]) ? 'selected': '')}
            onClick={() => { this.onSecondaryImageClick(taskId, secondaryImage.id)}}
            >
            <img className="img-fluid" src={secondaryImage.url}></img>
          </div>
        </div>
      )
    });
    return jsxArr;
  }

  prepareTaskJSX(){
    const tasks = this.state.tasks;
    if(!tasks) {
      return null;
    }
    const task = tasks[this.state.currentIndex];

    return (
      <div className= "game-question">
        <h6>Primary Image</h6>
        <div className="game-primary-image fill">
          <img className="img-fluid" src={task.image.url}></img>
        </div>
        <br/>
        <div>Select from these</div>
        <br/>
        <div className="game-secondary-images row">
          {this.prepareSubImagesJSX(task.id, task.image.secondaryImages)}
        </div>
      </div>
    )

  }

  render() {
    return (
      <div className="game-wrapper">
        <div className="text-center">
          <h6>A ESP GAME</h6>
          <p>Just select images related to shown images.</p>
          <p>You will be paired with random player. If your answers are same you will get points</p>
        </div>
          <br/>
        <br/>
        <div className="buttons">
          { !this.state.isGameStarted ?
          (
            <div>
              <button className="btn btn-primary" onClick={this.startGame}>Start</button>
            </div>
          ) :(
            <button className = "btn btn-danger" onClick={this.onResetClick}>Reset</button>  )
          }
        </div>
        <div className="main-game">
          {this.state.isGameCompleted ? (
            <div>Game completed reset to start again</div>
          ) :
          (
          <div>
            { !this.state.isGameStarted ?
              ( <div>Game not started </div>
            ) : (
              <div>
                <div>
                  {this.prepareTaskJSX()}
                </div>
                <div className="next-btn text-center">
                <button className="btn btn-primary" onClick={this.onImageSubmitClick}>Submit</button>
                </div>
              </div>
            )
            }
          </div> )}
        </div>
      </div>
    );
  }

}

export default Game;
