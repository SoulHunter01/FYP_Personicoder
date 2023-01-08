import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import Page from './Page';
import RequestAppointment from './RequestAppointment';
import ChatBox from './ChatBox';

function App() {

    return (
        <Router>
      <div className="App">

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/page" element={<Page />} />
              <Route path="/appointment" element={<RequestAppointment />} />
              <Route path="/chat" element={<ChatBox />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    );
}

export default App;
