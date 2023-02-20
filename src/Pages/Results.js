import {Link} from "react-router-dom";
import ResultsBar from "../Components/ResultsBar";
import FindPoll from "./FindPoll";
import Home from "./Home";

function Results() {
  return (
    <section className ="results">
    <h2 className="results-h2">The results are in:</h2>
    <ResultsBar />
    <div className="results-buttons">
      <Link to={`/`} element={<Home />} className="button primary">Home</Link>
      <Link to={`/findpoll`} element={<FindPoll />} className="button secondary">Find Another Poll</Link>
    </div>
    </section>
  )
};

export default Results;