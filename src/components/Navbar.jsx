import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  ShoppingBag,
  MapPin,
  Menu as MenuIcon,
  X,
  UtensilsCrossed,
  Sparkles,
  ShieldCheck,
  Compass,
  Clock,
  ClipboardList
} from 'lucide-react';

export const Navbar = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    cartTotal,
    setIsCartOpen,
    isAdminAuthenticated
  } = useCanteen();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: '0 2px 10px rgba(22, 74, 53, 0.04)'
      }}
    >
      {/* Top micro banner for Classroom Delivery */}
      <div
        style={{
          backgroundColor: 'var(--forest-green)',
          color: '#ffffff',
          fontSize: '0.8rem',
          padding: '0.35rem 1rem',
          textAlign: 'center',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.55rem'
        }}
      >
        <MapPin size={13} color="var(--warm-accent)" />
        <span>
          Fresh food made on campus & delivered straight to your classroom • Average speed:{' '}
          <strong style={{ color: 'var(--fresh-mint)' }}>12–15 Mins</strong>
        </span>
      </div>

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem'
        }}
      >
        {/* Brand with custom leaf-and-fork mark */}
        <div
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              backgroundColor: 'var(--forest-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(22, 74, 53, 0.25)'
            }}
          >
            {/* Custom leaf-and-fork SVG mark */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DDEBCF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" opacity="0.25" fill="#DDEBCF" />
              <path d="M18 2v6a3 3 0 0 1-3 3h-1m4-9h-2m2 0v6" />
              <path d="M6 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" />
              <path d="M8 12v9" />
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.35rem',
                  color: 'var(--forest-green)',
                  letterSpacing: '-0.03em'
                }}
              >
                BiteBox
              </span>
              <span
                style={{
                  backgroundColor: 'var(--fresh-mint)',
                  color: 'var(--forest-green)',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.04em'
                }}
              >
                STUDIO
              </span>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                display: 'block',
                marginTop: '-2px'
              }}
            >
              Campus Canteen Delivery
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.85rem'
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: activeView === 'home' ? 750 : 600,
              color: activeView === 'home' ? 'var(--forest-green)' : 'var(--text-secondary)',
              fontSize: '0.95rem',
              padding: '0.35rem 0',
              borderBottom: activeView === 'home' ? '2px solid var(--forest-green)' : '2px solid transparent',
              transition: 'all 0.18s ease'
            }}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: activeView === 'menu' ? 750 : 600,
              color: activeView === 'menu' ? 'var(--forest-green)' : 'var(--text-secondary)',
              fontSize: '0.95rem',
              padding: '0.35rem 0',
              borderBottom: activeView === 'menu' ? '2px solid var(--forest-green)' : '2px solid transparent',
              transition: 'all 0.18s ease'
            }}
          >
            Menu
          </button>

          <button
            onClick={() => handleNavClick('orders')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: activeView === 'orders' ? 750 : 600,
              color: activeView === 'orders' ? 'var(--forest-green)' : 'var(--text-secondary)',
              fontSize: '0.95rem',
              padding: '0.35rem 0',
              borderBottom: activeView === 'orders' ? '2px solid var(--forest-green)' : '2px solid transparent',
              transition: 'all 0.18s ease'
            }}
          >
            My Orders
          </button>

          <button
            onClick={() => handleNavClick('track')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: activeView === 'track' ? 750 : 600,
              color: activeView === 'track' ? 'var(--forest-green)' : 'var(--text-secondary)',
              fontSize: '0.95rem',
              padding: '0.35rem 0',
              borderBottom: activeView === 'track' ? '2px solid var(--forest-green)' : '2px solid transparent',
              transition: 'all 0.18s ease'
            }}
          >
            Live Tracking
          </button>

          <button
            onClick={() => handleNavClick(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-cream)'
            }}
          >
            <ShieldCheck size={14} color="var(--forest-green)" />
            <span>Staff Portal</span>
          </button>
        </nav>

        {/* Right Action: Cart Button & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart / Checkout Bin Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-primary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.88rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              position: 'relative'
            }}
            aria-label={`Open Cart Tray with ${cartCount} items`}
          >
            <ShoppingBag size={18} />
            <span>Tray</span>
            {cartCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--fresh-mint)',
                  color: 'var(--forest-green)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  marginLeft: '2px'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
              color: 'var(--text-main)'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--border-light)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <button
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: 700,
              color: activeView === 'home' ? 'var(--forest-green)' : 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: 700,
              color: activeView === 'menu' ? 'var(--forest-green)' : 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            Explore Menu
          </button>

          <button
            onClick={() => handleNavClick('orders')}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: 700,
              color: activeView === 'orders' ? 'var(--forest-green)' : 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            My Orders
          </button>

          <button
            onClick={() => handleNavClick('track')}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: '1rem',
              fontWeight: 700,
              color: activeView === 'track' ? 'var(--forest-green)' : 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            Live Tracking
          </button>

          <button
            onClick={() => handleNavClick(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login')}
            style={{
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-light)'
            }}
          >
            <ShieldCheck size={16} color="var(--forest-green)" />
            <span>Canteen Staff Portal</span>
          </button>
        </div>
      )}

      {/* Media query helper styles */}
      <style>{`
        @media (max-width: 820px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
        @media (min-width: 821px) {
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
