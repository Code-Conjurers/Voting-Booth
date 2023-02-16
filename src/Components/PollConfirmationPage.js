import { Link } from "react-router-dom";

function PollConfirmationPage (pollId){
    
    return(
        <>
         <Link to={`/votingbooth/${pollId.pollId}`}> Check out your poll!</Link>
         <button onClick={() => navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${pollId.pollId}`)}>Copy poll link</button>
        </>
    )
}

export default PollConfirmationPage;