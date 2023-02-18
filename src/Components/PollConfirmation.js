import { Link } from "react-router-dom";

function PollConfirmation(pollId) {

    return (
        <>  
        <h2>Your poll has been created!</h2>
            <Link className="button primary" to={`/votingbooth/${pollId.pollId}`}> View Your Poll</Link>
            <button className="button secondary" onClick={() => navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${pollId.pollId}`)}>Copy Poll Link</button>
        </>
    )
}

export default PollConfirmation;