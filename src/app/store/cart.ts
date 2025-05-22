import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;       // Available stock
  quantityOrder: number;  // Quantity in cart
}

export interface CartStore {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantityOrder">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantityOrder: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addToCart: (product) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.id === product.id,
            );

            if (existingItem) {
              // If item exists, increase quantityOrder by 1 and decrease available quantity by 1
              return {
                items: state.items.map((item) =>
                  item.id === product.id
                    ? { 
                        ...item, 
                        quantityOrder: item.quantityOrder + 1,
                        quantity: item.quantity - 1 
                      }
                    : item,
                ),
              };
            }

            // For new item, set quantityOrder to 1 and decrease available quantity by 1
            return { 
              items: [
                ...state.items, 
                { 
                  ...product, 
                  quantityOrder: 1,
                  quantity: product.quantity - 1 
                }
              ] 
            };
          });
        },
        removeFromCart: (id) => {
          set((state) => ({
            items: state.items.map(item => {
              if (item.id === id) {
                // When removing from cart, return the ordered quantity back to available quantity
                return {
                  ...item,
                  quantity: item.quantity + item.quantityOrder,
                  quantityOrder: 0
                };
              }
              return item;
            }).filter(item => item.quantityOrder > 0) // Actually remove items with 0 quantityOrder
          }));
        },
        updateQuantity: (id, newQuantityOrder?:number) => {
          if(!newQuantityOrder) return
          if (newQuantityOrder <= 0) {
            get().removeFromCart(id);
            return;
          }

          set((state) => ({
            items: state.items.map((item) => {
              if (item.id === id) {
                const quantityDifference = newQuantityOrder - item.quantityOrder;
                return { 
                  ...item, 
                  quantityOrder: newQuantityOrder,
                  quantity: item.quantity - quantityDifference
                };
              }
              return item;
            }),
          }));
        },
        clearCart: () => set((state) => ({
          items: state.items.map(item => ({
            ...item,
            quantity: item.quantity + item.quantityOrder, // Return all ordered quantities
            quantityOrder: 0
          })).filter(item => item.quantityOrder > 0) // Clear the cart
        })),
        totalItems: () =>
          get().items.reduce((sum, item) => sum + item.quantityOrder, 0),
        totalPrice: () =>
          get().items.reduce(
            (sum, item) => sum + item.price * item.quantityOrder,
            0,
          ),
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);