//Modules
import { Link } from "react-router-dom";
//Pages
import FindPoll from "../Pages/FindPoll";
import Home from "../Pages/Home";
import CreatePoll from "../Pages/CreatePoll";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <h1>
        <Link className="h1-link" to={`/`} element={<Home />}> Whatever Floats Your Vote </Link>
      </h1>
      <div className="create-find">
        <ul className="nav-ul" >
          <li>
            <Link className="menu-link" to={`/createpoll`} element={<CreatePoll />}> Create A Poll</Link>
          </li>
          <li>
            <Link className="menu-link" to={`/findpoll`} element={<FindPoll />}> Find A Poll</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;