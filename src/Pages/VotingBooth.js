// Modules
import * as React from 'react'
import firebase from '../Components/Firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useParams, Link } from 'react-router-dom';
import VotingConfirmation from '../Components/VotingConfirmation';

function VotingBooth() {
  // Defining State
  const [pollData, setPollData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { boothID } = useParams();
  // Firebase Connection
  useEffect(() => {
    // create a variable (database) that holds our database details
    const database = getDatabase(firebase);
    // create a variable that makes a reference(ref) to our database
    const dbRef = ref(database);
    // get database info on load or on change
    // use event listener onValue
    onValue(dbRef, (response) => {
      // create an empty array
      const newState = [];
      // use Firebase's .val() to parse our database info into the format we need
      const dataResponse = response.val();
      // data is an object, so we iterate through it using a for in loop to access each voting booth
      for (let key in dataResponse) {
        // inside the loop, we push each book name to the empty Array
        newState.push({ key: key, poll: dataResponse[key] });
      }
      //  set state to match no-longer-empty array
      setPollData(newState);
    })
  }, [])

  function handleSubmitVote(e) {
    e.preventDefault();
    setIsSubmitted(true);
  }



  return (
    <>
      <h1>Voting Booth for Poll: {boothID}</h1>
      {isSubmitted ?
        < VotingConfirmation boothID={boothID}/> :
        <div className="">
          {
            pollData.map((poll, index) => {
              // console.log(boothID);
              // console.log(poll.key)
              return (
                <React.Fragment key={index}>
                  {poll.key === boothID ?
                    <div>
                      <h2 >Booth Number: {poll.key}</h2>
                      <h3 >Question: {poll.poll.pollQuestion}</h3>
                      <p>Description: {poll.poll.pollDescription}</p>
                      <form>
                        <fieldset>
                          <label htmlFor="option-one">{poll.poll.pollOptionOne}</label>
                          <input type="radio" id="option-one" name="choice" />
                          <label htmlFor="option-two">{poll.poll.pollOptionTwo}</label>
                          <input type="radio" id="option-two" name="choice" />
                          <button type="submit" onClick={handleSubmitVote}> Submit</button>
                        </fieldset>
                      </form>
                    </div>
                    : null}
                </React.Fragment>
              )
            })
          }
        </div>}
    </>
  )
}

export default VotingBooth;