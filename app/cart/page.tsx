"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useApp } from "@/contexts/app-context"
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { state, dispatch, t, getImageUrl } = useApp()
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_CART_ITEM", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const applyPromoCode = () => {
    // Simple promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setPromoDiscount(0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "save20") {
      setPromoDiscount(0.2) // 20% discount
    } else {
      setPromoDiscount(0)
      alert("Промокод не найден")
    }
  }

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * promoDiscount
  const total = subtotal - discountAmount

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-gray-400 text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t("cartEmpty")}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Добавьте товары из каталога, чтобы оформить заказ</p>
            <Link
              href="/catalog"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {t("catalog")}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 transition-colors">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link
            href="/catalog"
            className="mr-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{t("cart")}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {state.cart.reduce((sum, item) => sum + item.quantity, 0)} товаров
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4">
              {state.cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors"
                >
                  <div className="p-3 sm:p-4">
                    <div className="flex space-x-3 sm:space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={getImageUrl(item) || "/placeholder.svg"}
                          alt={item.name[state.language]}
                          width={80}
                          height={80}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white line-clamp-2 leading-tight">
                              {item.name[state.language]}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{item.brand}</p>
                          </div>

                          {/* Remove button - mobile optimized */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                              {(item.price * item.quantity).toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {item.price.toLocaleString()} сум за шт.
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 sm:p-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-xl transition-colors"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-300" />
                            </button>

                            <span className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold text-sm sm:text-base text-gray-800 dark:text-white min-w-[2.5rem] text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 sm:p-2.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-xl transition-colors"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 sticky top-24 transition-colors">
              <h3 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800 dark:text-white">Итого</h3>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Промокод</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Введите код"
                    className="flex-1 px-3 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors text-sm"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center text-sm font-medium"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
                {promoDiscount > 0 && (
                  <p className="text-green-600 dark:text-green-400 text-sm mt-2 font-medium">
                    ✓ Промокод применен! Скидка {(promoDiscount * 100).toFixed(0)}%
                  </p>
                )}
              </div>

              {/* Summary Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Товаров:</span>
                  <span className="font-medium">{state.cart.reduce((sum, item) => sum + item.quantity, 0)} шт</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Сумма:</span>
                  <span className="font-medium">{subtotal.toLocaleString()} сум</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Скидка:</span>
                    <span className="font-medium">-{discountAmount.toLocaleString()} сум</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Доставка:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Бесплатно</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                    <span>К оплате:</span>
                    <span className="text-blue-600 dark:text-blue-400">{total.toLocaleString()} сум</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center block text-sm sm:text-base"
                >
                  Оформить заказ
                </Link>

                <Link
                  href="/catalog"
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center block text-sm sm:text-base"
                >
                  Продолжить покупки
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-2">Преимущества заказа:</h4>
                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Бесплатная доставка</li>
                  <li>• Гарантия качества</li>
                  <li>• Возврат в течение 14 дней</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
