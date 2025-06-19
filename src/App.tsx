// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Users from './pages/users';
import Albums from './pages/albums';
import Photos from './pages/photos';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<Users />} />
          <Route path="/users/:userId/albums" element={<Albums />} />
          <Route path="/albums/:albumId/photos" element={<Photos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
