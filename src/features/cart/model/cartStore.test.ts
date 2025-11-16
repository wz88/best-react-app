import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from './cartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({ items: [], isOpen: false });
  });

  describe('addItem', () => {
    it('should add a new item to cart', () => {
      const { addItem } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({
        id: '1',
        name: 'Product 1',
        price: 10,
        quantity: 1,
      });
    });

    it('should increment quantity if item already exists', () => {
      const { addItem } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });
      addItem({ id: '1', name: 'Product 1', price: 10 });

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { addItem, removeItem } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });
      addItem({ id: '2', name: 'Product 2', price: 20 });
      removeItem('1');

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe('2');
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });
      updateQuantity('1', 5);

      const state = useCartStore.getState();
      expect(state.items[0].quantity).toBe(5);
    });

    it('should remove item if quantity is 0 or less', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });
      updateQuantity('1', 0);

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { addItem, clearCart } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });
      addItem({ id: '2', name: 'Product 2', price: 20 });
      clearCart();

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(0);
    });
  });

  describe('cart drawer', () => {
    it('should toggle cart open/close', () => {
      const { toggleCart } = useCartStore.getState();

      expect(useCartStore.getState().isOpen).toBe(false);
      toggleCart();
      expect(useCartStore.getState().isOpen).toBe(true);
      toggleCart();
      expect(useCartStore.getState().isOpen).toBe(false);
    });

    it('should open cart', () => {
      const { openCart } = useCartStore.getState();

      openCart();
      expect(useCartStore.getState().isOpen).toBe(true);
    });

    it('should close cart', () => {
      const { openCart, closeCart } = useCartStore.getState();

      openCart();
      closeCart();
      expect(useCartStore.getState().isOpen).toBe(false);
    });
  });

  describe('computed values', () => {
    it('should calculate total price correctly', () => {
      const { addItem, getTotal } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });
      addItem({ id: '2', name: 'Product 2', price: 20 });
      addItem({ id: '1', name: 'Product 1', price: 10 }); // Increment quantity

      expect(getTotal()).toBe(40); // (10 * 2) + (20 * 1)
    });

    it('should calculate total item count correctly', () => {
      const { addItem, getItemCount } = useCartStore.getState();

      addItem({ id: '1', name: 'Product 1', price: 10 });
      addItem({ id: '2', name: 'Product 2', price: 20 });
      addItem({ id: '1', name: 'Product 1', price: 10 }); // Increment quantity

      expect(getItemCount()).toBe(3); // 2 + 1
    });
  });
});
