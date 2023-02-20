//modules
import {Link} from "react-router-dom";
//components
import ResultsBar from "../Components/ResultsBar";
//pages
import FindPoll from "./FindPoll";
import Home from "./Home";

const Results = () => {
  return (
    <section className ="results">
      <h2 className="results-h2">The results are in:</h2>
      <ResultsBar />
      <div className="results-buttons">
        <Link to={`/`} element={<Home />} className="button primary">Home</Link>
        <Link to={`/findpoll`} element={<FindPoll />} className="button secondary">Find Another Poll</Link>
      </div>
    </section>
  );
};

export default Results;