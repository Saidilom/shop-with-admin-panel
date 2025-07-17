"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { translations, type Language, type TranslationKey } from "@/utils/translations"

export interface Product {
  id: number
  name: { ru: string; uz: string }
  price: number
  image?: string
  category: string
  brand: string
  rating: number
  inStock: boolean
  isNew?: boolean
  discount?: number
  description: { ru: string; uz: string }
  specifications: Record<string, string>
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: number
  date: string
  items: CartItem[]
  total: number
  status: "processing" | "confirmed" | "shipping" | "delivered" | "cancelled"
}

export interface AppState {
  theme: "light" | "dark"
  language: Language
  cart: CartItem[]
  orders: Order[]
  searchQuery: string
  selectedCategory: string
  selectedBrand: string
  sortBy: string
  user: {
    name: string
    phone: string
    email: string
  } | null
}

type AppAction =
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "UPDATE_CART_ITEM"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_BRAND"; payload: string }
  | { type: "SET_SORT_BY"; payload: string }
  | { type: "SET_USER"; payload: AppState["user"] }

const initialState: AppState = {
  theme: "light",
  language: "ru",
  cart: [],
  orders: [],
  searchQuery: "",
  selectedCategory: "",
  selectedBrand: "",
  sortBy: "popular",
  user: null,
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
  t: (key: TranslationKey) => string
  getImageUrl: (product: Product) => string
} | null>(null)

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload }

    case "SET_LANGUAGE":
      return { ...state, language: action.payload }

    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        }
      }
    }

    case "UPDATE_CART_ITEM":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        }
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }

    case "CLEAR_CART":
      return { ...state, cart: [] }

    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload }

    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload }

    case "SET_BRAND":
      return { ...state, selectedBrand: action.payload }

    case "SET_SORT_BY":
      return { ...state, sortBy: action.payload }

    case "SET_USER":
      return { ...state, user: action.payload }

    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const savedLanguage = localStorage.getItem("language") as Language | null
    const savedCart = localStorage.getItem("cart")
    const savedOrders = localStorage.getItem("orders")
    const savedUser = localStorage.getItem("user")

    if (savedTheme) {
      dispatch({ type: "SET_THEME", payload: savedTheme })
    }
    if (savedLanguage) {
      dispatch({ type: "SET_LANGUAGE", payload: savedLanguage })
    }
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart)
        cart.forEach((item: CartItem) => {
          for (let i = 0; i < item.quantity; i++) {
            dispatch({ type: "ADD_TO_CART", payload: item })
          }
        })
      } catch (e) {
        console.error("Error loading cart from localStorage:", e)
      }
    }
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders)
        orders.forEach((order: Order) => {
          dispatch({ type: "ADD_ORDER", payload: order })
        })
      } catch (e) {
        console.error("Error loading orders from localStorage:", e)
      }
    }
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "SET_USER", payload: user })
      } catch (e) {
        console.error("Error loading user from localStorage:", e)
      }
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("theme", state.theme)
    document.documentElement.classList.toggle("dark", state.theme === "dark")
  }, [state.theme])

  useEffect(() => {
    localStorage.setItem("language", state.language)
  }, [state.language])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(state.orders))
  }, [state.orders])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  const t = (key: TranslationKey): string => {
    return translations[state.language][key] || key
  }

  const getImageUrl = (product: Product): string => {
    if (product.image) return product.image

    // Используем более надежные источники изображений
    const categoryImages: Record<string, string> = {
      tools: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
      plumbing: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      electrical: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      paints: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop",
      building: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
      garden: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    }

    return (
      categoryImages[product.category] ||
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop"
    )
  }

  return <AppContext.Provider value={{ state, dispatch, t, getImageUrl }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
