import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import Authenticate from './pages/Authenticate'
import { AuthContextProvider } from './contexts/AuthContext'
import VideoMeet from './pages/VideoMeet'

function App() {

  return (
    <div>

      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/auth' element={<Authenticate />} />
            <Route path='/:url' element={<VideoMeet />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  )
}

export default App
