import { useState } from "react";
import firebase from "./Firebase";
import { getDatabase, ref, push } from "firebase/database"
import PollConfirmationPage from "./PollConfirmationPage";
import Swal from 'sweetalert2';

function PollCreationPage() {

  // const [pollData, setPollData] = useState([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollDescription, setPollDescription] = useState("");
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
        text: 'Please fill out all fields before submitting the poll, you schmuck!',
      });
      return;
    }

    const pollObject = {
      pollQuestion: pollQuestion,
      pollDescription: pollDescription,
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
    setPollDescription("");
    setOptionOneDescription("");
    setOptionTwoDescription("");
  }

  const handleQuestionChange = (e) => {
    setPollQuestion(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setPollDescription(e.target.value);
  };
  const handleOptionOneChange = (e) => {
    setOptionOneDescription(e.target.value);
  };
  const handleOptionTwoChange = (e) => {
    setOptionTwoDescription(e.target.value);
  };


  return (
    <>

      <h2>Create A Poll</h2>
      {isSubmitted ?
        <PollConfirmationPage pollId={newPollId} /> :
        <div className="">
          {
            <>
              <form>
                <input
                  type="text"
                  className="poll-input poll-question"
                  name="poll-question"
                  placeholder="Poll Question"
                  value={pollQuestion}
                  onChange={handleQuestionChange}
                  aria-label="Poll Question"
                />
                <textarea
                  className="poll-input poll-description"
                  name="poll-description"
                  placeholder="Poll Description"
                  value={pollDescription}
                  onChange={handleDescriptionChange}
                  aria-label="Poll Description"
                ></textarea>

                <h2>Enter your polling options:</h2>

                <input
                  type="text"
                  className="poll-input poll-option-one"
                  name="poll-option-one"
                  placeholder="Option One"
                  value={optionOneDescription}
                  onChange={handleOptionOneChange}
                  aria-label="Poll Option One"
                />
                <input
                  type="text"
                  className="poll-input poll-option-two"
                  name="poll-option-two"
                  placeholder="Option Two"
                  value={optionTwoDescription}
                  onChange={handleOptionTwoChange}
                  aria-label="Poll Option Two"
                />
                <button aria-label="create poll" onClick={addPoll}>Submit</button>
              </form>
              <button>Go Back</button>
            </>
          }
        </div>}

    </>
  )
}


export default PollCreationPage;