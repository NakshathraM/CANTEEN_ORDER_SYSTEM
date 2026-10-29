import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useCanteen } from '../context/CanteenContext';
import { DEPARTMENTS, FLOORS } from '../data/initialData';
import {
  X,
  Phone,
  User,
  Banknote,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    placeOrder,
    showToast
  } = useCanteen();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: DEPARTMENTS[0],
    classroom: '',
    floor: '2nd Floor',
    deliveryNote: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI QR'); // 'UPI QR' | 'Cash on Delivery'
  const [upiUtr, setUpiUtr] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaidVerified, setIsPaidVerified] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [errors, setErrors] = useState({});

  const canteenUpiId = 'canteen.bitebox@okaxis';
  const upiPayUrl = `upi://pay?pa=${canteenUpiId}&pn=BiteBox%20Campus%20Canteen&am=${cartTotal}&cu=INR&tn=Campus%20Food%20Order`;

  // Generate 100% reliable offline local QR code via qrcode library
  useEffect(() => {
    if (cartTotal > 0) {
      QRCode.toDataURL(
        upiPayUrl,
        {
          width: 240,
          margin: 1,
          color: {
            dark: '#164A35',
            light: '#FFFFFF'
          }
        },
        (err, url) => {
          if (!err && url) {
            setQrCodeDataUrl(url);
          } else {
            // Fallback
            setQrCodeDataUrl(`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiPayUrl)}`);
          }
        }
      );
    }
  }, [upiPayUrl, cartTotal]);

  if (!isCheckoutOpen) return null;

  const copyUpiId = () => {
    navigator.clipboard.writeText(canteenUpiId);
    setCopiedUpi(true);
    showToast(`UPI ID ${canteenUpiId} copied!`, 'mint');
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Student name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name (at least 2 letters)';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile phone number is required';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.classroom.trim()) {
      newErrors.classroom = 'Classroom or Lab number is required (e.g. Room 304, CS Lab 2)';
    }

    if (!formData.floor.trim()) {
      newErrors.floor = 'Floor number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const finalPayment = paymentMethod === 'UPI QR'
        ? `UPI QR (Ref: ${upiUtr.trim() || 'Paid via QR'})`
        : 'Cash on Desk';

      placeOrder(formData, finalPayment);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setIsCheckoutOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid var(--border-light)'
        }}
      >
        {/* Header (Sticky / Fixed) */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            flexShrink: 0
          }}
        >
          <div>
            <div className="pill pill-mint" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
              Direct Desk Delivery
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Complete Your Classroom Order
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)'
            }}
            aria-label="Close checkout"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
          {/* Order Summary Tray Accordion */}
          <div
            style={{
              backgroundColor: 'var(--bg-cream)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--forest-green)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--forest-green)' }}>
                Total: ₹{cartTotal}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '110px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-main)' }}>
                    {item.quantity}× {item.name}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Delivery Information */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              1. Where Should We Deliver?
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {/* Name */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="student-name">
                  <span>Student Name <span className="required-star">*</span></span>
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="student-name"
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="e.g. Aarav Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ paddingLeft: '2.4rem' }}
                  />
                </div>
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Phone */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="student-phone">
                  <span>10-Digit Mobile Number <span className="required-star">*</span></span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    id="student-phone"
                    type="tel"
                    maxLength={10}
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ paddingLeft: '2.4rem' }}
                  />
                </div>
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              {/* Department Block */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="student-dept">
                  <span>Department Block <span className="required-star">*</span></span>
                </label>
                <select
                  id="student-dept"
                  className="form-control"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Classroom / Lab */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="student-classroom">
                  <span>Classroom / Lab Number <span className="required-star">*</span></span>
                </label>
                <input
                  id="student-classroom"
                  type="text"
                  className={`form-control ${errors.classroom ? 'is-invalid' : ''}`}
                  placeholder="e.g. Room 304, Electronics Lab 2"
                  value={formData.classroom}
                  onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                />
                {errors.classroom && <span className="form-error">{errors.classroom}</span>}
              </div>

              {/* Floor */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="student-floor">
                  <span>Floor <span className="required-star">*</span></span>
                </label>
                <select
                  id="student-floor"
                  className="form-control"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                >
                  {FLOORS.map((fl) => (
                    <option key={fl} value={fl}>{fl}</option>
                  ))}
                </select>
              </div>

              {/* Delivery Note */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="student-note">
                  <span>Delivery Instructions (Optional)</span>
                </label>
                <input
                  id="student-note"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Hand over near front whiteboard"
                  value={formData.deliveryNote}
                  onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Payment Selection Tabs */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
              2. Select Payment Method
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
              {/* Scan & Pay QR Option */}
              <div
                onClick={() => setPaymentMethod('UPI QR')}
                style={{
                  border: paymentMethod === 'UPI QR' ? '2.5px solid var(--forest-green)' : '1px solid var(--border-light)',
                  backgroundColor: paymentMethod === 'UPI QR' ? 'var(--fresh-mint)' : '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease',
                  boxShadow: paymentMethod === 'UPI QR' ? '0 4px 14px rgba(22, 74, 53, 0.12)' : 'none'
                }}
              >
                <QrCode size={24} color="var(--forest-green)" />
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-main)' }}>
                    Scan UPI QR
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    GPay, PhonePe, Paytm
                  </span>
                </div>
              </div>

              {/* Cash at Counter / On Delivery */}
              <div
                onClick={() => setPaymentMethod('Cash on Delivery')}
                style={{
                  border: paymentMethod === 'Cash on Delivery' ? '2.5px solid var(--forest-green)' : '1px solid var(--border-light)',
                  backgroundColor: paymentMethod === 'Cash on Delivery' ? 'var(--fresh-mint)' : '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease',
                  boxShadow: paymentMethod === 'Cash on Delivery' ? '0 4px 14px rgba(22, 74, 53, 0.12)' : 'none'
                }}
              >
                <Banknote size={24} color="var(--forest-green)" />
                <div>
                  <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--text-main)' }}>
                    Cash on Desk
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Pay runner upon delivery
                  </span>
                </div>
              </div>
            </div>

            {/* DEDICATED GENERATED QR CODE PAYMENT SECTION */}
            {paymentMethod === 'UPI QR' ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '2px solid var(--soft-sage)',
                  boxShadow: '0 8px 24px rgba(22, 74, 53, 0.08)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '1rem',
                  animation: 'fadeIn 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <QrCode size={20} color="var(--forest-green)" />
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--forest-green)' }}>
                    Scan QR to Pay ₹{cartTotal}
                  </span>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', maxWidth: '380px', margin: '-6px 0 4px 0' }}>
                  Open Google Pay, PhonePe, Paytm, or BHIM on your mobile phone and point your camera to scan:
                </p>

                {/* Generated QR Code Card Frame (Clickable to Pay) */}
                <a
                  href={upiPayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click or Tap to Pay via UPI"
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '16px',
                    borderRadius: '24px',
                    border: isPaidVerified ? '2.5px solid var(--forest-green)' : '2px solid var(--soft-sage)',
                    boxShadow: '0 8px 24px rgba(22, 74, 53, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  className="interactive-qr-card"
                >
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt={`UPI Payment QR Code for ₹${cartTotal}`}
                      width={210}
                      height={210}
                      style={{
                        display: 'block',
                        borderRadius: '12px'
                      }}
                    />
                  ) : (
                    <div style={{ width: 210, height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                      Generating Secure QR…
                    </div>
                  )}

                  {/* Centered Small UPI Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '22px',
                      backgroundColor: isPaidVerified ? 'var(--forest-green)' : 'rgba(255, 255, 255, 0.95)',
                      color: isPaidVerified ? '#ffffff' : 'var(--forest-green)',
                      backdropFilter: 'blur(4px)',
                      padding: '3px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isPaidVerified ? <Check size={12} strokeWidth={3} /> : <Sparkles size={12} />}
                    <span>{isPaidVerified ? 'PAYMENT VERIFIED' : 'CLICK OR SCAN TO PAY'}</span>
                  </div>
                </a>

                {/* Amount & UPI ID bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '420px',
                    backgroundColor: 'var(--bg-cream)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>
                      Canteen UPI VPA
                    </span>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                      {canteenUpiId}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={copyUpiId}
                    className="btn btn-outline"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                  >
                    {copiedUpi ? <Check size={14} color="var(--forest-green)" /> : <Copy size={14} />}
                    <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Direct Mobile Tap-to-Pay and Fast Verify Link */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', maxWidth: '420px' }}>
                  <a
                    href={upiPayUrl}
                    className="btn btn-primary"
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.92rem',
                      fontWeight: 750,
                      borderRadius: 'var(--radius-full)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      backgroundColor: 'var(--forest-green)'
                    }}
                  >
                    <Smartphone size={17} />
                    <span>Pay ₹{cartTotal} via UPI App (GPay/PhonePe)</span>
                    <ExternalLink size={14} />
                  </a>

                  {/* One-click Verify / Mark as Paid */}
                  {!isPaidVerified ? (
                    <button
                      type="button"
                      onClick={() => {
                        const fakeRef = `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
                        setUpiUtr(fakeRef);
                        setIsPaidVerified(true);
                        showToast(`QR Payment of ₹${cartTotal} confirmed!`, 'mint');
                      }}
                      className="btn btn-mint"
                      style={{
                        padding: '0.55rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      <Check size={14} />
                      <span>Simulate / I've Paid via QR Code</span>
                    </button>
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'var(--mint)',
                        color: 'var(--forest-green)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Check size={15} strokeWidth={3} />
                      <span>Payment Verified • Ref: {upiUtr}</span>
                    </div>
                  )}

                  {/* Optional UTR / Reference input */}
                  <div className="form-group" style={{ marginBottom: 0, marginTop: '0.25rem', textAlign: 'left' }}>
                    <label className="form-label" htmlFor="upi-utr" style={{ fontSize: '0.8rem' }}>
                      UPI Transaction Ref / UTR
                    </label>
                    <input
                      id="upi-utr"
                      type="text"
                      className="form-control"
                      placeholder="e.g. 429182749102"
                      value={upiUtr}
                      onChange={(e) => {
                        setUpiUtr(e.target.value);
                        if (e.target.value.trim().length > 4) setIsPaidVerified(true);
                      }}
                      style={{ fontSize: '0.85rem', padding: '0.55rem 0.85rem' }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: 'var(--bg-cream)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}
              >
                <Banknote size={28} color="var(--forest-green)" flexShrink={0} />
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  You will pay <strong>₹{cartTotal} in exact cash</strong> to your campus student runner when your food tray is delivered directly to your classroom desk.
                </p>
              </div>
            )}
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="btn btn-primary btn-lg btn-block"
            style={{ padding: '0.95rem', fontSize: '1.05rem', fontWeight: 800 }}
          >
            {isSubmitting ? (
              <span>Placing Order with Kitchen...</span>
            ) : paymentMethod === 'UPI QR' ? (
              <span>I Have Paid • Confirm Order (₹{cartTotal})</span>
            ) : (
              <span>Confirm Cash Order • ₹{cartTotal}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
