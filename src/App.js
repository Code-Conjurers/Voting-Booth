// modules
import { Routes, Route } from 'react-router-dom';

// components
import ErrorPage from "./Pages/ErrorPage";
import CreatePoll from './Pages/CreatePoll';
import FindPoll from './Pages/FindPoll';
import VotingBooth from './Pages/VotingBooth';
import Results from './Pages/Results';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home';

// CSS
import './App.scss';


function App() {

  return (
    <div className="app wrapper">
      <header>
        <NavBar />
        <div className="header-h1">
        <h1>Voting Booth App</h1>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpoll" element={<CreatePoll />} />
          <Route path="/findpoll" element={<FindPoll />} />
          <Route path="/votingbooth/:boothID" element={<VotingBooth />} />
          <Route path="/results/:boothID" element={<Results />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;