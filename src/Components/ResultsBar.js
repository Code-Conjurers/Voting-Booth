import firebase from "./Firebase";
import { get, ref, getDatabase  } from 'firebase/database'
import { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
// import React from "react";

function ResultsBar(boothID) {
  // Initialize Firebase
  // const app = initializeApp(firebase);
  // Initialize Database content
  const database = getDatabase(firebase);
  // Once again, we grab a reference to our firebase database.
  const boothKey = boothID.boothID

  const [pollQuestion, setPollQuestion] = useState('')
  const [optionOneDescription, setOptionOneDescription] = useState('')
  const [votesOne, setVotesOne] = useState('')
  const [optionTwoDescription, setOptionTwoDescription] = useState('')
  const [votesTwo, setVotesTwo] = useState('')
  const [totalVotes, setTotalVotes] = useState('')

  const dbRef = ref(database, `/${boothKey}`);

  

  // We know what we need to do... Calculate shit.

// Poll option one - X
// function getPercentA(x, y) {
//   return Math.round((x / (x + y)) * 100);
// }
// // Poll option two - Y
// function getPercentB(x, y) {
//   return Math.round((y / (x + y)) * 100);
// }

// console.log(`Poll Option A has ${getPercentA(3, 4)}% of the vote.`);
// console.log(`Poll Option B has ${getPercentB(3, 4)}% of the vote.`);

  

  // We call the `get` method here to grab the value of our Firebase database.
  // The get method returns a promise, where we can the return data in a parameter
  // The parameter is referred to here and in the Google docs as a "snapshot" but could be named whatever we want. 
  get(dbRef).then((snapshot) => {

    
    // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
    if (snapshot.exists()) {
      // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
      // console.log(dbRef)
      // console.log(snapshot.val())

      setPollQuestion(snapshot.val().pollQuestion)
      setOptionOneDescription(snapshot.val().pollOptionOne.optionOneDescription)
      setVotesOne(snapshot.val().pollOptionOne.votes)
      setOptionTwoDescription(snapshot.val().pollOptionTwo.optionTwoDescription)
      setVotesTwo(snapshot.val().pollOptionTwo.votes)
      setTotalVotes(snapshot.val().totalVotes)

    } else {
      console.log("No data available")
    }
  }).catch((error) => {
    console.log(error)
  })
}


export default ResultsBar;

// Progress bar courtesy of
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl




