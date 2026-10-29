import React, { useState, useEffect } from 'react';
import { useCanteen, CanteenProvider } from './context/CanteenContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationView } from './components/OrderConfirmationView';
import { TrackOrderView } from './components/TrackOrderView';
import { OrderHistoryView } from './components/OrderHistoryView';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CheckoutBinFloating } from './components/CheckoutBinFloating';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Toast } from './components/Toast';
import { PressureCookerLoader } from './components/PressureCookerLoader';

const AppContent = () => {
  const { activeView, setActiveView, isAdminAuthenticated } = useCanteen();
  const [showCookerLoader, setShowCookerLoader] = useState(true);

  // Support direct hash or URL path inspection (e.g. #/admin or /admin)
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash.includes('admin') || path.includes('/admin')) {
        if (isAdminAuthenticated) {
          setActiveView('admin-dashboard');
        } else {
          setActiveView('admin-login');
        }
      } else if (hash.includes('track') || path.includes('/track')) {
        setActiveView('track');
      } else if (hash.includes('orders') || path.includes('/orders')) {
        setActiveView('orders');
      } else if (hash.includes('menu') || path.includes('/menu')) {
        setActiveView('menu');
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, [isAdminAuthenticated, setActiveView]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'menu':
        return <MenuView />;
      case 'orders':
        return <OrderHistoryView />;
      case 'track':
        return <TrackOrderView />;
      case 'confirmation':
        return <OrderConfirmationView />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin-dashboard':
        return isAdminAuthenticated ? <AdminDashboard /> : <AdminLogin />;
      default:
        return <HomeView />;
    }
  };

  const isAdminView = activeView === 'admin-dashboard' || activeView === 'admin-login';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Cartoon Pressure Cooker Intro on initial load / refresh */}
      {showCookerLoader && (
        <PressureCookerLoader onComplete={() => setShowCookerLoader(false)} />
      )}

      {/* Navbar is persistent for easy switching & cart access */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {renderActiveView()}
      </main>

      {/* Persistent Floating Checkout Bin */}
      <CheckoutBinFloating />

      {/* Product Detail Modal */}
      <FoodDetailModal />

      {/* Modals & Drawer Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <Toast />

      {/* Footer */}
      {!isAdminView && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <CanteenProvider>
      <AppContent />
    </CanteenProvider>
  );
}
