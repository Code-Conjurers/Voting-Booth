import { useState } from "react";
import firebase from "./Firebase";
import { getDatabase, ref, push } from "firebase/database"

function PollCreationPage() {

  // const [pollData, setPollData] = useState([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [pollOptionOne, setPollOptionOne] = useState("");
  const [pollOptionTwo, setPollOptionTwo] = useState("");


  const addPoll = (e) => {
    e.preventDefault();

    const pollObject = {
      pollQuestion: pollQuestion,
      pollDescription: pollDescription,
      pollOptionOne: pollOptionOne,
      pollOptionTwo: pollOptionTwo
    }

    // Reference the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // Push value of pollObject  to the database
    push(dbRef, pollObject);

    setPollQuestion("");
    setPollDescription("");
    setPollOptionOne("");
    setPollOptionTwo("");
  }

  const handleQuestionChange = (e) => {
    setPollQuestion(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setPollDescription(e.target.value);
  };
  const handleOptionOneChange = (e) => {
    setPollOptionOne(e.target.value);
  };
  const handleOptionTwoChange = (e) => {
    setPollOptionTwo(e.target.value);
  };

  return (
    <div>
      <h2>Create A Poll</h2>
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
          value={pollOptionOne}
          onChange={handleOptionOneChange}
          aria-label="Poll Option One"
        />
        <input
          type="text"
          className="poll-input poll-option-two"
          name="poll-option-two"
          placeholder="Option Two"
          value={pollOptionTwo}
          onChange={handleOptionTwoChange}
          aria-label="Poll Option Two"
        />
        <button aria-label="create poll" onClick={addPoll}>Submit</button>
      </form>
      <button>Go Back</button>
    </div>
  )
}

export default PollCreationPage;