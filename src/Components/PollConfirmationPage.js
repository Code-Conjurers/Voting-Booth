import { Link } from "react-router-dom";

function PollConfirmationPage (pollId){
    
    return(
        <>
         <Link to={`/votingbooth/${pollId.pollId}`}> Check out your poll!</Link>
        </>
    )
}

export default PollConfirmationPage;