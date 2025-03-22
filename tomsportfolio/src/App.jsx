import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';
import TextDemo from './pages/TextDemo';
import Hobbies from './pages/Hobbies';
import CodingNightmares from './pages/CodingNightmares';

function App() {
  const [count, setCount] = useState(0)

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
