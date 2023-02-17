import CreatePoll from "./CreatePoll";
import FindPoll from "./FindPoll";
import { Link } from "react-router-dom";
import HomeGraphic from "../assets/voting-home-graphic.svg"

function Home() {
    return (
        <>
            <div className="home-graphic">
                <img src={HomeGraphic} alt="Illustration of people putting a ballot into a voting box." />
            </div>
            <Link to={`/createpoll`} element={<CreatePoll />} className="button primary"> Create A Poll</Link>
            <Link to={`/findpoll`} element={<FindPoll />} className="button secondary"> Find A Poll</Link>
        </>
    )
}

export default Home;