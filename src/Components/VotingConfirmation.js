import { useParams, Link } from 'react-router-dom';

function VotingConfirmation () {
// console.log(boothID.boothID);
// const resultsID = boothID.boothID;
// console.log(resultsID);
  const { boothID } = useParams();
  return (
    <>
    <div className="component-invisible" >
    <h2>Your vote has been recorded!</h2>
      <Link to={`/results/${boothID}`}>View Results</Link>
    </div>
    </>
  )

}

export default VotingConfirmation;