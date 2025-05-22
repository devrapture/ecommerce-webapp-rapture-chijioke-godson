import type { CartItem } from "@/app/store/cart";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};


export const getQuantityOrder = (id:number,items:CartItem[]) => {
    const cartItem = items?.find(cartItem => cartItem?.id === id)
    return cartItem?.quantityOrder
  }

export const isAddedToCart = (id:number,items:CartItem[]) => !!items?.find(cartItem => cartItem?.id === id)
