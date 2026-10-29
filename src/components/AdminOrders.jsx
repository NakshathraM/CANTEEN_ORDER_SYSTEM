import React, { useState, useMemo } from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ChefHat,
  Bike,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, showToast } = useCanteen();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered'

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = order.id.toLowerCase().includes(q);
        const matchName = order.customer.name.toLowerCase().includes(q);
        const matchPhone = order.customer.phone.includes(q);
        const matchRoom = order.customer.classroom.toLowerCase().includes(q);
        const matchDept = order.customer.department.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchPhone && !matchRoom && !matchDept) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  const getNextStatusAction = (currentStatus) => {
    switch (currentStatus) {
      case 'Received':
        return { next: 'Preparing', label: 'Start Preparing', icon: ChefHat, btnClass: 'btn-royal' };
      case 'Preparing':
        return { next: 'Out for Delivery', label: 'Dispatch to Runner', icon: Bike, btnClass: 'btn-primary' };
      case 'Out for Delivery':
        return { next: 'Delivered', label: 'Mark Delivered', icon: Sparkles, btnClass: 'btn-royal' };
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Search and Status Filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        backgroundColor: '#ffffff',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: '420px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Order #, student, room or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.4rem', borderRadius: 'var(--radius-full)' }}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '2px' }}>
          {['all', 'Received', 'Preparing', 'Out for Delivery', 'Delivered'].map((status) => {
            const isSelected = statusFilter === status;
            const count = status === 'all'
              ? orders.length
              : orders.filter((o) => o.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--royal-blue)' : 'var(--border-subtle)',
                  backgroundColor: isSelected ? 'var(--royal-blue)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{status === 'all' ? 'All Orders' : status}</span>
                <span style={{
                  backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--warm-beige)',
                  color: isSelected ? '#ffffff' : '#3b2b1a',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontSize: '0.7rem'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List / Cards */}
      {filteredOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredOrders.map((order) => {
            const nextAction = getNextStatusAction(order.status);

            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Order Card Top Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: 'var(--royal-blue)'
                    }}>
                      #{order.id}
                    </span>
                    <span className={`status-pill status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Placed at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--coral-red)'
                    }}>
                      ₹{order.total}
                    </span>
                    <span className="pill pill-beige" style={{ fontSize: '0.75rem' }}>
                      {order.paymentMethod} • {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Delivery Location Prominent Highlight */}
                <div style={{
                  backgroundColor: 'linear-gradient(135deg, var(--royal-blue-light) 0%, #ffffff 100%)',
                  background: 'var(--royal-blue-light)',
                  border: '1.5px solid var(--royal-blue-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.75rem',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      color: 'var(--royal-blue)',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <MapPin size={13} />
                      Classroom Destination
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {order.customer.classroom} • {order.customer.floor}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--royal-blue)', fontWeight: 800 }}>
                      Department
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {order.customer.department}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--royal-blue)', fontWeight: 800 }}>
                      Student Contact
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {order.customer.name} (
                      <a href={`tel:${order.customer.phone}`} style={{ color: 'var(--royal-blue)', textDecoration: 'underline' }}>
                        {order.customer.phone}
                      </a>
                      )
                    </div>
                  </div>

                  {order.customer.deliveryNote && (
                    <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--royal-blue-border)', paddingTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <strong>Delivery Instruction:</strong> "{order.customer.deliveryNote}"
                    </div>
                  )}
                </div>

                {/* Ordered Items Breakdown */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  alignItems: 'center',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Items:</span>
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'var(--soft-white)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.8rem'
                      }}
                    >
                      <strong>{item.quantity}x</strong> {item.name}
                    </span>
                  ))}
                </div>

                {/* Footer Controls: Quick advance button + manual status selector */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.85rem'
                }}>
                  {/* Manual Status Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Override Status:</span>
                    <select
                      className="form-control"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.825rem',
                        width: 'auto',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <option value="Received">Received</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  {/* Primary Next Status Button */}
                  {nextAction && (
                    <button
                      onClick={() => updateOrderStatus(order.id, nextAction.next)}
                      className={`btn ${nextAction.btnClass} btn-sm`}
                      style={{ padding: '0.45rem 1.15rem' }}
                    >
                      <nextAction.icon size={15} />
                      <span>{nextAction.label}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <span style={{ fontSize: '0.825rem', color: 'var(--success-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={16} /> Completed & Delivered
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem',
          textAlign: 'center',
          border: '1px dashed var(--border-subtle)'
        }}>
          <h3>No Orders Found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Try clearing the search query or status filters.
          </p>
        </div>
      )}
    </div>
  );
};
