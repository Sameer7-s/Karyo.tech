import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import App from './App.tsx';
import { AboutExperience } from './components/AboutExperience';
import { WorkPage } from './components/WorkPage';
import { ContactPage } from './components/ContactPage';
import { CustomCursor } from './components/CustomCursor';
import './index.css';

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Sync Lenis with requestAnimationFrame
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutExperience />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <CustomCursor />
    </BrowserRouter>
  </StrictMode>,
);
