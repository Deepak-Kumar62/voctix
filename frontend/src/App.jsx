import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import Authenticate from './pages/Authenticate'

function App() {

  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/auth' element={<Authenticate />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
