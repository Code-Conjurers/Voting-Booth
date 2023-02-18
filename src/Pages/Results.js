import {Link} from "react-router-dom";
import ResultsBar from "../Components/ResultsBar";
import FindPoll from "./FindPoll";
import Home from "./Home";

function Results() {
  return (
    <>
    <h2>THESE ARE THE RESULTS</h2>
    <ResultsBar />
      <Link to={`/`} element={<Home />} className="button primary">Home</Link>
      <Link to={`/findpoll`} element={<FindPoll />} className="button secondary">Find Another Poll</Link>
    </>
  )
};

export default Results;