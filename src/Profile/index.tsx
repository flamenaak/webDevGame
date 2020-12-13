import * as React from "react";
import { useState, useContext } from "react";
import { FunctionComponent } from "react";
import { getMyScores } from "src/api";
import { SnackbarContext } from "src/App";
import Scoreboard from "src/Scoreboard";
import { errorPopup } from "src/ui";
import { IScore } from "../api";

const Profile: FunctionComponent<any> = (props) => {
  const [scores, setScores] = useState<IScore[]>([]);
  const [, setSnackbarState] = useContext(SnackbarContext);
  const fetchScores = async () => {
    try {
      const scoresRes = await getMyScores();
      setScores(scoresRes);
    } catch (err) {
      errorPopup(setSnackbarState, err.message);
    }
  };

  React.useEffect(() => {
    fetchScores();
  }, []);

  return <Scoreboard scores={scores} />;
};

export default Profile;
