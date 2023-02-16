import firebase from "./Firebase";
import { get, ref, getDatabase  } from 'firebase/database'
import { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
// import React from "react";

function ResultsBar() {
  const {boothID} = useParams()
  // Initialize Firebase
  // const app = initializeApp(firebase);
  // Initialize Database content
  const database = getDatabase(firebase);
  // Once again, we grab a reference to our firebase database.
  // const boothKey = boothID.boothID

  const [pollQuestion, setPollQuestion] = useState('')
  const [optionOneDescription, setOptionOneDescription] = useState('')
  const [votesOne, setVotesOne] = useState()
  const [optionTwoDescription, setOptionTwoDescription] = useState('')
  const [votesTwo, setVotesTwo] = useState()
  const [totalVotes, setTotalVotes] = useState()
  const [voteOnePercent, setVoteOnePercent] = useState();
  const [voteTwoPercent, setVoteTwoPercent] = useState();

  const dbRef = ref(database, `/${boothID}`);

  get(dbRef).then((snapshot) => {


    if (snapshot.exists()) {
      setPollQuestion(snapshot.val().pollQuestion)
      setOptionOneDescription(snapshot.val().pollOptionOne.optionOneDescription)
      setVotesOne(snapshot.val().pollOptionOne.votes)
      setOptionTwoDescription(snapshot.val().pollOptionTwo.optionTwoDescription)
      setVotesTwo(snapshot.val().pollOptionTwo.votes)
      setTotalVotes(snapshot.val().totalVotes)

      const voteCounting = function getPercentA(x, y) {
        return Math.round((x / (x + y)) * 100);
      }
      
      setVoteOnePercent(voteCounting(votesOne, votesTwo))
      setVoteTwoPercent(voteCounting(votesTwo, votesOne))

    } else {
      console.log("No data available")
    }
  }) .catch(() => {
    Swal.fire('Sorry, an error has occurred.')
  })
  return (
    <>
      <h2>Poll Question: {pollQuestion}</h2>
      <h3>Total Votes: {totalVotes}</h3>
      <p>{optionOneDescription} has {voteOnePercent}% of the vote.</p>
      <ProgressBar completed={voteOnePercent} bgColor="#E555A5" />
      <br></br> {/* This is just here to visually break up the 2 polls until we style them. */}
      <p>{optionTwoDescription} has {voteTwoPercent}% of the vote.</p>
      <ProgressBar completed={voteTwoPercent} />
    </>
  );
}



export default ResultsBar;

// Progress bar courtesy of
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl




