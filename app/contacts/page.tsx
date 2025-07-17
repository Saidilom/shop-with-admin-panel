"use client"

import type React from "react"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import InteractiveMap from "@/components/interactive-map"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  TextIcon as Telegram,
  Navigation,
  ExternalLink,
} from "lucide-react"

export default function ContactsPage() {
  const { t } = useApp()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      titleUz: "Telefon",
      details: ["+998 90 123 45 67", "+998 91 234 56 78"],
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      action: () => window.open("tel:+998901234567"),
    },
    {
      icon: Mail,
      title: "Email",
      titleUz: "Email",
      details: ["info@stroimarket.uz", "sales@stroimarket.uz"],
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      action: () => window.open("mailto:info@stroimarket.uz"),
    },
    {
      icon: MapPin,
      title: "Адрес",
      titleUz: "Manzil",
      details: ["г. Ташкент, ул. Строительная, 15", "Индекс: 100000"],
      color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
      action: () => window.open("https://www.openstreetmap.org/?mlat=41.2995&mlon=69.2401&zoom=16", "_blank"),
    },
    {
      icon: Clock,
      title: "Режим работы",
      titleUz: "Ish vaqti",
      details: ["Пн-Пт: 8:00 - 18:00", "Сб: 9:00 - 16:00", "Вс: выходной"],
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
    },
  ]

  const subjects = ["Общий вопрос", "Заказ товара", "Техническая поддержка", "Сотрудничество", "Жалоба", "Предложение"]

  const openInMaps = () => {
    // Определяем устройство и открываем соответствующее приложение карт
    const lat = 41.2995
    const lng = 69.2401
    const address = "г. Ташкент, ул. Строительная, 15"

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // iOS - Apple Maps
      window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`)
    } else if (/android/i.test(navigator.userAgent)) {
      // Android - Google Maps
      window.open(`geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(address)})`)
    } else {
      // Desktop - Google Maps
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-black text-white py-12 sm:py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{t("contacts")}</h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь!
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Контактная информация</h2>

            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-all ${
                    info.action ? "cursor-pointer" : ""
                  }`}
                  onClick={info.action}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${info.color} flex-shrink-0`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{info.title}</h3>
                        {info.action && (
                          <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        )}
                      </div>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm sm:text-base text-gray-600 dark:text-gray-300 break-words">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Мы в социальных сетях</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                >
                  <Telegram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Быстрая навигация</h3>
              <button
                onClick={openInMaps}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Navigation className="w-5 h-5" />
                <span>Построить маршрут</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-md">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Напишите нам</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Имя *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Тема обращения *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    >
                      <option value="">Выберите тему</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Сообщение *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Опишите ваш вопрос или предложение..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? "Отправляем..." : "Отправить сообщение"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Как нас найти</h3>
              <button
                onClick={openInMaps}
                className="hidden sm:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Маршрут</span>
              </button>
            </div>

            <InteractiveMap address="г. Ташкент, ул. Строительная, 15" className="shadow-inner" />

            {/* Mobile route button */}
            <button
              onClick={openInMaps}
              className="sm:hidden w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Navigation className="w-5 h-5" />
              <span>Построить маршрут</span>
            </button>

            {/* Additional location info */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Ориентиры:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Рядом с торговым центром "Строитель"</li>
                <li>• Напротив автобусной остановки "Строительная"</li>
                <li>• 5 минут пешком от станции метро "Чиланзар"</li>
                <li>• Бесплатная парковка для клиентов</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
