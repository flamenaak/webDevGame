import * as React from "react";
import { Button } from "reactstrap";
import { addScore, AuthState } from "src/api";
import { successPopup, infoPopup } from "src/ui";
import Board from "../Board/Board";
import Flash from "../Flash/Flash";
import Grid from "../Grid/Grid";
import "./Game.css";

export interface IProps {
  columns: number;
  onScoreChange?: (prevScore: number, nextScore: number) => void;
  onPause: (e: any) => void;
  rows: number;
  score: number;
  rounds: number;
  authState: AuthState;
  running: boolean;
  setSnackbarState: React.Dispatch<React.SetStateAction<any>>;
}

export interface IState {
  board: Board;
  currentFlash?: Flash;
  round: number;
}

class Game extends React.Component<IProps, IState> {
  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const nextState: any = { board: prevState.board };

    if (
      prevState.board.rows !== nextProps.rows ||
      prevState.board.columns !== nextProps.columns
    ) {
      prevState.board.stop();
      nextState.board = new Board(nextProps.rows, nextProps.columns);
      nextState.running = false;
    }

    if (nextProps.onScoreChange) {
      nextState.board.onScoreChange = nextProps.onScoreChange;
    }

    if (nextProps.running) {
      nextState.running = true;
    }

    return nextState;
  }

  constructor(props: any) {
    super(props);

    this.state = {
      board: new Board(this.props.rows, this.props.columns),
      currentFlash: undefined,
      round: 0,
    };

    this.tryPosition = this.tryPosition.bind(this);
    this.trySound = this.trySound.bind(this);
    this.onFlash = this.onFlash.bind(this);
    this.speak = this.speak.bind(this);
  }

  public componentWillUnmount() {
    this.state.board.stop();
  }

  public componentDidUpdate(
    prevProps: IProps,
    prevState: IState,
    snapshot?: any
  ) {
    if (!prevProps.running && this.props.running) {
      this.state.board.start(this.onFlash);
    }

    if (prevProps.running && !this.props.running) {
      this.state.board.stop();
    }
  }

  public render() {
    const props: any = {};
    if (this.state.currentFlash) {
      props.highlight = this.state.currentFlash.position;
    }
    return (
      <div>
        <Grid
          rows={this.state.board.rows}
          columns={this.state.board.columns}
          {...props}
        />
        <Button
          color="game-control-btn secondary"
          disabled={!this.props.running}
          onClick={this.tryPosition}
        >
          Position
        </Button>
        <Button
          color="game-control-btn secondary"
          disabled={!this.props.running}
          onClick={this.trySound}
        >
          Sound
        </Button>
      </div>
    );
  }

  private tryPosition() {
    this.state.board.samePosition();
  }

  private trySound() {
    this.state.board.sameSound();
  }

  private onFlash(newFlash: Flash) {
    if (this.state.round == this.props.rounds) {
      this.endGame(this.props.score);
      return;
    }
    this.setState((prevState) => ({
      currentFlash: newFlash,
      round: prevState.round + 1,
    }));
    this.speak(newFlash.sound.toString());
  }

  private endGame = (score: number) => {
    this.state.board.stop();
    this.props.onPause(null);
    this.setState({
      round: 0,
    });
    if (this.props.authState.isLoggedIn) {
      addScore({
        username: this.props.authState.userName,
        score: score,
        createdAt: new Date().toString(),
      });
      successPopup(
        this.props.setSnackbarState,
        `Your score (${score}) was saved`
      );
    } else {
      infoPopup(
        this.props.setSnackbarState,
        "To save and keep track of your scores please log in"
      );
    }
  };

  private speak(text: string) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.voice = speechSynthesis.getVoices().filter((voice) => {
        return voice.name === "Allison";
      })[0];
      window.speechSynthesis.speak(utterance);
    }
  }
}

export default Game;
