import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { AdminOrders } from './AdminOrders';
import { AdminMenu } from './AdminMenu';
import {
  ShieldCheck,
  LogOut,
  ShoppingBag,
  Clock,
  ChefHat,
  Bike,
  CheckCircle2,
  DollarSign,
  Utensils,
  RefreshCw,
  Eye,
  TrendingUp,
  Layers
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    orders,
    menuItems,
    adminLogout,
    setActiveView,
    resetToSampleData
  } = useCanteen();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'menu'

  // Metric Computations
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'Received').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;
  const outForDeliveryCount = orders.filter((o) => o.status === 'Out for Delivery').length;
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' || o.status === 'Delivered' ? o.total : o.total), 0);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      {/* Top Admin Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        backgroundColor: '#ffffff',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--royal-blue)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(39, 74, 179, 0.25)'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                Canteen Dispatch & Admin
              </h1>
              <span className="pill pill-success" style={{ fontSize: '0.7rem' }}>
                Live Staff Session
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Managing incoming classroom food deliveries & kitchen inventory
            </p>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveView('home')}
            className="btn btn-outline-royal btn-sm"
            title="View app as student"
          >
            <Eye size={15} />
            <span>Student View</span>
          </button>

          <button
            onClick={resetToSampleData}
            className="btn btn-beige btn-sm"
            title="Reset to fresh demo orders and menu items"
          >
            <RefreshCw size={14} />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={adminLogout}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--coral-red)' }}
            title="Log out"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Today's Orders */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Orders</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--royal-blue-light)', color: 'var(--royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {totalOrdersCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Across all departments
          </div>
        </div>

        {/* Pending / Received */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Received (New)</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0369a1' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Awaiting kitchen prep
          </div>
        </div>

        {/* Preparing */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>In Kitchen</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChefHat size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#b45309' }}>
            {preparingCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Currently cooking
          </div>
        </div>

        {/* Out for Delivery */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Out for Delivery</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--coral-red-light)', color: 'var(--coral-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bike size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--coral-red)' }}>
            {outForDeliveryCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Runners climbing floors
          </div>
        </div>

        {/* Delivered */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Delivered</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--success-light)', color: 'var(--success-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success-green)' }}>
            {deliveredCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Classroom handovers
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="card" style={{ padding: '1.25rem', backgroundColor: 'var(--royal-blue)', color: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>Today's Revenue</span>
            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
            ₹{totalRevenue}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
            Gross canteen earnings
          </div>
        </div>
      </div>

      {/* Main Tabs (Orders vs Menu Management) */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '2px solid var(--border-subtle)',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            border: 'none',
            background: 'none',
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            color: activeTab === 'orders' ? 'var(--royal-blue)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'orders' ? '3px solid var(--royal-blue)' : '3px solid transparent',
            marginBottom: '-2px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease'
          }}
        >
          <ShoppingBag size={18} />
          <span>Classroom Orders</span>
          <span style={{
            backgroundColor: activeTab === 'orders' ? 'var(--royal-blue-light)' : 'var(--border-subtle)',
            color: activeTab === 'orders' ? 'var(--royal-blue)' : 'var(--text-secondary)',
            padding: '1px 8px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem'
          }}>
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('menu')}
          style={{
            border: 'none',
            background: 'none',
            padding: '0.75rem 1.5rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            color: activeTab === 'menu' ? 'var(--royal-blue)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'menu' ? '3px solid var(--royal-blue)' : '3px solid transparent',
            marginBottom: '-2px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.15s ease'
          }}
        >
          <Utensils size={18} />
          <span>Menu Inventory Management</span>
          <span style={{
            backgroundColor: activeTab === 'menu' ? 'var(--royal-blue-light)' : 'var(--border-subtle)',
            color: activeTab === 'menu' ? 'var(--royal-blue)' : 'var(--text-secondary)',
            padding: '1px 8px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem'
          }}>
            {menuItems.length}
          </span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'orders' ? <AdminOrders /> : <AdminMenu />}
    </div>
  );
};
