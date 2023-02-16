import CreatePoll from "./CreatePoll";
import FindPoll from "./FindPoll";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
        <Link to={`/createpoll`} element={<CreatePoll />}> Create A Poll</Link>
        <Link to={`/findpoll`} element={<FindPoll />}> Find A Poll</Link>
        </>
    )
}

export default Home;