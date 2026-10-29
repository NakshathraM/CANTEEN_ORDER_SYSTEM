import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS
} from '../data/initialData';

const CanteenContext = createContext();

export const useCanteen = () => {
  const context = useContext(CanteenContext);
  if (!context) {
    throw new Error('useCanteen must be used within a CanteenProvider');
  }
  return context;
};

export const CanteenProvider = ({ children }) => {
  // Menu items with persistence and automatic enrichment for new initial items
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_canteen_menu');
      if (saved) {
        const parsed = JSON.parse(saved);
        const existingIds = new Set(parsed.map((i) => i.id));
        const missing = INITIAL_MENU_ITEMS.filter((i) => !existingIds.has(i.id));
        const updated = parsed.map((item) => {
          const fresh = INITIAL_MENU_ITEMS.find((f) => f.id === item.id);
          return fresh
            ? { ...item, image: fresh.image, category: fresh.category, name: fresh.name, description: fresh.description }
            : item;
        });
        return missing.length > 0 ? [...updated, ...missing] : updated;
      }
      return INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_canteen_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        const existingIds = new Set(parsed.map((c) => c.id));
        const missing = INITIAL_CATEGORIES.filter((c) => !existingIds.has(c.id));
        return missing.length > 0 ? [...parsed, ...missing] : parsed;
      }
      return INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_canteen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_canteen_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Student's recent order IDs (for instant 1-click status check)
  const [recentOrderIds, setRecentOrderIds] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_canteen_recent_orders');
      return saved ? JSON.parse(saved) : ['CC-9021'];
    } catch {
      return ['CC-9021'];
    }
  });

  // UI Navigation & Modals
  const [activeView, setActiveView] = useState('home'); // 'home' | 'menu' | 'track' | 'confirmation' | 'orders' | 'admin-login' | 'admin-dashboard'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFoodModal, setSelectedFoodModal] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('campus_admin_auth') === 'true';
  });

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Persistence side effects
  useEffect(() => {
    localStorage.setItem('campus_canteen_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('campus_canteen_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('campus_canteen_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('campus_canteen_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('campus_canteen_recent_orders', JSON.stringify(recentOrderIds));
  }, [recentOrderIds]);

  // Toast Helper
  const showToast = (message, type = 'royal') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart operations
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to cart`, 'coral');
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Item removed from cart', 'royal');
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartSubtotal > 0 ? 0 : 0; // Campus classroom delivery is complimentary
  const cartTotal = cartSubtotal + deliveryFee;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const reorder = (order) => {
    if (!order || !order.items || order.items.length === 0) return;
    let addedCount = 0;
    const unavailableNames = [];

    order.items.forEach((item) => {
      const currentItem = menuItems.find(
        (m) => m.id === item.id || m.name.toLowerCase() === item.name.toLowerCase()
      );
      if (currentItem && currentItem.isAvailable !== false) {
        setCart((prev) => {
          const existing = prev.find((i) => i.id === currentItem.id);
          if (existing) {
            return prev.map((i) =>
              i.id === currentItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
            );
          }
          return [...prev, { ...currentItem, quantity: item.quantity }];
        });
        addedCount++;
      } else {
        unavailableNames.push(item.name);
      }
    });

    if (addedCount > 0) {
      setIsCartOpen(true);
      showToast(`Items from Order #${order.id} added to Tray at current prices!`, 'mint');
    }
    if (unavailableNames.length > 0) {
      showToast(`Note: ${unavailableNames.join(', ')} currently sold out`, 'coral');
    }
  };

  // Place Order (Student)
  const placeOrder = (customerData, paymentMethod) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `CC-${randomNum}`;
    const now = new Date();

    const newOrder = {
      id: orderId,
      createdAt: now.toISOString(),
      customer: { ...customerData },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        dietary: item.dietary
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod.toLowerCase().includes('cash') ? 'Pending' : 'Paid',
      status: 'Received',
      estimatedDeliveryMins: 15,
      statusHistory: [
        {
          status: 'Received',
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setRecentOrderIds((prev) => [orderId, ...prev.filter((id) => id !== orderId)]);
    clearCart();
    setCurrentOrder(newOrder);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveView('confirmation');
    showToast(`Order #${orderId} placed successfully!`, 'coral');
    return newOrder;
  };

  // Order status update (Admin)
  const updateOrderStatus = (orderId, newStatus) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedHistory = [...(order.statusHistory || [])];
          if (!updatedHistory.some((h) => h.status === newStatus)) {
            updatedHistory.push({ status: newStatus, time: timeStr });
          }
          let newEst = order.estimatedDeliveryMins;
          if (newStatus === 'Preparing') newEst = 10;
          if (newStatus === 'Out for Delivery') newEst = 5;
          if (newStatus === 'Delivered') newEst = 0;

          return {
            ...order,
            status: newStatus,
            estimatedDeliveryMins: newEst,
            statusHistory: updatedHistory,
            paymentStatus: newStatus === 'Delivered' ? 'Paid' : order.paymentStatus
          };
        }
        return order;
      })
    );

    // If currently viewing this order in tracking or confirmation, update it
    if (currentOrder && currentOrder.id === orderId) {
      setCurrentOrder((prev) => ({
        ...prev,
        status: newStatus
      }));
    }

    showToast(`Order #${orderId} marked as ${newStatus}`, 'royal');
  };

  // Menu management (Admin)
  const addMenuItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      price: Number(itemData.price),
      isAvailable: true,
      popular: Boolean(itemData.popular)
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast(`Added ${newItem.name} to menu`, 'royal');
  };

  const updateMenuItem = (id, updatedData) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedData,
              price: Number(updatedData.price)
            }
          : item
      )
    );
    showToast('Menu item updated', 'royal');
  };

  const toggleAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
    showToast('Availability status updated', 'royal');
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item deleted from menu', 'coral');
  };

  // Category management
  const addCategory = (categoryName) => {
    if (!categoryName.trim()) return;
    const exists = categories.some(
      (c) => c.name.toLowerCase() === categoryName.trim().toLowerCase()
    );
    if (exists) {
      showToast('Category already exists', 'coral');
      return;
    }
    const newCat = {
      id: categoryName.trim(),
      name: categoryName.trim(),
      icon: 'Utensils'
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${categoryName}" added`, 'royal');
  };

  // Admin Auth
  const adminLogin = (password) => {
    // Configurable / Demo password
    if (password === 'campus2026' || password === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('campus_admin_auth', 'true');
      setActiveView('admin-dashboard');
      showToast('Welcome, Canteen Manager!', 'royal');
      return true;
    }
    showToast('Invalid password. Try "campus2026"', 'coral');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('campus_admin_auth');
    setActiveView('home');
    showToast('Logged out of Admin Portal', 'royal');
  };

  // Reset data helper
  const resetToSampleData = () => {
    localStorage.removeItem('campus_canteen_menu');
    localStorage.removeItem('campus_canteen_categories');
    localStorage.removeItem('campus_canteen_orders');
    localStorage.removeItem('campus_canteen_cart');
    localStorage.removeItem('campus_canteen_recent_orders');

    setMenuItems(INITIAL_MENU_ITEMS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setRecentOrderIds(['CC-9021']);
    showToast('Reset to fresh campus sample data', 'royal');
  };

  return (
    <CanteenContext.Provider
      value={{
        menuItems,
        categories,
        cart,
        orders,
        recentOrderIds,
        activeView,
        setActiveView,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedFoodModal,
        setSelectedFoodModal,
        reorder,
        currentOrder,
        setCurrentOrder,
        selectedCategory,
        setSelectedCategory,
        isAdminAuthenticated,
        toasts,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        cartCount,
        placeOrder,
        updateOrderStatus,
        addMenuItem,
        updateMenuItem,
        toggleAvailability,
        deleteMenuItem,
        addCategory,
        adminLogin,
        adminLogout,
        resetToSampleData
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};
