import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import { FoodCard } from './FoodCard';
import { CurvedFoodCarousel } from './CurvedFoodCarousel';
import { DEPARTMENTS } from '../data/initialData';
import {
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2,
  HeartHandshake,
  ArrowUpRight,
  Navigation
} from 'lucide-react';

export const HomeView = () => {
  const { setActiveView, menuItems } = useCanteen();

  // Pick top 4 popular campus favorites
  const campusFavorites = menuItems.filter((i) => i.popular).slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', paddingBottom: '5rem' }}>
      {/* Editorial Food Studio Hero Section */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(221, 235, 207, 0.45) 0%, rgba(247, 248, 240, 1) 75%)',
          paddingTop: '3.5rem',
          paddingBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Soft studio decorative ambiance */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            backgroundColor: 'rgba(221, 235, 207, 0.5)',
            filter: 'blur(70px)',
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '-60px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            backgroundColor: 'rgba(243, 199, 121, 0.22)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Hero Copy Container */}
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >

            {/* Oversized Cinematic Editorial Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 6.2vw, 4.6rem)',
                fontWeight: 850,
                color: 'var(--text-main)',
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                marginTop: '0.2rem'
              }}
            >
              Good Food.{' '}
              <span
                style={{
                  color: 'var(--forest-green)',
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                Great Mood.
                {/* Organic curved underline doodle */}
                <svg
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '0',
                    width: '100%',
                    height: '14px',
                    pointerEvents: 'none'
                  }}
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3,14 Q50,2 97,14"
                    fill="none"
                    stroke="var(--warm-accent)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                color: 'var(--text-secondary)',
                maxWidth: '640px',
                lineHeight: 1.55,
                fontWeight: 450
              }}
            >
              Freshly prepared favourites, just a few clicks away. Find your next campus craving.
            </p>

            {/* Two Working CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '0.5rem',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setActiveView('menu')}
                className="btn btn-primary btn-lg"
                style={{
                  padding: '0.95rem 2.25rem',
                  fontSize: '1.05rem',
                  fontWeight: 750
                }}
              >
                <span>Explore Menu</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setActiveView('orders')}
                className="btn btn-outline btn-lg"
                style={{
                  padding: '0.95rem 1.95rem',
                  fontSize: '1.05rem',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <Clock size={18} />
                <span>View My Orders</span>
              </button>

              {/* Playful Handwritten Annotation & Arrow pointing to Carousel */}
              <div
                style={{
                  position: 'absolute',
                  right: '-160px',
                  top: '-15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: 'rotate(8deg)',
                  pointerEvents: 'none'
                }}
                className="desktop-annotation"
              >
                <span
                  className="handwritten"
                  style={{
                    fontSize: '1.45rem',
                    color: 'var(--forest-green)',
                    fontWeight: 700
                  }}
                >
                  Hot & freshly plated! ✨
                </span>
                <svg width="45" height="40" viewBox="0 0 50 45" fill="none">
                  <path
                    d="M10 5 C 20 20, 25 25, 35 35"
                    stroke="var(--forest-green)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M25 35 L 35 35 L 35 25"
                    stroke="var(--forest-green)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Trust Highlights */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                marginTop: '1.25rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 550
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={17} color="var(--forest-green)" />
                <span>Direct Classroom Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Clock size={17} color="var(--forest-green)" />
                <span>Cooked Fresh in 10–12 Mins</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <HeartHandshake size={17} color="var(--forest-green)" />
                <span>UPI or Cash on Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNATURE FEATURE: CURVED ANIMATED FOOD CAROUSEL */}
        <div style={{ marginTop: '2.5rem' }}>
          <CurvedFoodCarousel />
        </div>
      </section>

      {/* Campus Cravings / Today's Favorites Showcase */}
      <section className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div className="pill pill-sage" style={{ marginBottom: '0.4rem' }}>
              Campus Cravings
            </div>
            <h2 style={{ fontSize: '2.1rem' }}>Today's Kitchen Favourites</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Most loved treats bubbling on the stove right now across campus.
            </p>
          </div>

          <button
            onClick={() => setActiveView('menu')}
            className="btn btn-outline"
            style={{ fontWeight: 650 }}
          >
            <span>See Entire Menu</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {campusFavorites.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* How Classroom Delivery Works */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <div className="pill pill-mint" style={{ marginBottom: '0.5rem' }}>
            Seamless 3-Step Process
          </div>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)' }}>
            How Classroom Delivery Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
            Built specifically for busy students and professors between back-to-back lectures.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {/* Step 1 */}
          <div
            className="card"
            style={{
              padding: '2rem 1.75rem',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderTop: '4px solid var(--forest-green)'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: 'var(--fresh-mint)',
                color: 'var(--forest-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.35rem'
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Choose Your Daily Cravings</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
              Browse through steaming Kathi rolls, cheesy pizzas, hot samosa platters, iced lattes, and brownies prepared fresh in the canteen.
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="card"
            style={{
              padding: '2rem 1.75rem',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderTop: '4px solid var(--warm-accent)'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: 'var(--warm-accent-light)',
                color: '#8f5a11',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.35rem'
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Specify Dept & Classroom</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
              Provide your student name, mobile number, department wing, floor, and room number. Add notes for lab delivery.
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="card"
            style={{
              padding: '2rem 1.75rem',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderTop: '4px solid var(--forest-green)'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                backgroundColor: 'var(--fresh-mint)',
                color: 'var(--forest-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.35rem'
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Follow the Live Journey</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>
              Track the student runner navigating across campus blocks right to your desk. Pay easily via UPI or cash at your desk.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Delivery Covered — Redesigned Food-Inspired Network */}
      <section
        style={{
          position: 'relative',
          backgroundColor: 'var(--bg-cream, #F7F8F0)',
          borderTop: '1px solid var(--border-light, #E2E6EC)',
          borderBottom: '1px solid var(--border-light, #E2E6EC)',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          overflow: 'hidden'
        }}
      >
        {/* Softly Faded Ambient Food Imagery Collage near edges */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '-20px',
            width: '280px',
            height: '280px',
            borderRadius: '32px',
            overflow: 'hidden',
            opacity: 0.22,
            transform: 'rotate(-8deg)',
            pointerEvents: 'none',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
          }}
          className="desktop-food-ambient"
        >
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
            alt="Steaming Samosas"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '-25px',
            left: '3%',
            width: '240px',
            height: '240px',
            borderRadius: '28px',
            overflow: 'hidden',
            opacity: 0.2,
            transform: 'rotate(6deg)',
            pointerEvents: 'none',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
          }}
          className="desktop-food-ambient"
        >
          <img
            src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"
            alt="Crispy Fries"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '5%',
            right: '-15px',
            width: '290px',
            height: '290px',
            borderRadius: '36px',
            overflow: 'hidden',
            opacity: 0.22,
            transform: 'rotate(10deg)',
            pointerEvents: 'none',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
          }}
          className="desktop-food-ambient"
        >
          <img
            src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
            alt="South Indian Dosa"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '2%',
            width: '250px',
            height: '250px',
            borderRadius: '28px',
            overflow: 'hidden',
            opacity: 0.18,
            transform: 'rotate(-5deg)',
            pointerEvents: 'none',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
          }}
          className="desktop-food-ambient"
        >
          <img
            src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
            alt="Campus Iced Coffee"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Central Overlay Card Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(12px)',
              borderRadius: '32px',
              padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.2rem, 4vw, 3rem)',
              border: '1px solid rgba(22, 74, 53, 0.12)',
              boxShadow: '0 16px 48px rgba(22, 74, 53, 0.06)'
            }}
          >
            {/* Location Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--mint, #DDEBCF)',
                color: 'var(--forest-green, #164A35)',
                fontWeight: 750,
                fontSize: '0.85rem',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                border: '1px solid var(--soft-sage, #A9C49A)',
                marginBottom: '1rem',
                boxShadow: '0 2px 8px rgba(22, 74, 53, 0.05)'
              }}
            >
              <Navigation size={15} color="var(--forest-green)" />
              <span>Campus Delivery Network • Live Student Runner Grid</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                color: 'var(--text-main, #171A16)',
                lineHeight: 1.25,
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}
            >
              Delivering to All Campus Departments & Academic Wings
            </h2>

            <p
              style={{
                color: 'var(--text-secondary, #686C65)',
                maxWidth: '680px',
                margin: '0 auto 2rem auto',
                fontSize: '1rem',
                lineHeight: 1.6
              }}
            >
              Our dedicated student runners dispatch fresh, hot meals directly from the campus central kitchen straight to your lecture hall desk, mechanical workshop, or lab bench in <strong style={{ color: 'var(--forest-green)' }}>12–15 minutes</strong>.
            </p>

            {/* Dotted Delivery Route Visualizer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.5rem, 2vw, 1.5rem)',
                marginBottom: '2.5rem',
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--bg-cream, #F7F8F0)',
                borderRadius: '18px',
                border: '1px dashed var(--soft-sage, #A9C49A)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--forest-green)' }}>
                <span style={{ fontSize: '1.1rem' }}>♨</span>
                <span>Central Kitchen</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, maxWidth: '120px' }}>
                <span style={{ height: '2px', flex: 1, borderTop: '2px dotted var(--forest-green)' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warm-yellow, #F3C779)' }} />
                <span style={{ height: '2px', flex: 1, borderTop: '2px dotted var(--forest-green)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--forest-green)' }}>
                <span style={{ fontSize: '1.1rem' }}>⚡</span>
                <span>12-Min Runner</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, maxWidth: '120px' }}>
                <span style={{ height: '2px', flex: 1, borderTop: '2px dotted var(--forest-green)' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--forest-green)' }} />
                <span style={{ height: '2px', flex: 1, borderTop: '2px dotted var(--forest-green)' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                <MapPin size={16} color="var(--forest-green)" />
                <span>Your Desk</span>
              </div>
            </div>

            {/* Interactive Department Chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.75rem'
              }}
            >
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept}
                  className="delivery-department-chip"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--forest-green, #164A35)',
                    border: '1.5px solid var(--soft-sage, #A9C49A)',
                    borderRadius: '999px',
                    padding: '0.6rem 1.15rem',
                    fontSize: '0.88rem',
                    fontWeight: 650,
                    cursor: 'default',
                    boxShadow: '0 2px 6px rgba(22, 74, 53, 0.04)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <MapPin size={14} color="var(--forest-green)" opacity={0.7} />
                  <span>{dept}</span>
                  <span className="chip-arrow-reveal" style={{ display: 'inline-flex', alignItems: 'center', transition: 'transform 0.2s ease, opacity 0.2s ease', opacity: 0.4 }}>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media query and interactive hover helper */}
      <style>{`
        .delivery-department-chip:hover {
          transform: translateY(-3px) scale(1.02);
          background-color: var(--mint, #DDEBCF) !important;
          border-color: var(--forest-green, #164A35) !important;
          box-shadow: 0 6px 16px rgba(22, 74, 53, 0.12) !important;
        }

        .delivery-department-chip:hover .chip-arrow-reveal {
          opacity: 1 !important;
          transform: translate(2px, -2px);
        }

        @media (max-width: 992px) {
          .desktop-food-ambient {
            display: none !important;
          }
          .desktop-annotation {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
