// modules
import { Routes, Route } from 'react-router-dom';

// components
import ErrorPage from "./Pages/ErrorPage";
import CreatePoll from './Pages/CreatePoll';
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
      <h1>Voting Booth App!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpoll" element={<CreatePoll />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;