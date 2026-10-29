import React, { useEffect, useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  Phone,
  ArrowRight,
  Utensils,
  Share2,
  Copy,
  Sparkles,
  ChefHat,
  Bike
} from 'lucide-react';

export const OrderConfirmationView = () => {
  const { currentOrder, setActiveView, showToast } = useCanteen();
  const [copied, setCopied] = useState(false);

  if (!currentOrder) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>No Active Order Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
          Please browse the menu or enter an existing Order ID to track.
        </p>
        <button onClick={() => setActiveView('menu')} className="btn btn-primary">
          Browse Menu
        </button>
      </div>
    );
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(currentOrder.id);
    setCopied(true);
    showToast(`Order ID #${currentOrder.id} copied to clipboard!`, 'mint');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ maxWidth: '780px', paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Success Card with Confetti & Checkmark */}
      <div
        className="card"
        style={{
          borderRadius: '32px',
          border: '1.5px solid var(--border-light)',
          boxShadow: 'var(--shadow-lg)',
          padding: '2.75rem 2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Subtle decorative confetti background sparkles */}
        <div
          style={{
            position: 'absolute',
            top: '15px',
            left: '25px',
            fontSize: '1.5rem',
            opacity: 0.6,
            animation: 'fadeIn 1s ease'
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: 'absolute',
            top: '25px',
            right: '35px',
            fontSize: '1.4rem',
            opacity: 0.6,
            animation: 'fadeIn 1.2s ease'
          }}
        >
          🍕
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '25px',
            left: '35px',
            fontSize: '1.3rem',
            opacity: 0.5,
            animation: 'fadeIn 1.4s ease'
          }}
        >
          🎉
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '30px',
            fontSize: '1.3rem',
            opacity: 0.5,
            animation: 'fadeIn 1.6s ease'
          }}
        >
          🌿
        </div>

        {/* Animated Checkmark Circle */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--fresh-mint)',
            color: 'var(--forest-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 8px 24px rgba(22, 74, 53, 0.18)',
            animation: 'scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <CheckCircle2 size={46} strokeWidth={2.5} />
        </div>

        <div className="pill pill-mint" style={{ marginBottom: '0.65rem', fontSize: '0.825rem' }}>
          Ticket Dispatched to Campus Kitchen
        </div>

        {/* Master Prompt Specified Copy */}
        <h1
          style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 2.9rem)',
            fontWeight: 850,
            marginBottom: '0.65rem',
            color: 'var(--text-main)',
            letterSpacing: '-0.03em'
          }}
        >
          Yay! Your order is in!
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            maxWidth: '540px',
            margin: '0 auto 0.65rem auto',
            lineHeight: 1.55
          }}
        >
          Thank you for ordering with us, <strong style={{ color: 'var(--text-main)' }}>{currentOrder.customer.name}</strong>. Your next delicious moment is on its way.
        </p>

        <p
          style={{
            color: 'var(--forest-green)',
            fontSize: '0.925rem',
            fontWeight: 600,
            maxWidth: '480px',
            margin: '0 auto 1.75rem auto'
          }}
        >
          We're getting your order ready. We'll keep you updated every step of the way.
        </p>

        {/* Order ID & Estimated Time Pill Bar */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'var(--bg-cream)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1.4rem',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Order ID:</span>
            <strong style={{ fontSize: '1rem', color: 'var(--forest-green)' }}>
              #{currentOrder.id}
            </strong>
            <button
              onClick={copyOrderId}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--forest-green)',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Copy Order ID"
              aria-label="Copy Order ID"
            >
              <Copy size={16} />
            </button>
          </div>

          <span style={{ color: 'var(--border-light)' }}>|</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Clock size={16} color="var(--forest-green)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Estimated Desk Delivery:</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--forest-green)' }}>
              ~{currentOrder.estimatedDeliveryMins || 15} Mins
            </strong>
          </div>
        </div>

        {/* Two Functional Actions */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => setActiveView('track')}
            className="btn btn-primary btn-lg"
            style={{ padding: '0.9rem 2rem' }}
          >
            <Bike size={18} />
            <span>Track My Order</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => setActiveView('menu')}
            className="btn btn-outline btn-lg"
            style={{ padding: '0.9rem 1.8rem' }}
          >
            <span>Back to Menu</span>
          </button>
        </div>
      </div>

      {/* Order Details Breakdown Card */}
      <div
        className="card"
        style={{
          padding: '1.75rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid var(--border-light)'
        }}
      >
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.15rem', fontWeight: 750 }}>
          Order & Delivery Destination
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-cream)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              border: '1px solid var(--border-light)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: 'var(--forest-green)', fontWeight: 700, fontSize: '0.85rem' }}>
              <MapPin size={16} />
              <span>DELIVERY LOCATION</span>
            </div>
            <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--text-main)' }}>
              {currentOrder.customer.classroom}
            </strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {currentOrder.customer.floor} • {currentOrder.customer.department}
            </span>
            {currentOrder.customer.deliveryNote && (
              <p style={{ fontSize: '0.8rem', color: 'var(--forest-green)', fontStyle: 'italic', marginTop: '0.35rem' }}>
                "{currentOrder.customer.deliveryNote}"
              </p>
            )}
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-cream)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              border: '1px solid var(--border-light)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: 'var(--forest-green)', fontWeight: 700, fontSize: '0.85rem' }}>
              <Phone size={16} />
              <span>CONTACT & PAYMENT</span>
            </div>
            <strong style={{ fontSize: '1rem', display: 'block', color: 'var(--text-main)' }}>
              {currentOrder.customer.name}
            </strong>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              +91 {currentOrder.customer.phone}
            </span>
            <div style={{ marginTop: '0.35rem', fontSize: '0.825rem', fontWeight: 650, color: 'var(--forest-green)' }}>
              {currentOrder.paymentMethod} ({currentOrder.paymentStatus})
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {currentOrder.items.map((it, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-main)' }}>
                  {it.quantity}× {it.name}
                </span>
                <span style={{ fontWeight: 650, color: 'var(--text-main)' }}>
                  ₹{it.price * it.quantity}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1.5px solid var(--border-light)',
              marginTop: '0.85rem',
              paddingTop: '0.85rem',
              fontSize: '1.15rem',
              fontWeight: 800
            }}
          >
            <span>Total Payable Amount</span>
            <span style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-heading)' }}>
              ₹{currentOrder.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
