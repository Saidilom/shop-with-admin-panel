"use client"

import { useState } from "react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import LoadingSpinner from "./loading-spinner"
import { Search, ShoppingCart, User, Menu, X, Sun, Moon, Globe, Settings } from "lucide-react"

export default function Header() {
  const { state, dispatch, t } = useApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  const toggleTheme = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 200))
    dispatch({ type: "SET_THEME", payload: state.theme === "light" ? "dark" : "light" })
    setIsLoading(false)
  }

  const toggleLanguage = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 200))
    dispatch({ type: "SET_LANGUAGE", payload: state.language === "ru" ? "uz" : "ru" })
    setIsLoading(false)
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-xs">
          <div className="flex items-center space-x-6">
            <span className="text-gray-600 dark:text-gray-400">Бесплатная доставка от 500,000 сум</span>
            <span className="text-gray-600 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">Работаем 24/7</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleLanguage}
                disabled={isLoading}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors flex items-center space-x-1 ${
                  state.language === "ru"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : <span>RU</span>}
              </button>
              <button
                onClick={toggleLanguage}
                disabled={isLoading}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors flex items-center space-x-1 ${
                  state.language === "uz"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {isLoading ? <LoadingSpinner size="sm" /> : <span>UZ</span>}
              </button>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <button
              onClick={toggleTheme}
              disabled={isLoading}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
              title={state.theme === "light" ? "Темная тема" : "Светлая тема"}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : state.theme === "light" ? (
                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-600 dark:text-gray-400">+998 90 123 45 67</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-3 sm:py-4">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg">U</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">L</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Unlim_Lawe
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Строительная компания</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t("home")}
            </Link>
            <Link
              href="/catalog"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t("catalog")}
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/contacts"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {t("contacts")}
            </Link>
            <Link
              href="/admin"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium flex items-center space-x-1"
            >
              <Settings className="w-4 h-4" />
              <span>Админ</span>
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-4 lg:mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("search")}
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Mobile controls */}
            <div className="flex md:hidden items-center space-x-1">
              <button
                onClick={toggleLanguage}
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              <button
                onClick={toggleTheme}
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : state.theme === "light" ? (
                  <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>

            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              className="hidden sm:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 px-1">
            <div className="relative">
              <input
                type="text"
                placeholder={t("search")}
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-4 mx-1">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors py-3 px-4 rounded-lg font-medium"
              >
                {t("home")}
              </Link>
              <Link
                href="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors py-3 px-4 rounded-lg font-medium"
              >
                {t("catalog")}
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors py-3 px-4 rounded-lg font-medium"
              >
                {t("aboutUs")}
              </Link>
              <Link
                href="/contacts"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors py-3 px-4 rounded-lg font-medium"
              >
                {t("contacts")}
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors py-3 px-4 rounded-lg font-medium flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Админ панель</span>
              </Link>
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="sm:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors py-3 px-4 rounded-lg font-medium"
              >
                {t("profile")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
