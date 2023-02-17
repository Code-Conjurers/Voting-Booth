import firebase from '../Components/Firebase';
import Swal from 'sweetalert2';
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function FindPoll() {
  // Defining State
  const [pollData, setPollData] = useState([]);
  const [dbState, setDbState] = useState();
  // Firebase Connection
  useEffect(() => {
    // create a variable (database) that holds our database details
    const database = getDatabase(firebase);
    // create a variable that makes a reference(ref) to our database
    const dbRef = ref(database);
    setDbState(database);
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
    }// end of onValue
    )//end of onValue
  }, []) //end of useEffect

  function deleteFunction(key) {
    const keyRef = ref(dbState, `/${key}`);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        remove(keyRef);
      }
    })
  }

  console.log(pollData);

  return (
    <>
      <h2>Find a Poll</h2>
      {/* Map through our firebase "Poll Data" and return the poll name & link to the page for each available poll. */}
      {[...pollData].reverse().map((poll, index) => {
        return (
          <>
            <div className="" key={index}>
              <h2>{poll.key}</h2>
              <p>Question: {poll.poll.pollQuestion}</p>
              <p>Description: {poll.poll.pollDescription}</p>
              <Link to={`/votingbooth/${poll.key}`}> Voting Booth</Link>
              <Link to={`/results/${poll.key}`}></Link>
              <button onClick={() => deleteFunction(poll.key)}> Remove </button>
            </div>
          </>
        )
      })}
    </>
  )
};

export default FindPoll;