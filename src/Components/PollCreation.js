import { useState } from "react";
import firebase from "./Firebase";
import { getDatabase, ref, push } from "firebase/database";
import { Link } from "react-router-dom";
import PollConfirmation from "./PollConfirmation";
import FindPoll from "../Pages/FindPoll";
import Swal from 'sweetalert2';

function PollCreation() {

  const [pollQuestion, setPollQuestion] = useState("");
  const [optionOneDescription, setOptionOneDescription] = useState("");
  const [optionTwoDescription, setOptionTwoDescription] = useState("");
  const [newPollId, setNewPollId] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addPoll = (e) => {
    e.preventDefault();

    if (
      !pollQuestion ||
      !optionOneDescription ||
      !optionTwoDescription
    ) {
      // Alert the user and return early
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonColor: '#451F55D',
        text: 'Please fill out all fields before submitting the poll!',
      });
      return;
    }

    const pollObject = {
      pollQuestion: pollQuestion,
      pollOptionOne: {
        optionOneDescription: optionOneDescription,
        votes: 0
      },
      pollOptionTwo: {
        optionTwoDescription: optionTwoDescription,
        votes: 0
      },
      totalVotes: 0

    }

    // Reference the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);



    // Push value of pollObject  to the database
    push(dbRef, pollObject)
      .then((newPollRef) => {
        const pollRef = newPollRef.key
        setNewPollId(pollRef);
      });
    setIsSubmitted(true);
    setPollQuestion("");
    setOptionOneDescription("");
    setOptionTwoDescription("");
  }

  const handleQuestionChange = (e) => {
    setPollQuestion(e.target.value);
  };
  
  const handleOptionOneChange = (e) => {
    setOptionOneDescription(e.target.value);
  };
  const handleOptionTwoChange = (e) => {
    setOptionTwoDescription(e.target.value);
  };


  return (
    <>
      <div className="create-poll-h2">
        <h2>Create A Poll</h2>
      </div>
      <div className="create-poll-container">
        {isSubmitted ?
          <PollConfirmation pollId={newPollId} /> :
          <div>
            {
              <>
                <form className="create-poll-form">
                  <input
                    type="text"
                    maxLength={80}
                    className="poll-input poll-question"
                    name="poll-question"
                    placeholder="Poll Question"
                    value={pollQuestion}
                    onChange={handleQuestionChange}
                    aria-label="Poll Question"
                  />
                  <h3>Enter your polling options:</h3>

                  <input
                    type="text"
                    maxLength={40}
                    className="poll-input poll-option-one"
                    name="poll-option-one"
                    placeholder="Option One"
                    value={optionOneDescription}
                    onChange={handleOptionOneChange}
                    aria-label="Poll Option One"
                  />
                  <input
                    type="text"
                    maxLength={40}
                    className="poll-input poll-option-two"
                    name="poll-option-two"
                    placeholder="Option Two"
                    value={optionTwoDescription}
                    onChange={handleOptionTwoChange}
                    aria-label="Poll Option Two"
                  />
                </form>
                <button className="button primary" aria-label="create poll" onClick={addPoll}>Submit</button>
                <Link to={`/findpoll`} element={<FindPoll />} className="button secondary"> Find A Poll</Link>
              </>
            }
          </div>}
      </div> {/* End of .create-poll-container */}
    </>
  )
}


export default PollCreation;