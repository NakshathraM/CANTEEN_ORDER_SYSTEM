import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useCanteen } from '../context/CanteenContext';
import { Plus, Check, Sparkles, Flame, Eye } from 'lucide-react';

export const CurvedFoodCarousel = () => {
  const { menuItems, addToCart, setSelectedFoodModal } = useCanteen();
  const containerRef = useRef(null);

  // Selected 10 signature dishes for the cinematic food studio carousel
  const carouselItems = React.useMemo(() => {
    // Pick the 10 featured items or fallback to top items
    const preferredIds = [
      'item-7', // Crispy Fries
      'item-2', // Chicken Burger
      'item-15', // Margherita Pizza
      'item-16', // Alfredo Pasta
      'item-4', // Butter Chicken Rice Bowl
      'item-1', // Paneer Kathi Roll
      'item-17', // Fresh Watermelon Juice
      'item-12', // Chocolate Brownie
      'item-3', // Masala Dosa
      'item-8' // Chicken Momos
    ];

    const matched = preferredIds
      .map((id) => menuItems.find((m) => m.id === id))
      .filter(Boolean);

    // If fewer than 10 matched, pad with other menu items
    if (matched.length < 10) {
      const rest = menuItems.filter((m) => !matched.some((item) => item.id === m.id));
      return [...matched, ...rest].slice(0, 10);
    }
    return matched;
  }, [menuItems]);

  // Animation & Dragging Physics State
  const offsetRef = useRef(0);
  const velocityRef = useRef(-0.55); // base continuous speed (px per frame)
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isHoveredRef = useRef(false);
  const animationFrameRef = useRef(null);
  const [justAddedId, setJustAddedId] = useState(null);

  // Duplicate items 3 times for a completely seamless infinite loop
  const totalCards = carouselItems.length * 3;
  const cardWidth = 280; // card spacing width in px
  const loopWidth = carouselItems.length * cardWidth;

  const updateCardTransforms = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth || 1000;
    const centerX = containerWidth / 2;

    const cards = container.querySelectorAll('.curved-card-wrapper');
    cards.forEach((cardEl) => {
      const index = parseInt(cardEl.dataset.index, 10);
      let posX = (index * cardWidth + offsetRef.current) % (totalCards * cardWidth);
      if (posX < -cardWidth * 2) {
        posX += totalCards * cardWidth;
      }

      // Calculate distance from center normalized (-1 to +1 across container)
      const distFromCenter = (posX + cardWidth / 2 - centerX) / (containerWidth * 0.55);
      const clampedDist = Math.max(-1.5, Math.min(1.5, distFromCenter));

      // Cylindrical Curved geometry:
      // Center cards are upright and prominent
      // Edge cards curve backwards and arc upward/taller
      const arcY = Math.pow(Math.abs(clampedDist), 1.7) * 42; // upward curvature
      const rotateZ = clampedDist * 7.5; // slight tilt along the cylindrical curve
      const scale = Math.max(0.85, 1.05 - Math.abs(clampedDist) * 0.18);
      const opacity = Math.max(0.25, 1 - Math.pow(Math.abs(clampedDist) * 0.7, 2));

      cardEl.style.transform = `translate3d(${posX}px, ${arcY}px, 0) scale(${scale}) rotate(${rotateZ}deg)`;
      cardEl.style.opacity = opacity;
      cardEl.style.zIndex = Math.round((1 - Math.abs(clampedDist)) * 100);
    });
  }, [cardWidth, totalCards]);

  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (timestamp) => {
      const dt = Math.min(32, timestamp - lastTimestamp);
      lastTimestamp = timestamp;

      if (!isDraggingRef.current) {
        if (!isHoveredRef.current) {
          // Normal auto-scroll with momentum damping
          offsetRef.current += velocityRef.current * (dt / 16);
          // Gently return velocity to baseline speed (-0.55)
          velocityRef.current += (-0.55 - velocityRef.current) * 0.05;
        } else {
          // Slow down while hovering
          offsetRef.current += velocityRef.current * 0.25 * (dt / 16);
        }
      }

      // Keep offset bounded to prevent floating precision loss
      if (offsetRef.current <= -loopWidth) {
        offsetRef.current += loopWidth;
      } else if (offsetRef.current > 0) {
        offsetRef.current -= loopWidth;
      }

      updateCardTransforms();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [loopWidth, updateCardTransforms]);

  // Pointer & Touch Drag Handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastXRef.current = startXRef.current;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Pointer capture
    if (e.target && e.target.setPointerCapture && e.pointerId) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - lastXRef.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);

    offsetRef.current += deltaX;
    // Calculate release velocity
    velocityRef.current = (deltaX / dt) * 16;

    lastXRef.current = clientX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    // Clamp momentum
    velocityRef.current = Math.max(-18, Math.min(18, velocityRef.current));
    // If momentum is tiny, default to auto-scroll
    if (Math.abs(velocityRef.current) < 0.3) {
      velocityRef.current = -0.55;
    }
  };

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    if (!item.isAvailable) return;
    addToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  return (
    <section
      aria-label="Cinematic Featured Food Carousel"
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '1rem',
        paddingBottom: '2.5rem',
        userSelect: 'none',
        touchAction: 'pan-y'
      }}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* Curved Perspective Horizon Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: '420px',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          cursor: isDraggingRef.current ? 'grabbing' : 'grab'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Render 3 copies of items for seamless cylindrical flow */}
        {Array.from({ length: 3 }).map((_, loopIdx) =>
          carouselItems.map((item, itemIdx) => {
            const globalIndex = loopIdx * carouselItems.length + itemIdx;
            const isAdded = justAddedId === item.id;

            return (
              <div
                key={`${item.id}-${globalIndex}`}
                data-index={globalIndex}
                className="curved-card-wrapper"
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '0px',
                  width: `${cardWidth - 24}px`,
                  height: '370px',
                  willChange: 'transform, opacity',
                  transition: isDraggingRef.current ? 'none' : 'box-shadow 0.25s ease'
                }}
              >
                {/* Curved Reelmark-style Organic Food Card */}
                <div
                  onClick={() => setSelectedFoodModal(item)}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    border: '1.5px solid var(--border-light)',
                    boxShadow: '0 14px 34px rgba(22, 74, 53, 0.08), 0 2px 8px rgba(0,0,0,0.03)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--forest-green)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                >
                  {/* Food Media with organic top curve */}
                  <div
                    style={{
                      height: '215px',
                      width: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: 'var(--fresh-mint)'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1.0)';
                      }}
                    />

                    {/* Gradient vignette */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.3) 100%)',
                        pointerEvents: 'none'
                      }}
                    />

                    {/* Dietary badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
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

                    {/* Category pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(22, 74, 53, 0.92)',
                        backdropFilter: 'blur(6px)',
                        color: '#FFFFFF',
                        padding: '3px 9px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.category}
                    </div>

                    {/* Prep time chip bottom-left */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(6px)',
                        color: 'var(--text-main)',
                        padding: '3px 8px',
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

                  {/* Card Content & Action Bar */}
                  <div
                    style={{
                      padding: '1rem 1.15rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 750,
                          color: 'var(--text-main)',
                          marginBottom: '0.25rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Add Control */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '0.65rem',
                        paddingTop: '0.6rem',
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

                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        disabled={!item.isAvailable}
                        className={`btn ${isAdded ? 'btn-mint' : 'btn-primary'}`}
                        style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          borderRadius: 'var(--radius-full)',
                          transition: 'all 0.2s ease'
                        }}
                        aria-label={`Add ${item.name} to tray`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} color="var(--forest-green)" />
                            <span>Added!</span>
                          </>
                        ) : !item.isAvailable ? (
                          <span>Sold out</span>
                        ) : (
                          <>
                            <Plus size={16} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Subtle Drag Guidance Caption */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: 'var(--text-secondary)',
          fontSize: '0.825rem'
        }}
      >
        <span className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--forest-green)' }}>
          ← Drag horizontally or click any card for chef details →
        </span>
      </div>
    </section>
  );
};
