// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URA from './URA';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<URA />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
