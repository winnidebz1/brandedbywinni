import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnalyticsTracker from './components/AnalyticsTracker';
import ChatWidget from './components/ChatWidget';

// Public Pages
const Home = React.lazy(() => import('./pages/Home'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

// Admin Pages & Components
const Login = React.lazy(() => import('./pages/admin/Login'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const Projects = React.lazy(() => import('./pages/admin/Projects'));
const Leads = React.lazy(() => import('./pages/admin/Leads'));
const Testimonials = React.lazy(() => import('./pages/admin/Testimonials'));
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout'));
const ProtectedRoute = React.lazy(() => import('./components/admin/ProtectedRoute'));
const TestConnection = React.lazy(() => import('./pages/admin/TestConnection'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#F7D9C9]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#644B52]"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PublicLayout = () => {
  return (
    <div className="font-sans antialiased text-brand-text bg-brand-ivory selection:bg-brand-pink selection:text-white">
      <Navbar />
      <main className="w-full flex-grow min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AnalyticsTracker />
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/test" element={<TestConnection />} />

            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route path="leads" element={<Leads />} />
                <Route path="testimonials" element={<Testimonials />} />
              </Route>
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;