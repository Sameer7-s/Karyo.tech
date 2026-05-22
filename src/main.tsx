/// <reference types="vite/client" />
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import App from './App.tsx';
import { AboutExperience } from './components/AboutExperience';
import { WorkPage } from './components/WorkPage';
import { ContactPage } from './components/ContactPage';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './components/common/Toast';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Loader } from './components/common/Loader';
import './index.css';

const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const Contacts = lazy(() => import('./pages/Admin/Contacts'));
const ServiceRequests = lazy(() => import('./pages/Admin/ServiceRequests'));
const ProjectInquiries = lazy(() => import('./pages/Admin/ProjectInquiries'));
const Newsletter = lazy(() => import('./pages/Admin/Newsletter'));
const Feedback = lazy(() => import('./pages/Admin/Feedback'));
const Settings = lazy(() => import('./pages/Admin/Settings'));

// Disable browser scroll-restoration globally so refresh always starts at top
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Initialize Lenis smooth scrolling
let lenis: Lenis | null = null;
let rafId: number | null = null;

function startLenis() {
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis!.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);
}

function stopLenis() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

startLenis();

// HMR cleanup (Vite dev only)
if (import.meta.hot) {
  import.meta.hot.dispose(() => stopLenis());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* Resets scroll on every route change */}
          <ScrollToTop />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/about" element={<AboutExperience />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/projects" element={<WorkPage />} />
              <Route path="/services" element={<App />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
              <Route path="/admin">
                <Route index element={<AdminLogin />} />
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="service-requests" element={<ServiceRequests />} />
                    <Route path="project-inquiries" element={<ProjectInquiries />} />
                    <Route path="newsletter" element={<Newsletter />} />
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </Suspense>
          <CustomCursor />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
