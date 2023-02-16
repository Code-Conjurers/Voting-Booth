import { Link } from "react-router-dom";
import FindPoll from "../Pages/FindPoll";
import Home from "../Pages/Home";
import CreatePoll from "../Pages/CreatePoll";

function NavBar() {
  return (
    <>
    <div className="navBar">
      <ul>
        <li><Link to={`/`} element={<Home />}> Home</Link></li>
        <li> 
          <Link to={`/findpoll`} element={<FindPoll />}> Find A Poll</Link>
        </li>
        <li>
          <Link to={`/createpoll`} element={<CreatePoll />}> Create A Poll</Link>
        </li>
      </ul>
    </div>
    </>
  )
}

export default NavBar;