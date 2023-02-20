//Modules
import { useState } from "react";
import firebase from "./Firebase";
import { getDatabase, ref, push } from "firebase/database";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
//Components
import PollConfirmation from "./PollConfirmation";
//Pages
import FindPoll from "../Pages/FindPoll";


const PollCreation = () => {
  //defining State
  const [pollQuestion, setPollQuestion] = useState("");
  const [optionOneDescription, setOptionOneDescription] = useState("");
  const [optionTwoDescription, setOptionTwoDescription] = useState("");
  const [newPollId, setNewPollId] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  //function for poll creation and upload to firebase
  const addPoll = (e) => {
    e.preventDefault();

    //conditional for if a text field is left empty and return an alert if empty
    if (
      !pollQuestion ||
      !optionOneDescription ||
      !optionTwoDescription
    ) {
      //alert user when a field is left empty
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: "#451F55D",
        text: "Please fill out all fields before submitting the poll!",
      });
      return;
    };

    //key value pairs to show in firebase
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
    };

    //reference the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    //push value of pollObject to the database
    push(dbRef, pollObject)
      .then((newPollRef) => {
        const pollRef = newPollRef.key
        setNewPollId(pollRef);
      });
    setIsSubmitted(true);
    //return poll fields to empty strings after submission
    setPollQuestion("");
    setOptionOneDescription("");
    setOptionTwoDescription("");
  };

  //function to set question field to value entered
  const handleQuestionChange = (e) => {
    setPollQuestion(e.target.value);
  };
  //function to set poll option one to value entered
  const handleOptionOneChange = (e) => {
    setOptionOneDescription(e.target.value);
  };
  //function to set poll option two to value entered
  const handleOptionTwoChange = (e) => {
    setOptionTwoDescription(e.target.value);
  };

  return (
    <section className="create-poll-container">
      {isSubmitted ?
        <PollConfirmation pollId={newPollId} /> :
        <div>
          {
            <>
              <h2 className="create-title">Create Your Poll</h2>
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
                <div className="create-buttons">
                  <button className="button primary" aria-label="create poll" onClick={addPoll}>Submit</button>
                  <Link to={`/findpoll`} element={<FindPoll />} className="button secondary"> Find A Poll</Link>
                </div>
              </form>
            </>
          }
        </div>
      }
    </section>
  );
};

export default PollCreation;