import React, { useState, useMemo } from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  AlertCircle,
  Eye,
  EyeOff,
  Flame,
  Tag
} from 'lucide-react';

export const AdminMenu = () => {
  const {
    menuItems,
    categories,
    addMenuItem,
    updateMenuItem,
    toggleAvailability,
    deleteMenuItem,
    addCategory
  } = useCanteen();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Meals',
    price: '',
    dietary: 'veg',
    description: '',
    prepTime: '10-15 mins',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    popular: false
  });

  // Category modal state
  const [newCatName, setNewCatName] = useState('');
  const [showCatInput, setShowCatInput] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      if (selectedCat !== 'all' && item.category !== selectedCat) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [menuItems, selectedCat, searchQuery]);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: categories[1]?.name || 'Meals',
      price: '',
      dietary: 'veg',
      description: '',
      prepTime: '10-12 mins',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      popular: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      dietary: item.dietary,
      description: item.description,
      prepTime: item.prepTime || '10-12 mins',
      image: item.image,
      popular: Boolean(item.popular)
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    if (editingItem) {
      updateMenuItem(editingItem.id, formData);
    } else {
      addMenuItem(formData);
    }
    setIsModalOpen(false);
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory(newCatName.trim());
      setNewCatName('');
      setShowCatInput(false);
    }
  };

  return (
    <div>
      {/* Top Action Bar */}
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
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '380px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search food item name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.4rem', borderRadius: 'var(--radius-full)' }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => setShowCatInput(!showCatInput)}
            className="btn btn-outline-royal btn-sm"
          >
            <Tag size={15} />
            <span>Add Category</span>
          </button>

          <button
            onClick={openAddModal}
            className="btn btn-primary btn-sm"
          >
            <Plus size={16} />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Add Category Collapsible Form */}
      {showCatInput && (
        <form
          onSubmit={handleAddCategorySubmit}
          style={{
            backgroundColor: 'var(--royal-blue-light)',
            border: '1px solid var(--royal-blue-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}
        >
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--royal-blue)' }}>
            New Category Name:
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Combos, Healthy Bowls, South Special"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            style={{ maxWidth: '300px', backgroundColor: '#ffffff' }}
            autoFocus
          />
          <button type="submit" className="btn btn-royal btn-sm">
            Save Category
          </button>
          <button
            type="button"
            onClick={() => setShowCatInput(false)}
            className="btn btn-ghost btn-sm"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {categories.map((cat) => {
          const isSelected = (selectedCat === 'all' && (cat.id === 'all' || cat.name === 'All Items')) || selectedCat === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.name === 'All Items' ? 'all' : cat.name)}
              style={{
                border: '1px solid',
                borderColor: isSelected ? 'var(--royal-blue)' : 'var(--border-subtle)',
                backgroundColor: isSelected ? 'var(--royal-blue)' : '#ffffff',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Items Table / Cards */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--soft-white)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Item</th>
                <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                <th style={{ padding: '0.85rem 1rem' }}>Dietary</th>
                <th style={{ padding: '0.85rem 1rem' }}>Price</th>
                <th style={{ padding: '0.85rem 1rem' }}>Stock Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: item.isAvailable ? 'transparent' : '#fff8f8'
                  }}
                >
                  {/* Item Image and Name */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-sm)',
                          objectFit: 'cover',
                          backgroundColor: 'var(--warm-beige-light)'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{item.name}</span>
                          {item.popular && (
                            <span className="pill pill-coral" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                              <Flame size={10} /> Popular
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="pill pill-beige" style={{ fontSize: '0.75rem' }}>
                      {item.category}
                    </span>
                  </td>

                  {/* Dietary */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`badge-diet ${item.dietary}`}>
                        <span className="diet-dot" />
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'capitalize' }}>
                        {item.dietary}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: 'var(--royal-blue)', fontSize: '0.95rem' }}>
                    ₹{item.price}
                  </td>

                  {/* Stock Toggle */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: item.isAvailable ? 'var(--success-light)' : '#fee2e2',
                        color: item.isAvailable ? 'var(--success-green)' : '#dc2626',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {item.isAvailable ? <Check size={12} /> : <X size={12} />}
                      <span>{item.isAvailable ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(item)}
                        className="btn-ghost"
                        style={{
                          padding: '0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          color: 'var(--royal-blue)'
                        }}
                        title="Edit Item"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
                            deleteMenuItem(item.id);
                          }
                        }}
                        className="btn-ghost"
                        style={{
                          padding: '0.4rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          color: 'var(--coral-red)'
                        }}
                        title="Delete Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Item Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '540px' }}
          >
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff'
            }}>
              <h3 style={{ fontSize: '1.2rem' }}>
                {editingItem ? 'Edit Canteen Food Item' : 'Add New Food Item'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="menu-name">Item Name</label>
                <input
                  id="menu-name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Masala Dosa, Crispy Chicken Burger"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem'
              }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="menu-category">Category</label>
                  <select
                    id="menu-category"
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.filter((c) => c.name !== 'All Items').map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="menu-price">Price (₹)</label>
                  <input
                    id="menu-price"
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="e.g. 120"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem'
              }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="menu-dietary">Dietary Label</label>
                  <select
                    id="menu-dietary"
                    className="form-control"
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  >
                    <option value="veg">Vegetarian (Veg)</option>
                    <option value="non-veg">Non-Vegetarian (Non-Veg)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="menu-prep">Prep Time</label>
                  <input
                    id="menu-prep"
                    type="text"
                    className="form-control"
                    placeholder="e.g. 10-12 mins"
                    value={formData.prepTime}
                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="menu-desc">Short Description</label>
                <textarea
                  id="menu-desc"
                  className="form-control"
                  rows={2}
                  placeholder="Ingredients, preparation style, portion size..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="menu-image">Image URL</label>
                <input
                  id="menu-image"
                  type="url"
                  className="form-control"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  id="menu-popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--coral-red)' }}
                />
                <label htmlFor="menu-popular" style={{ fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                  Mark as Bestseller / Campus Favorite
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Save Changes' : 'Add Item to Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
