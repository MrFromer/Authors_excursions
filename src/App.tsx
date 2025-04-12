import SignUp from './SignUp';
import LogIn from './LogIn';
import DefaultPage from './DefaultPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestorePassword from './RestorePassword';
import MailVerification from './MailVerification';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/restore-password/' element={RestorePassword()} />
        <Route path='/' element={DefaultPage()} />
        <Route path='/login/' element={LogIn()} />
        <Route path='/signup/' element={SignUp()} />
        <Route path='/confirm-email/' element={MailVerification()} />
      </Routes>
    </Router>
  )
}

export default App
