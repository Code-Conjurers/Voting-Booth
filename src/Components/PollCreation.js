import { useState } from "react";
import firebase from "./Firebase";
import { getDatabase, ref, push } from "firebase/database"
import PollConfirmationPage from "./PollConfirmationPage";

function PollCreationPage() {

  // const [pollData, setPollData] = useState([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [optionOneDescription, setOptionOneDescription] = useState("");
  const [optionTwoDescription, setOptionTwoDescription] = useState("");
  const [newPollId, setNewPollId] = useState();

  const addPoll = (e) => {
    e.preventDefault();

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

    //Option 1
      //creating a function that adds 1 to the votes node in firebase
      //grab the value from firebase, create a function that adds 1
      //use set() to override the previous number to display the new number
      //need a function in firebase to pull the vote node and run it in a math function to calculate the percent
      //need to calculate the total number of votes
        //also add a +1 function to a totalVotes node in firebase
      //use a math function to calculate the percentage by pulling the vote option node / total number of votes

    //Option 2
      //use snapshot to bring total voting data to React
      //use a count function to count all the child nodes (?) for that particular poll option to generate a number
      //use the previous number and pass it through a math function to calculate total votes as well as votes for a singular option to generate percent

    // Reference the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // Push value of pollObject  to the database
    push(dbRef, pollObject)
      .then((newPollRef) => {
        const pollRef = newPollRef.key
        setNewPollId(pollRef);
    });

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
  
  console.log(newPollId);
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

      <PollConfirmationPage pollId={newPollId}/>
    </div>
  )
}

export default PollCreationPage;