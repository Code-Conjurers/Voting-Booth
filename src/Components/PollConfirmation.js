//Modules
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PollConfirmation = (pollId) => {
    //function to copy url and save to clipboard
    const copyToClipboard = () => {navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${pollId.pollId}`) 
        //alert to confirm link was saved to clipboard
        Swal.fire({
            icon: "success",
            title: "Saved to clipboard!",
            showConfirmButton: false,
            timer: 1500
        });  
    };
    
    return (
        <>  
        <h2>Your poll has been created!</h2>
        <Link className="button primary" aria-label="Copy poll link to clipboard" to={`/votingbooth/${pollId.pollId}`}>View Your Poll</Link>
        <button className="button secondary" onClick={copyToClipboard}>Copy Poll Link</button>
        </>
    );
};

export default PollConfirmation;