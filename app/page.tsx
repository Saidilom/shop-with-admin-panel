"use client"

import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { categories, mockProducts } from "@/utils/mock-data"
import ProductCard from "@/components/product-card"
import { ArrowRight, Truck, Shield, CreditCard, Headphones } from "lucide-react"

export default function HomePage() {
  const { state, t } = useApp()

  const popularProducts = mockProducts.slice(0, 4)
  const newProducts = mockProducts.filter((p) => p.isNew).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">{t("mainBanner")}</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">{t("bannerSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalog"
                className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
              >
                {t("catalog")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t("aboutUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800 dark:text-white">
            {t("categories")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-4xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {state.language === "uz" ? category.nameUz : category.nameRu}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{t("popularProducts")}</h2>
            <Link
              href="/catalog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors text-sm sm:text-base"
            >
              <span className="hidden sm:inline">{t("viewAll")}</span>
              <span className="sm:hidden">Все</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} showQuickView />
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{t("newProducts")}</h2>
              <Link
                href="/catalog?new=true"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                {t("viewAll")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Быстрая доставка</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Доставим ваш заказ в течение 24 часов
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Гарантия качества</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Все товары сертифицированы</p>
            </div>
            <div className="text-center group">
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Удобная оплата</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">UzCard, Humo, Visa и наличные</p>
            </div>
            <div className="text-center group">
              <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Поддержка 24/7</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Всегда готовы помочь</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
