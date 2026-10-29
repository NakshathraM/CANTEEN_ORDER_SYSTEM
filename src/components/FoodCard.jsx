import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { Plus, Minus, Clock, Flame, Check, Utensils } from 'lucide-react';

export const FoodCard = ({ item }) => {
  const { cart, addToCart, updateQuantity, setSelectedFoodModal } = useCanteen();
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = cart.find((i) => i.id === item.id);
  const qty = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!item.isAvailable) return;
    addToCart(item);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1000);
  };

  const handleStepQty = (e, newQty) => {
    e.stopPropagation();
    updateQuantity(item.id, newQty);
  };

  return (
    <div
      className="card"
      onClick={() => setSelectedFoodModal(item)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '22px',
        border: '1.5px solid var(--border-light)'
      }}
    >
      {/* Food Image with overlay tags */}
      <div
        style={{
          position: 'relative',
          height: '190px',
          width: '100%',
          backgroundColor: 'var(--fresh-mint)',
          overflow: 'hidden'
        }}
      >
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1.0)';
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--forest-green)',
              gap: '0.5rem'
            }}
          >
            <Utensils size={32} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Campus Kitchen Specialty</span>
          </div>
        )}

        {/* Dietary symbol badge top-left */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(6px)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
          }}
        >
          <span className={`badge-diet ${item.dietary}`}>
            <span className="diet-dot" />
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 750,
              textTransform: 'uppercase',
              color: item.dietary === 'veg' ? '#26734D' : '#d33838'
            }}
          >
            {item.dietary === 'veg' ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Category & Status Pill top-right */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'flex-end'
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(22, 74, 53, 0.9)',
              backdropFilter: 'blur(6px)',
              color: '#ffffff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {item.category}
          </span>

          {!item.isAvailable && (
            <span
              style={{
                backgroundColor: 'rgba(211, 56, 56, 0.9)',
                backdropFilter: 'blur(6px)',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              Sold Out
            </span>
          )}
        </div>

        {/* Prep Time bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(6px)',
            color: 'var(--text-main)',
            padding: '2px 7px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontWeight: 650,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Flame size={12} color="#F3C779" />
          <span>{item.prepTime || '10 mins'}</span>
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '1.15rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.08rem',
              fontWeight: 750,
              color: 'var(--text-main)',
              marginBottom: '0.35rem',
              lineHeight: 1.3
            }}
          >
            {item.name}
          </h3>

          <p
            style={{
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '0.75rem'
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Bottom Price & Add to Tray Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.65rem',
            borderTop: '1px solid var(--border-light)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block' }}>
              Price
            </span>
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--forest-green)',
                fontFamily: 'var(--font-heading)'
              }}
            >
              ₹{item.price}
            </span>
          </div>

          {/* Stepper if in Cart, else Add Button */}
          {qty > 0 ? (
            <div
              className="qty-stepper"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="qty-btn"
                onClick={(e) => handleStepQty(e, qty - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus size={14} />
              </button>
              <span className="qty-count">{qty}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={(e) => handleStepQty(e, qty + 1)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={!item.isAvailable}
              className={`btn ${justAdded ? 'btn-mint' : 'btn-primary'}`}
              style={{
                padding: '0.48rem 1.05rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-full)'
              }}
              aria-label={`Add ${item.name} to tray`}
            >
              {justAdded ? (
                <>
                  <Check size={15} color="var(--forest-green)" />
                  <span>Added!</span>
                </>
              ) : !item.isAvailable ? (
                <span>Unavailable</span>
              ) : (
                <>
                  <Plus size={15} />
                  <span>Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
