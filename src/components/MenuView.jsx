import React, { useState, useMemo } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { FoodCard } from './FoodCard';
import {
  Search,
  X,
  Utensils,
  Soup,
  Cookie,
  Coffee,
  IceCream,
  Pizza,
  Sun,
  ArrowUpDown
} from 'lucide-react';

export const MenuView = () => {
  const {
    menuItems,
    categories,
    selectedCategory,
    setSelectedCategory
  } = useCanteen();

  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc'
  const [availableOnly, setAvailableOnly] = useState(false);

  // Icon mapping for category tabs
  const getCategoryIcon = (catName) => {
    switch (catName.toLowerCase()) {
      case 'breakfast':
        return Sun;
      case 'meals':
        return Soup;
      case 'fast food':
        return Pizza;
      case 'snacks':
        return Cookie;
      case 'beverages':
        return Coffee;
      case 'desserts':
        return IceCream;
      default:
        return Utensils;
    }
  };

  const filteredItems = useMemo(() => {
    let result = menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }
      // Available only
      if (availableOnly && item.isAvailable === false) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return result;
  }, [menuItems, selectedCategory, dietaryFilter, searchQuery, sortBy, availableOnly]);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '6rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2.25rem' }}>
        <div className="pill pill-mint" style={{ marginBottom: '0.45rem' }}>
          Daily Campus Menu
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>
          Explore Canteen Specialties
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
          Prepared fresh to order and brought straight to your classroom desk.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem',
          backgroundColor: '#ffffff',
          padding: '1.15rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {/* Search Input with Clear Button */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: '480px'
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by food name, ingredients, or craving..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: '2.6rem',
              paddingRight: searchQuery ? '2.4rem' : '1rem',
              borderRadius: 'var(--radius-full)'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                padding: '4px'
              }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          {/* Dietary Filter Buttons */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-cream)',
              borderRadius: 'var(--radius-full)',
              padding: '3px',
              border: '1px solid var(--border-light)'
            }}
          >
            <button
              type="button"
              onClick={() => setDietaryFilter('all')}
              style={{
                background: dietaryFilter === 'all' ? '#ffffff' : 'none',
                color: dietaryFilter === 'all' ? 'var(--forest-green)' : 'var(--text-secondary)',
                fontWeight: dietaryFilter === 'all' ? 700 : 500,
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                cursor: 'pointer',
                boxShadow: dietaryFilter === 'all' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setDietaryFilter('veg')}
              style={{
                background: dietaryFilter === 'veg' ? '#ffffff' : 'none',
                color: dietaryFilter === 'veg' ? '#26734D' : 'var(--text-secondary)',
                fontWeight: dietaryFilter === 'veg' ? 700 : 500,
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: dietaryFilter === 'veg' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span className="badge-diet veg" style={{ width: '12px', height: '12px' }}>
                <span className="diet-dot" style={{ width: '6px', height: '6px' }} />
              </span>
              <span>Veg Only</span>
            </button>

            <button
              type="button"
              onClick={() => setDietaryFilter('non-veg')}
              style={{
                background: dietaryFilter === 'non-veg' ? '#ffffff' : 'none',
                color: dietaryFilter === 'non-veg' ? '#d33838' : 'var(--text-secondary)',
                fontWeight: dietaryFilter === 'non-veg' ? 700 : 500,
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.825rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: dietaryFilter === 'non-veg' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <span className="badge-diet non-veg" style={{ width: '12px', height: '12px' }}>
                <span className="diet-dot" />
              </span>
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={15} color="var(--text-secondary)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-full)',
                width: 'auto',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Available Only toggle */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              style={{ accentColor: 'var(--forest-green)', width: '16px', height: '16px' }}
            />
            <span>Available only</span>
          </label>
        </div>
      </div>

      {/* Horizontal Category Chips */}
      <div
        style={{
          display: 'flex',
          gap: '0.65rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {categories.map((cat) => {
          const IconComponent = getCategoryIcon(cat.name);
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: isSelected ? '1.5px solid var(--forest-green)' : '1px solid var(--border-light)',
                backgroundColor: isSelected ? 'var(--forest-green)' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                fontFamily: 'var(--font-heading)',
                fontWeight: isSelected ? 750 : 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? '0 4px 14px rgba(22, 74, 53, 0.22)' : 'var(--shadow-sm)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <IconComponent size={17} color={isSelected ? '#FFFFFF' : 'var(--forest-green)'} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Results Count Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          paddingLeft: '0.25rem'
        }}
      >
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 550 }}>
          Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </span>
      </div>

      {/* Food Cards Grid */}
      {filteredItems.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="card"
          style={{
            padding: '4rem 1.5rem',
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
            <Search size={28} />
          </div>

          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
            No campus delicacies matched your search
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
            Try checking for spelling errors, clearing your search filter, or selecting "All Items".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setDietaryFilter('all');
              setAvailableOnly(false);
            }}
            className="btn btn-outline"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
