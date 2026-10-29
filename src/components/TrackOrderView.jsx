import React, { useState, useEffect } from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  Search,
  CheckCircle2,
  ChefHat,
  Bike,
  Sparkles,
  Phone,
  AlertCircle,
  Copy,
  Navigation,
  ChevronLeft
} from 'lucide-react';

export const TrackOrderView = () => {
  const { orders, recentOrderIds, currentOrder, setCurrentOrder, setActiveView, showToast } = useCanteen();

  const [searchOrderId, setSearchOrderId] = useState(
    currentOrder ? currentOrder.id : (recentOrderIds[0] || '')
  );
  const [searchPhone, setSearchPhone] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(
    currentOrder || (orders.find((o) => o.id === recentOrderIds[0]) || orders[0] || null)
  );
  const [errorMsg, setErrorMsg] = useState('');

  // Simulated GPS Driver progress (0% at Central Kitchen to 100% at Classroom Desk)
  const [simulatedProgress, setSimulatedProgress] = useState(0.45);

  const trackedId = trackedOrder?.id;

  // Sync trackedOrder when orders update from admin or context
  useEffect(() => {
    if (trackedId) {
      const updated = orders.find((o) => o.id === trackedId);
      if (updated) {
        setTrackedOrder(updated);
      }
    }
  }, [orders, trackedId]);

  // Smooth animation loop for the simulated driver GPS marker
  useEffect(() => {
    if (!trackedOrder) return;

    if (trackedOrder.status === 'Delivered') {
      setSimulatedProgress(1.0);
      return;
    }
    if (trackedOrder.status === 'Received') {
      setSimulatedProgress(0.08);
      return;
    }
    if (trackedOrder.status === 'Preparing') {
      setSimulatedProgress(0.22);
      return;
    }

    // Out for Delivery: animate back and forth or forward along campus pathway
    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 0.95) return 0.95;
        return prev + 0.015;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [trackedOrder?.status]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const cleanId = searchOrderId.trim().toUpperCase().replace('#', '');
    const cleanPhone = searchPhone.trim().replace(/\D/g, '');

    if (!cleanId && !cleanPhone) {
      setErrorMsg('Please enter either an Order ID (e.g. CC-9021 or BB-4120) or your 10-digit mobile number.');
      return;
    }

    const found = orders.find((order) => {
      const matchId = cleanId ? order.id.toUpperCase() === cleanId : true;
      const matchPhone = cleanPhone ? order.customer.phone.replace(/\D/g, '').includes(cleanPhone) : true;
      return matchId && matchPhone;
    });

    if (found) {
      setTrackedOrder(found);
      setCurrentOrder(found);
    } else {
      setErrorMsg(`No active campus order found matching your search. Please check your Order ID.`);
    }
  };

  const selectRecentOrder = (orderId) => {
    setSearchOrderId(orderId);
    const found = orders.find((o) => o.id === orderId);
    if (found) {
      setTrackedOrder(found);
      setCurrentOrder(found);
      setErrorMsg('');
    }
  };

  const stages = [
    { key: 'Received', label: 'Order Placed', desc: 'Ticket logged at central kitchen', icon: CheckCircle2 },
    { key: 'Preparing', label: 'Preparing Your Food', desc: 'Chef cooking fresh batch', icon: ChefHat },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Runner en route to classroom desk', icon: Bike },
    { key: 'Delivered', label: 'Delivered / Collected', desc: 'Handed over at classroom desk', icon: Sparkles }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Received': return 0;
      case 'Preparing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentStageIndex = trackedOrder ? getStageIndex(trackedOrder.status) : 0;

  // Polyline coordinates calculation for campus path simulation
  // Point A (Kitchen): x=80, y=260
  // Point B (Courtyard): x=240, y=180
  // Point C (Academic Block): x=420, y=220
  // Point D (Classroom Wing): x=620, y=110
  const runnerX = 80 + simulatedProgress * (620 - 80);
  // Curve calculation for vertical position
  const runnerY = 260 - Math.sin(simulatedProgress * Math.PI) * 70 - simulatedProgress * 80;

  return (
    <div className="container" style={{ maxWidth: '840px', paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      {/* Top Navigation Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveView('menu')}
          className="btn btn-beige btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ChevronLeft size={16} />
          <span>Back to Menu</span>
        </button>

        <button
          onClick={() => setActiveView('orders')}
          className="btn btn-beige btn-sm"
        >
          View All Past Orders
        </button>
      </div>

      {/* Header Required by Master Prompt */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="pill pill-mint" style={{ marginBottom: '0.45rem' }}>
          Live Fulfillment Journey
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
          Your food is on its way!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
          Track preparation, campus transit, and student runner arrival in real-time.
        </p>
      </div>

      {/* Recent Orders Quick Pills */}
      {recentOrderIds.length > 0 && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            padding: '0.85rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ fontSize: '0.825rem', fontWeight: 650, color: 'var(--text-secondary)' }}>
            Switch Device Orders:
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {recentOrderIds.slice(0, 5).map((id) => (
              <button
                key={id}
                onClick={() => selectRecentOrder(id)}
                className={`pill ${trackedOrder?.id === id ? 'pill-forest' : 'pill-beige'}`}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.85rem'
                }}
              >
                #{id}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar Card */}
      <div
        className="card"
        style={{
          padding: '1.5rem 1.75rem',
          marginBottom: '2rem',
          backgroundColor: '#FFFFFF'
        }}
      >
        <form onSubmit={handleSearch}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}
          >
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="track-order-id">
                Order ID
              </label>
              <input
                id="track-order-id"
                type="text"
                className="form-control"
                placeholder="e.g. CC-9021 or BB-2041"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="track-phone">
                Or Phone Number
              </label>
              <input
                id="track-phone"
                type="tel"
                className="form-control"
                placeholder="10-digit mobile number"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.75rem' }}
            >
              <Search size={16} />
              <span>Track Live Status</span>
            </button>
          </div>
        </form>
      </div>

      {errorMsg && (
        <div
          style={{
            backgroundColor: 'var(--danger-light)',
            border: '1px solid #fecdd3',
            color: 'var(--danger-red)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9rem'
          }}
        >
          <AlertCircle size={20} flexShrink={0} />
          <span>{errorMsg}</span>
        </div>
      )}

      {trackedOrder && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Main Status & Order Header Card */}
          <div
            className="card"
            style={{
              padding: '1.75rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <span className="pill pill-mint" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
                  Live Campus Order
                </span>
                <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>Order #{trackedOrder.id}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(trackedOrder.id);
                      showToast(`Order ID #${trackedOrder.id} copied!`, 'mint');
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--forest-green)' }}
                    title="Copy Order ID"
                  >
                    <Copy size={16} />
                  </button>
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Placed on {new Date(trackedOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {trackedOrder.customer.department}
                </span>
              </div>

              {/* Status and ETA */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Simulated ETA
                </span>
                <span
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 850,
                    color: 'var(--forest-green)',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {trackedOrder.status === 'Delivered'
                    ? 'Delivered'
                    : `~${trackedOrder.estimatedDeliveryMins || 10} Mins`}
                </span>
              </div>
            </div>

            {/* LIVE-STYLE CAMPUS MAP VISUALIZER (Explicitly Labelled Demo) */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-cream)',
                border: '1.5px solid var(--border-light)',
                marginBottom: '1.75rem'
              }}
            >
              {/* Mandatory Prompt Label */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '14px',
                  zIndex: 10,
                  backgroundColor: 'rgba(22, 74, 53, 0.94)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Navigation size={13} color="var(--fresh-mint)" />
                <span>Demo tracking — simulated driver location</span>
              </div>

              {/* Campus Map SVG Canvas */}
              <svg
                viewBox="0 0 700 320"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                aria-label="Campus Delivery Route Map"
              >
                {/* Subtle Campus Grid & Green Spaces */}
                <rect width="700" height="320" fill="#F7F8F0" />

                {/* Academic Lawn Grass Area */}
                <path
                  d="M150,50 Q300,20 450,70 T600,60 L600,140 Q400,160 200,120 Z"
                  fill="#EAF3E4"
                  opacity="0.85"
                />

                {/* Building Blocks */}
                {/* Central Canteen Kitchen */}
                <rect x="40" y="210" width="90" height="75" rx="12" fill="#FFFFFF" stroke="#E4E8DD" strokeWidth="2" />
                <text x="85" y="245" textAnchor="middle" fill="#164A35" fontSize="11" fontWeight="700">Central Kitchen</text>
                <text x="85" y="260" textAnchor="middle" fill="#686C65" fontSize="9">Dispatch Hub</text>

                {/* Library & Quad */}
                <rect x="220" y="70" width="100" height="65" rx="10" fill="#FFFFFF" stroke="#E4E8DD" strokeWidth="1.5" />
                <text x="270" y="105" textAnchor="middle" fill="#686C65" fontSize="10">Central Library</text>

                {/* Science & Tech Block */}
                <rect x="360" y="140" width="110" height="70" rx="10" fill="#FFFFFF" stroke="#E4E8DD" strokeWidth="1.5" />
                <text x="415" y="178" textAnchor="middle" fill="#686C65" fontSize="10">Engineering Wing</text>

                {/* Destination Classroom Block */}
                <rect x="560" y="60" width="110" height="85" rx="12" fill="#FFFFFF" stroke="#164A35" strokeWidth="2" />
                <text x="615" y="98" textAnchor="middle" fill="#164A35" fontSize="11" fontWeight="800">
                  {trackedOrder.customer.classroom}
                </text>
                <text x="615" y="115" textAnchor="middle" fill="#26734D" fontSize="9" fontWeight="600">
                  {trackedOrder.customer.floor}
                </text>

                {/* Campus Pathway Polyline */}
                <path
                  d="M85,250 C 180,260 220,180 340,195 S 480,210 615,115"
                  fill="none"
                  stroke="#DDEBCF"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M85,250 C 180,260 220,180 340,195 S 480,210 615,115"
                  fill="none"
                  stroke="#164A35"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />

                {/* Kitchen Origin Marker */}
                <circle cx="85" cy="250" r="10" fill="#164A35" />
                <circle cx="85" cy="250" r="4" fill="#FFFFFF" />

                {/* Destination Classroom Marker */}
                <circle cx="615" cy="115" r="10" fill="#26734D" />
                <circle cx="615" cy="115" r="4" fill="#FFFFFF" />

                {/* Moving Animated Driver / Runner Pin */}
                <g transform={`translate(${runnerX}, ${runnerY})`} style={{ transition: 'transform 0.8s ease-out' }}>
                  <circle cx="0" cy="0" r="18" fill="rgba(22, 74, 53, 0.2)" />
                  <circle cx="0" cy="0" r="12" fill="#164A35" />
                  <circle cx="0" cy="0" r="5" fill="#F3C779" />
                  {/* Tooltip above runner */}
                  <rect x="-35" y="-32" width="70" height="20" rx="10" fill="#164A35" />
                  <text x="0" y="-18" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">Runner #4</text>
                </g>
              </svg>

              {/* Map Footer Stats */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  borderTop: '1px solid var(--border-light)'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Destination Desk: </span>
                  <strong>{trackedOrder.customer.classroom}, {trackedOrder.customer.floor}</strong>
                </div>

                <div style={{ display: 'flex', gap: '1rem', color: 'var(--forest-green)', fontWeight: 650 }}>
                  <span>Route: 340m</span>
                  <span>Transit Speed: 12 km/h</span>
                </div>
              </div>
            </div>

            {/* FULFILLMENT TIMELINE */}
            <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 750, marginBottom: '1.25rem' }}>
                Fulfillment Progress
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  position: 'relative'
                }}
                className="timeline-grid"
              >
                {stages.map((st, idx) => {
                  const Icon = st.icon;
                  const isCompleted = idx < currentStageIndex;
                  const isCurrent = idx === currentStageIndex;
                  const isUpcoming = idx > currentStageIndex;

                  return (
                    <div
                      key={st.key}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative'
                      }}
                    >
                      {/* Circle Icon */}
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: isCompleted || isCurrent ? 'var(--forest-green)' : 'var(--bg-cream)',
                          color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                          border: isCurrent ? '3px solid var(--fresh-mint)' : '1px solid var(--border-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '0.65rem',
                          boxShadow: isCurrent ? '0 0 0 4px rgba(22, 74, 53, 0.15)' : 'none',
                          zIndex: 2,
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <Icon size={20} />
                      </div>

                      <strong
                        style={{
                          fontSize: '0.85rem',
                          color: isCurrent ? 'var(--forest-green)' : isCompleted ? 'var(--text-main)' : 'var(--text-muted)',
                          marginBottom: '2px',
                          lineHeight: 1.25
                        }}
                      >
                        {st.label}
                      </strong>

                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.3,
                          maxWidth: '140px'
                        }}
                      >
                        {st.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DRIVER / CAMPUS RUNNER CARD */}
            <div
              style={{
                backgroundColor: 'var(--bg-cream)',
                borderRadius: '16px',
                border: '1px solid var(--border-light)',
                padding: '1.15rem 1.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--fresh-mint)',
                    color: 'var(--forest-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.1rem'
                  }}
                >
                  RK
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '0.98rem', color: 'var(--text-main)' }}>
                      Rahul K.
                    </strong>
                    <span className="pill pill-mint" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                      Campus Courier #04
                    </span>
                  </div>
                  <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    Student Delivery Staff • Bicycle Transit
                  </span>
                </div>
              </div>

              <a
                href="tel:9876543210"
                className="btn btn-outline"
                style={{
                  padding: '0.5rem 1.15rem',
                  fontSize: '0.85rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <Phone size={15} />
                <span>Call Courier</span>
              </a>
            </div>
          </div>

          {/* Ordered Items Summary */}
          <div
            className="card"
            style={{
              padding: '1.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 750, marginBottom: '0.85rem' }}>
              Items in this Delivery
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {trackedOrder.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span>{it.quantity}× {it.name}</span>
                  <span style={{ fontWeight: 600 }}>₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-light)',
                marginTop: '0.75rem',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: 'var(--forest-green)'
              }}
            >
              <span>Total Paid/Payable</span>
              <span>₹{trackedOrder.total} ({trackedOrder.paymentStatus})</span>
            </div>
          </div>
        </div>
      )}

      {/* Responsive timeline CSS */}
      <style>{`
        @media (max-width: 640px) {
          .timeline-grid {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};
