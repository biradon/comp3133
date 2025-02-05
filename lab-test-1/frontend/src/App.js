import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Chat from './screens/Chat';
import ChatRooms from './screens/ChatRooms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat/:room" element={<Chat />} />
        <Route path="/" element={<ChatRooms/>} />
      </Routes>
    </Router>
  );
}

export default App;
