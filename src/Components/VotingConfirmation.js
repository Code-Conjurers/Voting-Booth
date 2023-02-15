import { useParams, Link } from 'react-router-dom';

import ResultsBar from './ResultsBar';

function VotingConfirmation (boothID) {
console.log(boothID.boothID);
const resultsID = boothID.boothID;
console.log(resultsID);
  // const { boothID } = useParams();
  return (
    <>
    <div className="component-invisible" >
    <h2>Your vote has been recorded!</h2>
      <Link to={`/results/${resultsID}`}>View Results</Link>
      <ResultsBar boothID={boothID.boothID}/>
    </div>
    </>
  )

}

export default VotingConfirmation;