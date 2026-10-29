import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CheckoutBinFloating = () => {
  const { cartCount, cartTotal, setIsCartOpen, activeView } = useCanteen();

  // Don't show in admin views or if drawer/checkout is open
  if (activeView === 'admin-dashboard' || activeView === 'admin-login') {
    return null;
  }

  return (
    <div
      onClick={() => setIsCartOpen(true)}
      className={`floating-checkout-bin ${cartCount > 0 ? 'pulse-mint' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Open Checkout Tray with ${cartCount} items totaling ₹${cartTotal}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsCartOpen(true);
        }
      }}
    >
      {/* Bag Icon & Badge */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: cartCount > 0 ? 'var(--fresh-mint)' : 'var(--bg-cream)',
            color: 'var(--forest-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease'
          }}
        >
          <ShoppingBag size={20} />
        </div>

        {cartCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-6px',
              backgroundColor: 'var(--forest-green)',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            {cartCount}
          </span>
        )}
      </div>

      {/* Tray Summary Info */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '0.25rem' }}>
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          {cartCount === 0 ? 'Your Tray' : `${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        </span>
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: 'var(--forest-green)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          {cartCount === 0 ? 'Empty' : `₹${cartTotal}`}
        </span>
      </div>

      {/* Action Button */}
      <div
        className="btn btn-primary"
        style={{
          padding: '0.55rem 1.1rem',
          fontSize: '0.85rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'none'
        }}
      >
        <span>{cartCount > 0 ? 'Checkout' : 'View Tray'}</span>
        <ArrowRight size={15} />
      </div>
    </div>
  );
};
