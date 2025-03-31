import SignUp from './SignUp';
import LogIn from './LogIn';
import DefaultPage from './DefaultPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={DefaultPage()} />
        <Route path='/login/' element={LogIn()} />
        <Route path='/signup/' element={SignUp()} />
      </Routes>
    </Router>
  )
}

export default App
