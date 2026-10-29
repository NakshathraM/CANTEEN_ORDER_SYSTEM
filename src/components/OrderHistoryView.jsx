import React from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  Clock,
  MapPin,
  ChevronRight,
  RotateCcw,
  ShoppingBag,
  ArrowRight,
  Copy,
  ChefHat,
  Bike,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const OrderHistoryView = () => {
  const { orders, setActiveView, setCurrentOrder, reorder, showToast } = useCanteen();

  const handleTrack = (order) => {
    setCurrentOrder(order);
    setActiveView('track');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Received':
        return <span className="status-pill status-received"><CheckCircle2 size={13} /> Received</span>;
      case 'Preparing':
        return <span className="status-pill status-preparing"><ChefHat size={13} /> Preparing</span>;
      case 'Out for Delivery':
        return <span className="status-pill status-out-for-delivery"><Bike size={13} /> Out for Delivery</span>;
      case 'Delivered':
        return <span className="status-pill status-delivered"><Sparkles size={13} /> Delivered</span>;
      default:
        return <span className="status-pill">{status}</span>;
    }
  };

  return (
    <div className="container" style={{ maxWidth: '840px', paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.25rem' }}>
        <div className="pill pill-mint" style={{ marginBottom: '0.5rem' }}>
          Personal Campus Activity
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>
          My Classroom Orders
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
          Track ongoing deliveries or reorder your regular lecture cravings in a single click.
        </p>
      </div>

      {orders && orders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map((order) => {
            const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            const isOngoing = order.status !== 'Delivered';

            return (
              <div
                key={order.id}
                className="card"
                style={{
                  padding: '1.5rem',
                  border: isOngoing ? '1.5px solid var(--soft-sage)' : '1px solid var(--border-light)',
                  backgroundColor: '#FFFFFF',
                  boxShadow: isOngoing ? '0 8px 24px rgba(22, 74, 53, 0.08)' : 'var(--shadow-sm)'
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>
                        Order #{order.id}
                      </strong>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(order.id);
                          showToast(`Order ID #${order.id} copied!`, 'mint');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--forest-green)',
                          padding: '2px 4px'
                        }}
                        aria-label="Copy Order ID"
                      >
                        <Copy size={15} />
                      </button>
                    </div>

                    <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      {formattedDate} • {order.customer.classroom}, {order.customer.floor}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {getStatusBadge(order.status)}
                    <span
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: 'var(--forest-green)',
                        fontFamily: 'var(--font-heading)'
                      }}
                    >
                      ₹{order.total}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div style={{ padding: '0.85rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {order.items.map((it, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'var(--bg-cream)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.35rem 0.85rem',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}
                    >
                      {it.quantity}× {it.name}
                    </span>
                  ))}
                </div>

                {/* Footer Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <MapPin size={16} color="var(--forest-green)" />
                    <span>
                      {order.customer.department}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button
                      onClick={() => reorder(order)}
                      className="btn btn-outline"
                      style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
                    >
                      <RotateCcw size={15} />
                      <span>Reorder Items</span>
                    </button>

                    <button
                      onClick={() => handleTrack(order)}
                      className="btn btn-primary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      <span>Track Order</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="card"
          style={{
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            border: '1.5px dashed var(--border-light)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--fresh-mint)',
              color: 'var(--forest-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}
          >
            <ShoppingBag size={28} />
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
            No past orders recorded yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
            Browse the freshly cooked menu and order straight to your desk before the next lecture break starts.
          </p>
          <button
            onClick={() => setActiveView('menu')}
            className="btn btn-primary btn-lg"
          >
            Explore Menu Now
          </button>
        </div>
      )}
    </div>
  );
};
