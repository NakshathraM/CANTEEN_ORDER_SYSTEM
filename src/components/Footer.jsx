import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Soup
} from 'lucide-react';

export const Footer = () => {
  const { setActiveView, isAdminAuthenticated } = useCanteen();

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-cream, #F7F8F0)',
        borderTop: '1px solid var(--border-light, #E2E6EC)',
        marginTop: 'auto',
        color: 'var(--text-secondary, #686C65)',
        fontSize: '0.875rem',
        overflow: 'hidden'
      }}
    >
      {/* Soft Ambient Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '240px',
          background: 'radial-gradient(ellipse at center, rgba(221, 235, 207, 0.45) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '3.5rem', paddingBottom: '6rem' }}>
        {/* Craving Banner (Above Footer Columns) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: 'clamp(2rem, 4vw, 3rem)',
            border: '1.5px solid var(--soft-sage, #A9C49A)',
            boxShadow: '0 16px 40px rgba(22, 74, 53, 0.06)',
            marginBottom: '3.5rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Banner Copy & Call to Action */}
          <div style={{ flex: '1 1 360px', maxWidth: '540px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'var(--mint, #DDEBCF)',
                color: 'var(--forest-green, #164A35)',
                fontWeight: 750,
                fontSize: '0.8rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                marginBottom: '0.85rem'
              }}
            >
              <Sparkles size={13} color="var(--forest-green)" />
              <span>Campus Kitchen Dispatch</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                fontWeight: 800,
                color: 'var(--text-main, #171A16)',
                lineHeight: 1.25,
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em'
              }}
            >
              Your next campus craving starts here.
            </h3>

            <p style={{ color: 'var(--text-secondary, #686C65)', fontSize: '0.95rem', lineHeight: 1.55, marginBottom: '1.5rem' }}>
              From quick bites between lectures to a comforting meal after class, we've got your cravings covered with direct-to-desk delivery.
            </p>

            <button
              onClick={() => setActiveView('menu')}
              className="footer-menu-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'var(--forest-green, #164A35)',
                color: '#FFFFFF',
                padding: '0.85rem 1.75rem',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(22, 74, 53, 0.2)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>Explore Menu</span>
              <ArrowRight size={17} />
            </button>
          </div>

          {/* Overlapping Appetizing Food Collage */}
          <div
            className="footer-food-collage"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              position: 'relative',
              paddingRight: '1rem'
            }}
          >
            {/* Image 1: Dosa */}
            <div
              className="collage-item"
              style={{
                width: '120px',
                height: '145px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: '3px solid #FFFFFF',
                transform: 'rotate(-6deg) translateY(-8px)',
                transition: 'transform 0.3s ease',
                zIndex: 1
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80"
                alt="Crispy Dosa"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Image 2: Kathi Roll / Samosa (Center, Featured) */}
            <div
              className="collage-item"
              style={{
                width: '140px',
                height: '165px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(22, 74, 53, 0.18)',
                border: '4px solid #FFFFFF',
                transform: 'scale(1.06) translateY(-4px)',
                transition: 'transform 0.3s ease',
                zIndex: 3
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80"
                alt="Golden Samosas"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Image 3: Burger */}
            <div
              className="collage-item"
              style={{
                width: '120px',
                height: '145px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: '3px solid #FFFFFF',
                transform: 'rotate(7deg) translateY(-8px)',
                transition: 'transform 0.3s ease',
                zIndex: 2
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
                alt="Crispy Burger"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* 3 Main Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}
        >
          {/* Col 1: BiteBox Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--forest-green, #164A35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(22, 74, 53, 0.15)'
                }}
              >
                <UtensilsCrossed size={19} color="#DDEBCF" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  color: 'var(--forest-green, #164A35)'
                }}
              >
                BiteBox <span style={{ color: 'var(--text-secondary, #686C65)', fontSize: '0.88rem', fontWeight: 600 }}>Studio</span>
              </span>
            </div>

            <p style={{ lineHeight: 1.6, color: 'var(--text-secondary, #686C65)', fontSize: '0.88rem' }}>
              A high-precision campus canteen food-tech platform cooked fresh in our university central kitchen and delivered directly to your classroom or workshop desk.
            </p>

            {/* Steaming Food Brand Element */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255,255,255,0.7)',
                padding: '0.4rem 0.8rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light, #E2E6EC)',
                width: 'fit-content'
              }}
            >
              <Soup size={15} color="var(--forest-green)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 650, color: 'var(--forest-green)' }}>
                Freshly cooked per order
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--forest-green, #164A35)', fontWeight: 650 }}>
              <Clock size={15} />
              <span>Campus Service: Mon – Sat, 8:30 AM – 5:30 PM</span>
            </div>
          </div>

          {/* Col 2: Student Services Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--text-main, #171A16)',
                marginBottom: '1.1rem',
                letterSpacing: '0.02em'
              }}
            >
              Student Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
              <li>
                <button
                  onClick={() => setActiveView('home')}
                  className="footer-nav-link"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('menu')}
                  className="footer-nav-link"
                >
                  Explore Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('orders')}
                  className="footer-nav-link"
                >
                  My Orders & History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('track')}
                  className="footer-nav-link"
                >
                  Live Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (isAdminAuthenticated) {
                      setActiveView('admin-dashboard');
                    } else {
                      setActiveView('admin-login');
                    }
                  }}
                  className="footer-nav-link"
                  style={{ fontWeight: 650, color: 'var(--forest-green, #164A35)' }}
                >
                  Canteen Staff Portal →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Wings Covered */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--text-main, #171A16)',
                marginBottom: '1.1rem',
                letterSpacing: '0.02em'
              }}
            >
              Campus Wings Covered
            </h4>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Delivering to all lecture halls, mechanical & aeronautical workshops, computer engineering laboratories, and department libraries across Ground to 4th Floor.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--mint, #DDEBCF)',
                color: 'var(--forest-green, #164A35)',
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: '1px solid var(--soft-sage, #A9C49A)'
              }}
            >
              <MapPin size={15} />
              <span>Speed: ~12-15 Mins Kitchen Dispatch</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            borderTop: '1px solid var(--border-light, #E2E6EC)',
            paddingTop: '1.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.84rem'
          }}
        >
          <span>
            © {new Date().getFullYear()} BiteBox Studio. All campus rights reserved.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-green, #164A35)', fontWeight: 650 }}>
            <span>Crafted for university food lovers</span>
            <Sparkles size={14} color="var(--forest-green)" />
          </div>
        </div>
      </div>

      {/* Hover Styles */}
      <style>{`
        .footer-menu-cta-btn:hover {
          transform: translateY(-2px);
          background-color: #0E3424 !important;
          box-shadow: 0 8px 24px rgba(22, 74, 53, 0.28) !important;
        }

        .footer-food-collage:hover .collage-item {
          transform: scale(1.05) translateY(-6px);
        }

        .footer-nav-link {
          background: none;
          border: none;
          color: var(--text-secondary, #686C65);
          font-size: 0.88rem;
          cursor: pointer;
          padding: 0;
          text-align: left;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-nav-link:hover {
          color: var(--forest-green, #164A35);
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .footer-food-collage {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
};
