"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useApp } from "@/contexts/app-context"
import type { Product } from "@/contexts/app-context"
import { ShoppingCart, Eye, Heart, Star, Plus, Zap } from "lucide-react"

interface ProductCardProps {
  product: Product
  showQuickView?: boolean
}

export default function ProductCard({ product, showQuickView = false }: ProductCardProps) {
  const { state, dispatch, t } = useApp()
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    dispatch({ type: "ADD_TO_CART", payload: product })
    setIsLoading(false)

    // Notification
    const notification = document.createElement("div")
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-xl shadow-xl z-50 animate-fade-in flex items-center space-x-2"
    notification.innerHTML = `
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
      </svg>
      <span class="font-medium text-sm">Добавлено в корзину!</span>
    `
    document.body.appendChild(notification)
    setTimeout(() => document.body.removeChild(notification), 2500)
  }

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  const categoryImages: Record<string, string> = {
    tools: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=300&fit=crop",
    plumbing: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    electrical: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop",
    paints: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop",
    building: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop",
    garden: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
  }

  const getImageUrl = (product: Product): string => {
    if (product.image) return product.image
    return categoryImages[product.category] || categoryImages.tools
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative border border-gray-100 dark:border-gray-700 overflow-hidden h-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-col space-y-1">
        {product.isNew && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2 py-1 rounded-lg font-bold shadow-md flex items-center space-x-1">
            <Zap className="w-2.5 h-2.5" />
            <span>NEW</span>
          </div>
        )}
        {product.discount && (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-lg font-bold shadow-md">
            -{product.discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="bg-gray-500 text-white text-xs px-2 py-1 rounded-lg font-bold shadow-md">Нет в наличии</div>
        )}
      </div>

      {/* Quick Actions */}
      {isHovered && showQuickView && (
        <div className="absolute top-2 right-2 z-20 hidden sm:flex flex-col space-y-1">
          <button className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Heart className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
          </Link>
        </div>
      )}

      <Link href={`/product/${product.id}`}>
        {/* Image - квадратное соотношение */}
        <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 aspect-square">
          <Image
            src={imageError ? "/placeholder.svg" : getImageUrl(product)}
            alt={product.name[state.language]}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Mobile Quick Actions Overlay */}
          <div className="sm:hidden absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3">
              <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Eye className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content - компактный */}
        <div className="p-3">
          {/* Brand и Stock */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md">
              {product.brand}
            </span>
            {product.inStock && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
          </div>

          {/* Title - ограниченная высота */}
          <h3 className="font-semibold text-sm text-gray-800 dark:text-white mb-2 line-clamp-2 h-10 leading-5">
            {product.name[state.language]}
          </h3>

          {/* Rating - компактный */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-200 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
              #{product.id}
            </span>
          </div>

          {/* Price - компактный */}
          <div className="mb-3">
            {product.discount ? (
              <div className="space-y-1">
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg font-black text-gray-900 dark:text-white">
                    {discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">сум</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-400 line-through">{product.price.toLocaleString()}</span>
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1 py-0.5 rounded font-bold">
                    -{(product.price - discountedPrice).toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-black text-gray-900 dark:text-white">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">сум</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - компактный */}
      <div className="px-3 pb-3">
        <button
          onClick={addToCart}
          disabled={!product.inStock || isLoading}
          className={`w-full py-2.5 px-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-1.5 text-sm ${
            product.inStock
              ? isLoading
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              <span>Добавляем...</span>
            </>
          ) : (
            <>
              {product.inStock ? <Plus className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
              <span>{product.inStock ? "В корзину" : "Нет в наличии"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
