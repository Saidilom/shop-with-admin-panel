"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useApp } from "@/contexts/app-context"
import { CreditCard, Smartphone, DollarSign, Truck, MapPin } from 'lucide-react'

const paymentMethods = [
  { id: "uzcard", name: "UzCard", icon: CreditCard, color: "bg-blue-500" },
  { id: "humo", name: "Humo", icon: Smartphone, color: "bg-green-500" },
  { id: "visa", name: "Visa", icon: CreditCard, color: "bg-purple-500" },
  { id: "cash", name: "Наличными", icon: DollarSign, color: "bg-gray-500" },
]

export default function CheckoutPage() {
  const { state, dispatch, t, getImageUrl } = useApp()
  const router = useRouter()
  const [selectedPayment, setSelectedPayment] = useState("uzcard")
  const [deliveryMethod, setDeliveryMethod] = useState("delivery")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: state.cart,
      total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "processing"
    }

    dispatch({ type: 'ADD_ORDER', payload: order })
    dispatch({ type: 'CLEAR_CART' })

    alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.')
    router.push('/profile')
  }

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (state.cart.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          {t('checkout')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
              {t('orderForm')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Введите ваше полное имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="+998 90 123 45 67"
                />
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Способ получения
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    deliveryMethod === 'delivery'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === 'delivery'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800 dark:text-white">{t('delivery')}</span>
                  </label>

                  <label className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === 'pickup'}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-800 dark:text-white">{t('pickup')}</span>
                  </label>
                </div>
              </div>

              {deliveryMethod === 'delivery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('address')} *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required={deliveryMethod === 'delivery'}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Улица, дом, квартира"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Комментарий к заказу
                </label>
                <textarea
                  name="comment"
                  rows={3}
                  value={formData.comment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Дополнительная информация..."
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  {t('paymentMethod')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon
                    return (
                      <label
                        key={method.id}
                        className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPayment === method.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`${method.color} w-8 h-8 rounded-full flex items-center justify-center mr-3`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-800 dark:text-white">{method.name}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Оформляем заказ..." : t('confirmOrder')}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
              Ваш заказ
            </h2>

            <div className="space-y-4 mb-6">
              {state.cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Image
                    src={getImageUrl(item) || "/placeholder.svg"}
                    alt={item.name[state.language]}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                      {item.name[state.language]}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.quantity} × {item.price.toLocaleString()} сум
                    </p>
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {(item.price * item.quantity).toLocaleString()} сум
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Товаров:</span>
                <span>{state.cart.reduce((sum, item) => sum + item.quantity, 0)} шт</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Сумма:</span>
                <span>{total.toLocaleString()} сум</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Доставка:</span>
                <span className="text-green-600 dark:text-green-400">
                  {deliveryMethod === 'delivery' ? 'Бесплатно' : 'Самовывоз'}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">
                <span>Итого:</span>
                <span className="text-blue-600 dark:text-blue-400">{total.toLocaleString()} сум</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Условия:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• {deliveryMethod === 'delivery' ? 'Бесплатная доставка по Ташкенту' : 'Самовывоз из магазина'}</li>
                <li>• {deliveryMethod === 'delivery' ? 'Доставка в течение 24 часов' : 'Готов к выдаче через 2 часа'}</li>
                <li>• Оплата при получении</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
