import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { AuthState, IScore } from "src/api";
import Scoreboard from "src/Scoreboard";
import Game from "../Game/Game";
import "./GameContainer.css";

export interface IState {
  gameRunning: boolean;
  gridSize: number;
  score: number;
  rounds: number;
  highscores: IScore[];
}

interface IProps {
  authState: AuthState;
}

const getWSUrl = () => {
  if (window.location.hostname === "localhost") {
    return `ws://localhost:3000/ws`;
  } else {
    return `ws://${window.location.hostname}/ws`;
  }
};
class GameContainer extends React.Component<IProps, IState> {
  ws = new WebSocket(getWSUrl());

  constructor(props: any) {
    super(props);

    this.state = {
      gameRunning: false,
      gridSize: 3,
      score: 0,
      rounds: 10,
      highscores: [],
    };

    this.setGridSize = this.setGridSize.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  componentDidMount() {
    this.ws.onopen = () => {
      this.ws.onmessage = (evt) => {
        this.setState({
          highscores: JSON.parse(evt.data),
        });
      };
      console.log("websocket connection successfully opened");
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  public render() {
    return (
      <div className="game-app">
        <Container>
          <Row>
            {/* <Col xs="3">
              <input
                type="range"
                min="3"
                max="5"
                className="slider"
                value={this.state.gridSize}
                onInput={this.setGridSize}
                onChange={this.setGridSize}
              />
            </Col> */}
            <Col md="6" className="mx-md-auto">
              <Row className="text-align-center">
                <Col xs="12">
                  <Button className="info score" size="sm">
                    Score: {this.state.score}
                  </Button>
                </Col>
              </Row>
              <Game
                rows={this.state.gridSize}
                columns={this.state.gridSize}
                running={this.state.gameRunning}
                onScoreChange={this.onScoreChange}
                authState={this.props.authState}
                score={this.state.score}
                rounds={this.state.rounds}
                setSnackbarState={this.context[1]}
                onPause={this.onPause}
              />
              <Row className="text-align-center">
                <Col xs="12">
                  <Button
                    color="primary"
                    className={this.state.gameRunning ? "hidden" : "action"}
                    onClick={this.onPlay}
                  >
                    Play
                  </Button>
                  <Button
                    color="primary"
                    className={!this.state.gameRunning ? "hidden" : "action"}
                    onClick={this.onPause}
                  >
                    Stop
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="scoreboard col-lg-5 offset-lg-1">
              <Scoreboard scores={this.state.highscores} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  private setGridSize(e: any) {
    this.setState({ gridSize: e.target.value });
  }

  private onPlay(e: any) {
    this.setState({ gameRunning: true });
  }

  private onPause(e: any) {
    this.setState({ gameRunning: false });
  }

  private onScoreChange(prevScore: number, nextScore: number) {
    this.setState({ score: nextScore });
  }
}

export default GameContainer;
