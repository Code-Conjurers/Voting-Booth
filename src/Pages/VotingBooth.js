// Modules
import * as React from 'react'
import firebase from '../Components/Firebase';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useParams, } from 'react-router-dom';
import VotingConfirmation from '../Components/VotingConfirmation';

function VotingBooth() {
  // Defining State
  const [pollData, setPollData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { boothID } = useParams();
  const [getValue, setGetValue] = useState();

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

  function handleSubmitVote(e, poll) {
    e.preventDefault();

    setIsSubmitted(true);
    console.log(poll);
    const votingObject = {
      ...poll.poll,
    };

    if (getValue === 'pollOptionOne') {
      votingObject.pollOptionOne.votes = votingObject.pollOptionOne.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else if (getValue === 'pollOptionTwo') {
      votingObject.pollOptionTwo.votes = votingObject.pollOptionTwo.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else {
      // Alert the user if no vote was submitted
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You must choose an option, fence-sitter!',
      });
      setIsSubmitted(false);
      return;
    }

    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${poll.key}`);
    update(dbRef, votingObject);
  }

  function onChangeValue(e) {
    setGetValue(e.target.value);
  }




  return (
    <>
      {isSubmitted ?
        < VotingConfirmation boothID={boothID} /> :
        <div className="">
          {
            pollData.map((poll, index) => {
              // console.log(boothID);
              // console.log(poll.key)
              return (
                <React.Fragment key={index}>
                  {poll.key === boothID ?
                    <div>
                      <h3 >Question: {poll.poll.pollQuestion}</h3>
                      <p>Description: {poll.poll.pollDescription}</p>
                      <form onSubmit={(e) => { handleSubmitVote(e, poll) }}>
                        <fieldset onChange={onChangeValue}>
                          <label htmlFor="option-one">{poll.poll.pollOptionOne.optionOneDescription}</label>
                          <input type="radio" id="option-one" name="choice" value="pollOptionOne" />
                          <label htmlFor="option-two">{poll.poll.pollOptionTwo.optionTwoDescription}</label>
                          <input type="radio" id="option-two" name="choice" value="pollOptionTwo" />
                          <button type="submit"> Submit</button>
                        </fieldset>
                      </form>
                      <button onClick={() => navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${boothID}`)}>Copy poll link</button>
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

// const handleVoteChange = (e) => {

//   };
//   const handleTotalVoteChange = (e) => {

//   };