// modules
import { Routes, Route, Link } from 'react-router-dom';

// components
import ErrorPage from "./Pages/ErrorPage";
import CreatePoll from './Pages/CreatePoll';
import FindPoll from './Pages/FindPoll';
import VotingBooth from './Pages/VotingBooth';
import Results from './Pages/Results';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

// CSS
import './App.scss';

// Mock Components

function App() {

  return (
    <div className="App">
      <NavBar />
      <h1>Voting Booth App</h1>
      <Link to={`/createpoll`}> Create A Poll</Link>
      <Link to={`/findpoll`}> Find A Poll</Link>
      <h2></h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpoll" element={<CreatePoll />} />
          <Route path="/findpoll" element={<FindPoll />} />
          <Route path="/votingbooth/:boothID" element={<VotingBooth />} />
          <Route path="/results/:boothID" element={<Results />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;