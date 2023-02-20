//Modules
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Confirm from '../assets/confirm.svg';

const PollConfirmation = (pollId) => {
  //function to copy url and save to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`whatever-floats-your-vote.netlify.app/votingbooth/${pollId.pollId}`)
    //alert to confirm link was saved to clipboard
    Swal.fire({
      icon: "success",
      title: "Saved to clipboard!",
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="confirmation-container">
      <h2>Your poll has been created!</h2>
      <div className="confirm-graphic">
        <img src={Confirm} alt="Illustration of a checkmark to confirm that the poll has been created." />
      </div>
      <div className="confirmation-buttons">
        <Link
          className="button primary" aria-label='Copy poll link to clipboard'
          to={`/votingbooth/${pollId.pollId}`}> View Your Poll</Link>
        <button
          className="button secondary"
          onClick={copyToClipboard}>Copy Poll Link</button>
      </div>
    </div>
  );
};

export default PollConfirmation;