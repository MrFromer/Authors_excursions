import SignUp from './SignUp';
import LogIn from './LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestorePassword from './RestorePassword';
import MailVerification from './MailVerification';
import CreateExcursion from './CreateExcursion';
import MainPage from './MainPage';
import { useEffect } from 'react';


function App() {
  useEffect(()=> {
    document.title = "Авторские экскурсии"
  })
  return (
    <Router>
      <Routes>
        <Route path='/create-excursion' element={<CreateExcursion />} />
        <Route path="/restore-password" element={<RestorePassword />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm-email" element={<MailVerification />} />
      </Routes>
    </Router>
  )
}

export default App
