import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import type { CartItem } from '../types';

// Cart store - manages shopping cart state
// Location: features/cart/model (feature-owned business logic)
export const useCartStore = create(
  combine(
    // Initial state
    {
      items: [] as CartItem[],
      isOpen: false,
    },
    // Action creators
    (set, get) => ({
      // Add item to cart or increment quantity if exists
      addItem: (item: Omit<CartItem, 'quantity'>) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      // Remove item from cart
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      // Update item quantity
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      // Clear all items
      clearCart: () => {
        set({ items: [] });
      },

      // Toggle cart drawer
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Open cart
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart
      closeCart: () => {
        set({ isOpen: false });
      },

      // Computed: Get total price
      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      // Computed: Get total items count
      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    })
  )
);
