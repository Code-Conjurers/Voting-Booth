//Modules
import firebase from "./Firebase";
import { get, ref, getDatabase } from "firebase/database";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResultsBar = () => {
  //firebase key
  const { boothID } = useParams();
  // initialize database content
  const database = getDatabase(firebase);
  //defining State
  const [pollQuestion, setPollQuestion] = useState("");
  const [optionOneDescription, setOptionOneDescription] = useState("");
  const [votesOne, setVotesOne] = useState();
  const [optionTwoDescription, setOptionTwoDescription] = useState("");
  const [votesTwo, setVotesTwo] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const [voteOnePercent, setVoteOnePercent] = useState(0);
  const [voteTwoPercent, setVoteTwoPercent] = useState(0);
  //database reference
  const dbRef = ref(database, `/${boothID}`);

  //taking a snapshot of the database
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      setPollQuestion(snapshot.val().pollQuestion);
      setOptionOneDescription(snapshot.val().pollOptionOne.optionOneDescription);
      setVotesOne(snapshot.val().pollOptionOne.votes);
      setOptionTwoDescription(snapshot.val().pollOptionTwo.optionTwoDescription);
      setVotesTwo(snapshot.val().pollOptionTwo.votes);
      setTotalVotes(snapshot.val().totalVotes);

      //function to calculate % of votes
      const voteCounting = function getPercentA(x, y) {
        if (!isNaN(x, y)) {
          return Math.round((x / (x + y)) * 100);
        }
      };
      //ensuring vote one or two has data before passing into useState
      const voteCalc = voteCounting(votesOne, votesTwo);
      const voteTwoCalc = voteCounting(votesTwo, votesOne);
      if (voteCalc >= 1 || voteTwoCalc >= 1) {
        setVoteOnePercent(voteCalc, voteTwoCalc);
        setVoteTwoPercent(voteTwoCalc, voteCalc);
      } else if (votesOne === 0 && votesTwo === 0) {
        //error alert if total votes are 0
        Swal.fire("No votes yet!");
      } else {
        setVoteOnePercent(0);
        setVoteTwoPercent(0);
      }

      //if snapshot does not exist:
    } else {
      Swal.fire("No data available");
    }
  }).catch(() => {
    Swal.fire("Sorry, an error has occurred.");
  });

  return (
    <>
      <h2 className="results-bar-h2"><span>Poll Question:</span> {pollQuestion}</h2>
      <h3 className="results-bar-h3">Total Votes: {totalVotes}</h3>
      <section className="progress-bars-container">
        <div className="progress-bar-one">
          <p className="results-bar-p">
            <span className="results-option">{optionOneDescription}</span> has {voteOnePercent}% of the vote.
            </p>
          <ProgressBar completed={voteOnePercent} bgColor="#E54F6D" />
        </div>
        <div className="progress-bar-two">
          <p className="results-bar-p">
            <span className="results-option">{optionTwoDescription}</span> has {voteTwoPercent}% of the vote.
            </p>
          <ProgressBar completed={voteTwoPercent}
            bgColor="#724E91" />
        </div>
      </section>
    </>
  );
};

export default ResultsBar;

// Progress bar courtesy of
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl