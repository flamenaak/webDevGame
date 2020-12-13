import React from "react";
import { Table } from "reactstrap";
import { IScore } from "../api";

interface IScoreboardProps {
  scores: IScore[];
}

export const Scoreboard: React.FunctionComponent<IScoreboardProps> = ({
  scores,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {scores.length > 0 ? (
          scores.map((score, i) => {
            const date = new Date(score.createdAt);
            const formattedTime = `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
            return (
              <tr key={score.score + date.toString()}>
                <th scope="row">{i}</th>
                <td>{score.username}</td>
                <td>{score.score}</td>
                <td>{formattedTime}</td>
              </tr>
            );
          })
        ) : (
          <i>No scores yet</i>
        )}
      </tbody>
    </Table>
  );
};

export default Scoreboard;
