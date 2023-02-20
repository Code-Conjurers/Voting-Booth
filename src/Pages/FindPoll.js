//Modules
import firebase from "../Components/Firebase";
import Swal from "sweetalert2";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
//Components
import CreatePoll from "./CreatePoll";
//Assets
import SearchGraphic from "../assets/search-graphic-undraw.svg";

const FindPoll = () => {
  //defining State
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
      // use Firebase"s .val() to parse our database info into the format we need
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
  }, []); //end of useEffect

  //function to delete polls from page and firebase
  const deleteFunction = (key) => {
    const keyRef = ref(dbState, `/${key}`);
    //alert to ask for confirmation before poll deletion 
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#724E91",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        //alert to confirm poll is deleted
        Swal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success"
        )
        //removal from firebase
        remove(keyRef);
      }
    });
  };

  return (
    <section className="find-poll-section">
      <h2>Find a Poll</h2>
      {/* Map through our firebase "Poll Data" and return the poll name & link to the page for each available poll. */}
      {[...pollData].reverse().map((poll, index) => {
        return (
          <>
            <div className="find-poll-container" key={index}>
              <div className="h3-container">
                <h3>{poll.poll.pollQuestion}</h3>
              </div>{/* End of .h3-container */}
              <div className="find-poll-links">
                <Link className="button primary" to={`/votingbooth/${poll.key}`}> Voting Booth</Link>
                <Link className="button secondary" to={`/results/${poll.key}`}>See Results</Link>
              </div>
              <button className="delete-button" onClick={() => deleteFunction(poll.key)}><FaTimesCircle className="delete-button-icon" aria-label="Delete Poll" /></button>
            </div>
          </>
        );
      })};
      <div className="find-poll-container no-poll-container">
        <h3>That's all for now...</h3>
        <div className="find-poll-img">
          <img src={SearchGraphic} alt="Illustration of person holding a magnifying glass and searching a document." />
        </div>
        <Link to={`/createpoll`} element={<CreatePoll />} className="button primary"> Create A Poll</Link>
      </div>
    </section>
  );
};

export default FindPoll;