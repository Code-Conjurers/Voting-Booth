import firebase from '../Components/Firebase';
import { getDatabase, ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function FindPoll() {
  // Defining State
  const [pollData, setPollData] = useState([]);
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

  console.log(pollData[0]);

  return (
    <>
      <h2>Find a Poll</h2>
      {/* Map through our firebase "Poll Data" and return the poll name & link to the page for each available poll. */}
      {pollData.map((poll, index) => {
        return (
          <div className="" key={index}>
            <h2>{poll.key}</h2>
            <p>Question: {poll.poll.pollQuestion}</p>
            <p>Description: {poll.poll.pollDescription}</p>
            <Link to={`/votingbooth/${poll.key}`}> Voting Booth</Link>
          </div>
        )
        
      })}
    </>
  )
};

export default FindPoll;