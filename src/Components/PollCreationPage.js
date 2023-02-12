import { useState } from "react";
import "firebase/compat/database";
import firebase from 'firebase/compat/app';

function PollCreationPage() {

    // const firebaseConfig = {
    //     apiKey: "AIzaSyDX24f-P7A7fChNLQBSNxdY25g6tZ_uKKw",
    //     authDomain: "voting-booth-1005f.firebaseapp.com",
    //     projectId: "voting-booth-1005f",
    //     storageBucket: "voting-booth-1005f.appspot.com",
    //     messagingSenderId: "864327155103",
    //     appId: "1:864327155103:web:ed3c007b75d5375ca111aa"
    //   };
      
    //   // Initialize Firebase
    //   firebase.initializeApp(firebaseConfig);

    // const [pollData, setPollData] = useState([]);
    const [pollQuestion, setPollQuestion] = useState("");
    const [pollDescription, setPollDescription] = useState("");
    const [pollOptionOne, setPollOptionOne] = useState("");
    const [pollOptionTwo, setPollOptionTwo] = useState("");

    const addPoll = (e) => {
        if (pollQuestion !== "" && pollDescription !== "" && pollOptionOne !== "" && pollOptionTwo !== "") {
            e.preventDefault();
            firebase.database().ref("poll").push({
                pollQuestion: pollQuestion,
                pollDescription: pollDescription,
                pollOptionOne: pollOptionOne,
                pollOptionTwo: pollOptionTwo
            })
            console.log("success");
        }
        console.log("success");

        // setPollQuestion("");
        // setPollDescription("");
        // setPollOptionOne("");
        // setPollOptionTwo("");
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
                <button aria-label="create poll" onClick={() => addPoll ()}>Submit</button>
            </form>
            <button>Go Back</button>
        </div>
    )
}

export default PollCreationPage;