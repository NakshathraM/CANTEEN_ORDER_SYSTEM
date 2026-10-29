import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { X, Plus, Minus, Flame, Sparkles, Clock, Check, ShoppingBag } from 'lucide-react';

export const FoodDetailModal = () => {
  const { selectedFoodModal, setSelectedFoodModal, addToCart } = useCanteen();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!selectedFoodModal) return null;

  const item = selectedFoodModal;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setSelectedFoodModal(null);
    }, 800);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setSelectedFoodModal(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid var(--border-light)'
        }}
      >
        {/* Modal Hero Image */}
        <div style={{ position: 'relative', height: '260px', width: '100%', backgroundColor: 'var(--fresh-mint)' }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <button
            onClick={() => setSelectedFoodModal(null)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            aria-label="Close details"
          >
            <X size={20} />
          </button>

          {/* Dietary Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(6px)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <span className={`badge-diet ${item.dietary}`}>
              <span className="diet-dot" />
            </span>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 750,
                textTransform: 'uppercase',
                color: item.dietary === 'veg' ? '#26734D' : '#d33838'
              }}
            >
              {item.dietary === 'veg' ? '100% Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: 'rgba(22, 74, 53, 0.92)',
              backdropFilter: 'blur(6px)',
              color: '#FFFFFF',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 700
            }}
          >
            {item.category}
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {item.name}
              </h2>
              <span
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--forest-green)',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                ₹{item.price}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginTop: '0.65rem', fontSize: '0.95rem', lineHeight: 1.55 }}>
              {item.description}
            </p>
          </div>

          {/* Highlights Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              backgroundColor: 'var(--bg-cream)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              border: '1px solid var(--border-light)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Clock size={18} color="var(--forest-green)" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Kitchen Prep</span>
              <strong style={{ fontSize: '0.85rem' }}>{item.prepTime || '10-12 mins'}</strong>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Flame size={18} color="#F3C779" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Freshness</span>
              <strong style={{ fontSize: '0.85rem' }}>Made to Order</strong>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Sparkles size={18} color="var(--success-green)" style={{ margin: '0 auto 4px auto' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Delivery</span>
              <strong style={{ fontSize: '0.85rem' }}>Desk Handover</strong>
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingTop: '0.5rem'
            }}
          >
            {/* Quantity Controls */}
            <div className="qty-stepper" style={{ padding: '4px 8px' }}>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>
              <span className="qty-count" style={{ minWidth: '32px', fontSize: '1rem' }}>
                {quantity}
              </span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Tray Button */}
            <button
              onClick={handleAdd}
              disabled={!item.isAvailable}
              className={`btn ${justAdded ? 'btn-mint' : 'btn-primary'}`}
              style={{
                flex: 1,
                padding: '0.85rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)'
              }}
            >
              {justAdded ? (
                <>
                  <Check size={18} />
                  <span>Added {quantity} to Tray!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Tray • ₹{item.price * quantity}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
