import { useParams, Link } from 'react-router-dom';
import votingConfirmationImg from '../assets/voting-confirmation.png'

function VotingConfirmation () {

  const { boothID } = useParams();

  return (
    <>
    <div className="confirmation-container">
      
      <img src={votingConfirmationImg} alt="Person holding a tablet with a checkmark on their screen"/>
      
      <h2>Your vote has been recorded!</h2>

      <div className="button-container">
        <Link className="button primary" to={`/results/${boothID}`}>View Results</Link>
      </div>

    </div>
    </>
  )
}

export default VotingConfirmation;