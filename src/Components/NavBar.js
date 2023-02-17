import { Link } from "react-router-dom";
import FindPoll from "../Pages/FindPoll";
import Home from "../Pages/Home";
import CreatePoll from "../Pages/CreatePoll";


function NavBar() {
  return (
    <div className="nav-bar">
      <ul className="nav-ul" >
        <li><Link className="menu-link" to={`/`} element={<Home />}> Home </Link></li>
        <li>
          <Link className="menu-link" to={`/createpoll`} element={<CreatePoll />}> Create A Poll</Link>
        </li>
        <li> 
          <Link className="menu-link" to={`/findpoll`} element={<FindPoll />}> Find A Poll</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar;