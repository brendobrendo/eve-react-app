import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, Home, History, About, Contact, SubmitForm, MemoryDetail, MemoryUpdate } from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} >
        <Route path="history" element={<History />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/form" element={<SubmitForm />} />
      <Route path="/memorydetail/:id" element={<MemoryDetail />} />
      <Route path="/updatedetail/:id" element={<MemoryUpdate />} />
    </Routes>
  </BrowserRouter>
);
