import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  quantityOrder: number;
  category?: string;
  rating?: {
    rate?: number;
    count?: number;
  };
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
              return {
                items: state.items.map((item) =>
                  item.id === product.id
                    ? {
                        ...item,
                        quantityOrder: item.quantityOrder + 1,
                        quantity: item.quantity - 1,
                      }
                    : item,
                ),
              };
            }

            return {
              items: [
                ...state.items,
                {
                  ...product,
                  quantityOrder: 1,
                  quantity: product.quantity - 1,
                },
              ],
            };
          });
        },
        removeFromCart: (id) => {
          set((state) => ({
            items: state.items
              .map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    quantity: item.quantity + item.quantityOrder,
                    quantityOrder: 0,
                  };
                }
                return item;
              })
              .filter((item) => item.quantityOrder > 0),
          }));
        },
        updateQuantity: (id, newQuantityOrder?: number) => {
          if (!newQuantityOrder) return;
          if (newQuantityOrder <= 0) {
            get().removeFromCart(id);
            return;
          }

          set((state) => ({
            items: state.items.map((item) => {
              if (item.id === id) {
                const quantityDifference =
                  newQuantityOrder - item.quantityOrder;
                return {
                  ...item,
                  quantityOrder: newQuantityOrder,
                  quantity: item.quantity - quantityDifference,
                };
              }
              return item;
            }),
          }));
        },
        clearCart: () =>
          set((state) => ({
            items: state.items
              .map((item) => ({
                ...item,
                quantityOrder: 0,
              }))
              .filter((item) => item.quantityOrder > 0),
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
