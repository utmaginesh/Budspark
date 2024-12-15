import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/landing/Landing';
import LoginSignup from './components/LoginPage/LoginSignup';
import Combine from './components/dashboard/Combine';
import { UserProvider } from './UserContext';
import AdminCombine from './components/AdminDashboard/AdminCombine';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path='/dashboard' element={<Combine/>}/>
            <Route path='/admindashboard' element={<AdminCombine/>}/>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
