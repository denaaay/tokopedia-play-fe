import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Home from './Pages/Home';
import Video from './Pages/Video';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const [username, setUsername] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const baseUrl = 'https://good-plum-termite-wig.cyclic.cloud/api'

  useEffect(() => {    
    const storedToken = localStorage.getItem('sessionToken');
    if (storedToken !== '') {
      setSessionToken(storedToken);
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername !== '') {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Router>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.5" />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home username={username} sessionToken={sessionToken} baseUrl={baseUrl}/>}></Route>
        <Route path="/video/:videoId" element={<Video sessionToken={sessionToken} baseUrl={baseUrl}/>}></Route>
        <Route path='/login' element={<Login baseUrl={baseUrl}/>}></Route>
        <Route path='/register' element={<Register baseUrl={baseUrl}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
