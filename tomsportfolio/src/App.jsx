import './App.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';
import TextDemo from './pages/TextDemo';
import Hobbies from './pages/Hobbies';
import CodingNightmares from './pages/CodingNightmares';

function App() {
  return (
      <Router>
          <Navbar />
          <div className="container mt-4">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/text-demo" element={<TextDemo />} />
                  <Route path="/hobbies" element={<Hobbies />} />
                  <Route path="/coding-nightmares" element={<CodingNightmares />} />
              </Routes>
          </div>
      </Router>
  )
}


export default App
