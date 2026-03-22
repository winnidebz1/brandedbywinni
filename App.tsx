import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnalyticsTracker from './components/AnalyticsTracker';
import ChatWidget from './components/ChatWidget';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import { PricingProvider } from './context/PricingContext';

// Public Pages
const Home = React.lazy(() => import('./pages/Home'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CustomQuotePage = React.lazy(() => import('./pages/CustomQuotePage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));

// Portal / Admin Pages
const Login = React.lazy(() => import('./pages/admin/Login'));
const PortalLogin = React.lazy(() => import('./pages/admin/PortalLogin')); // New Portal Login
const PortalForgotPassword = React.lazy(() => import('./pages/admin/PortalForgotPassword'));
const PortalUpdatePassword = React.lazy(() => import('./pages/admin/PortalUpdatePassword'));
const PortalDashboard = React.lazy(() => import('./pages/admin/PortalDashboard'));
const PortalTasks = React.lazy(() => import('./pages/admin/PortalTasks'));
const PortalProjects = React.lazy(() => import('./pages/admin/PortalProjects'));
const PortalSOPs = React.lazy(() => import('./pages/admin/PortalSOPs'));
const PortalFeedback = React.lazy(() => import('./pages/admin/PortalFeedback'));
const PortalRules = React.lazy(() => import('./pages/admin/PortalRules'));
const PortalAnnouncements = React.lazy(() => import('./pages/admin/PortalAnnouncements'));
const PortalFinance = React.lazy(() => import('./pages/admin/PortalFinance')); // Finance Module
const PortalFinanceGoals = React.lazy(() => import('./pages/admin/PortalFinanceGoals'));
const PortalFinanceIncome = React.lazy(() => import('./pages/admin/PortalFinanceIncome'));
const PortalFinanceExpenses = React.lazy(() => import('./pages/admin/PortalFinanceExpenses'));
const PortalFinanceReports = React.lazy(() => import('./pages/admin/PortalFinanceReports'));
const PortalSiteEditor = React.lazy(() => import('./pages/admin/PortalSiteEditor'));

// Legacy/Website Admin Pages
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const PortfolioProjects = React.lazy(() => import('./pages/admin/Projects')); // Renamed from Projects
const Leads = React.lazy(() => import('./pages/admin/Leads'));
const Clients = React.lazy(() => import('./pages/admin/Clients'));
const Analytics = React.lazy(() => import('./pages/admin/Analytics'));
const Settings = React.lazy(() => import('./pages/admin/Settings'));
const Testimonials = React.lazy(() => import('./pages/admin/Testimonials'));
const Reviews = React.lazy(() => import('./pages/admin/Reviews'));
const ReviewsPublic = React.lazy(() => import('./pages/ReviewsPublic'));

const PortalLayout = React.lazy(() => import('./components/admin/PortalLayout')); // Use new layout
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout')); // Use legacy layout
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
      <CartDrawer />
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
      <PricingProvider>
        <CartProvider>
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
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/custom-quote" element={<CustomQuotePage />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/project/:slug" element={<ProjectDetail />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/review-us" element={<ReviewsPublic />} />
                </Route>

                {/* Legacy Admin Routes (Restored) */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/test" element={<TestConnection />} />

                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} /> {/* Default to Dashboard */}
                    {/* Re-mapping legacy routes */}
                    <Route path="projects" element={<PortfolioProjects />} />
                    <Route path="leads" element={<Leads />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="testimonials" element={<Testimonials />} />
                  </Route>
                </Route>

                {/* New Portal Routes */}
                <Route path="/portal/login" element={<PortalLogin />} />
                <Route path="/portal/forgot-password" element={<PortalForgotPassword />} />
                <Route path="/portal/update-password" element={<PortalUpdatePassword />} />

                <Route path="/portal" element={<ProtectedRoute />}>
                  <Route element={<PortalLayout />}>
                    <Route index element={<PortalDashboard />} />
                    <Route path="editor" element={<PortalSiteEditor />} />

                    {/* Portal Modules */}
                    <Route path="tasks" element={<PortalTasks />} />
                    <Route path="projects" element={<PortalProjects />} />
                    <Route path="sops" element={<PortalSOPs />} />
                    <Route path="sops/:slug" element={<PortalSOPs />} />
                    <Route path="feedback" element={<PortalFeedback />} />
                    <Route path="rules" element={<PortalRules />} />
                    <Route path="announcements" element={<PortalAnnouncements />} />
                    <Route path="finance" element={<PortalFinance />} />
                    <Route path="finance/goals" element={<PortalFinanceGoals />} />
                    <Route path="finance/income" element={<PortalFinanceIncome />} />
                    <Route path="finance/expenses" element={<PortalFinanceExpenses />} />
                    <Route path="finance/reports" element={<PortalFinanceReports />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Route>

              </Routes>
            </React.Suspense>
          </Router>
        </CartProvider>
      </PricingProvider>
    </HelmetProvider>
  );
};

export default App;
