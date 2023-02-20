//Modules
import { Link } from "react-router-dom";
//Assets
import ErrorGraphic from "../assets/error-page-graphic.svg";

const ErrorPage = () => {
  return (
    <>
      <div className="error-img">
      <img src={ErrorGraphic} alt="Illustration of person holding a hammer in front of a computer screen with a bug on it."/>
      </div>
      <h2>Oh no! Page not found!</h2>
      <div className="error-btn">
        <Link to={`/`} className="button primary"> Home</Link>
      </div>
    </>
  );
};

export default ErrorPage;