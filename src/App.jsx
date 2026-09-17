import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import QueueSimulator from './pages/QueueSimulator';
import StackSimulator from './pages/StackSimulator';
import PriorityQueueSimulator from './pages/PriorityQueueSimulator';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/queue" element={<QueueSimulator />} />
            <Route path="/stack" element={<StackSimulator />} />
            <Route path="/priority-queue" element={<PriorityQueueSimulator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
