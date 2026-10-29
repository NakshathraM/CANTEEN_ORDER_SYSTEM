import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MapPin,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    setActiveView
  } = useCanteen();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="drawer-backdrop"
        onClick={() => setIsCartOpen(false)}
        role="presentation"
      />

      {/* Slide-out Drawer / Bottom-sheet */}
      <aside aria-label="Shopping Cart Tray" className="drawer">
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: 'var(--fresh-mint)',
                color: 'var(--forest-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', lineHeight: 1.2, fontWeight: 750 }}>
                Your Checkout Tray
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {cartCount} {cartCount === 1 ? 'item' : 'items'} ready for classroom delivery
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)'
            }}
            aria-label="Close cart tray"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'var(--bg-cream)'
          }}
        >
          {cart.length > 0 ? (
            <>
              {/* Delivery info chip */}
              <div
                style={{
                  backgroundColor: 'var(--fresh-mint)',
                  border: '1px solid var(--soft-sage)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.825rem',
                  color: 'var(--forest-green)',
                  fontWeight: 600
                }}
              >
                <MapPin size={17} flexShrink={0} />
                <span>
                  Complimentary student classroom runner delivery included on all orders!
                </span>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-sm)',
                        objectFit: 'cover',
                        backgroundColor: 'var(--fresh-mint)',
                        flexShrink: 0
                      }}
                    />

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={`badge-diet ${item.dietary}`} style={{ width: '12px', height: '12px' }}>
                          <span className="diet-dot" style={{ width: '6px', height: '6px' }} />
                        </span>
                        <h4
                          style={{
                            fontSize: '0.925rem',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.name}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
                        <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                          ₹{item.price} each
                        </span>
                        <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--forest-green)' }}>
                          • ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="qty-stepper">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-count">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Tray button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={clearCart}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Empty Tray
                </button>
              </div>
            </>
          ) : (
            /* Empty Cart Experience */
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2.5rem 1rem'
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  color: 'var(--forest-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: '1.5px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <ShoppingBag size={34} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontWeight: 750 }}>
                Your bin is feeling a little empty.
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.925rem',
                  maxWidth: '260px',
                  marginBottom: '1.75rem',
                  lineHeight: 1.5
                }}
              >
                Add something delicious to get started.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('menu');
                }}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.6rem' }}
              >
                <span>Explore Menu</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Price Breakdown */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-light)',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            {/* Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Items Subtotal</span>
                <span style={{ fontWeight: 600 }}>₹{cartSubtotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Classroom Courier Delivery</span>
                <span style={{ color: 'var(--success-green)', fontWeight: 650 }}>FREE (₹0)</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--border-light)'
                }}
              >
                <span>Final Payable</span>
                <span style={{ color: 'var(--forest-green)', fontFamily: 'var(--font-heading)' }}>
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="btn btn-primary btn-lg btn-block"
                style={{
                  padding: '0.85rem',
                  fontSize: '1.05rem',
                  fontWeight: 750
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="btn btn-ghost btn-sm"
                style={{ fontWeight: 600 }}
              >
                Continue Browsing Menu
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
