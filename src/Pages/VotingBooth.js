// Modules
// Modules
import * as React from 'react'
import firebase from '../Components/Firebase';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useParams } from 'react-router-dom';
import VotingConfirmation from '../Components/VotingConfirmation';
import { Link } from "react-router-dom";
import votingImage from '../assets/voting-booth.png'

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
    const votingObject = {
      ...poll.poll,
    };

    if (getValue === 'pollOptionOne') {
      votingObject.pollOptionOne.votes = votingObject.pollOptionOne.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else if (getValue === 'pollOptionTwo') {
      votingObject.pollOptionTwo.votes = votingObject.pollOptionTwo.votes + 1;
      votingObject.totalVotes = votingObject.pollOptionOne.votes + votingObject.pollOptionTwo.votes;
    } else if (getValue === "copy"){
      // Alert the link is copied
      Swal.fire({
        icon: "success",
        text: 'Link is copied to your clipboard!',
      });
      setIsSubmitted(false);
      return;
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

  function clickHandler(e, poll){
    e.preventDefault();

    navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${poll.key}`)
    
    Swal.fire({
      icon: "success",
      text: 'Link copied!',
      timer: 1500
    });
    setIsSubmitted(false);
    return;
  }

  return (
    <>
      {isSubmitted ?
        < VotingConfirmation boothID={boothID} /> :
        <section className="voting-ticket">
          {
            pollData.map((poll, index) => {
              return (
                <React.Fragment key={index}>
                  {poll.key === boothID ?
                    <div className="voting-booth-container">
                      <img src={votingImage} alt="Group of people voting digitally on a monitor"/>
                      <div className="voting-question">
                        <h3>Question <span className="poll-heading">{poll.poll.pollQuestion}</span></h3>
                      </div>
                      <form onSubmit={(e) => { handleSubmitVote(e, poll) }}>
                        <fieldset onChange={onChangeValue} className="voting-form">
                          <div className="selection-container">
                            <input type="radio" id="option-one" name="choice" value="pollOptionOne" />
                            <label htmlFor="option-one">{poll.poll.pollOptionOne.optionOneDescription}</label>
                          </div>

                          <div className="selection-container">
                            <input type="radio" id="option-two" name="choice" value="pollOptionTwo" />
                            <label htmlFor="option-two">{poll.poll.pollOptionTwo.optionTwoDescription}</label>
                          </div>
                          
                        </fieldset>
                        <div className="button-container">

                          <button className='button primary' type="submit"> Submit</button>

                          <div className="secondary-buttons">
                            <button className='button secondary' aria-label='Copy poll link to keyboard.' value="copy" onClick={(e) => {clickHandler(e, poll)}}>Copy Poll Link</button>
                            <Link className="button secondary" to={`/results/${boothID}`}>See Results Only</Link>
                          </div>
                          
                        </div>
                      </form>
                    </div>
                    : null}
                </React.Fragment>
              )
            })
          }
        </section>}
    </>
  )
}

export default VotingBooth;