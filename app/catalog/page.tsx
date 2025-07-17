"use client"

import { useState, useMemo } from "react"
import { useApp } from "@/contexts/app-context"
import { categories, mockProducts, brands } from "@/utils/mock-data"
import ProductCard from "@/components/product-card"
import {
  Grid,
  List,
  ChevronDown,
  X,
  Filter,
  Search,
  TrendingUp,
  Star,
  DollarSign,
  Sparkles,
  RefreshCw,
} from "lucide-react"

export default function CatalogPage() {
  const { state, dispatch, t } = useApp()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000])
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 10000000])
  const [showInStock, setShowInStock] = useState(false)
  const [showWithDiscount, setShowWithDiscount] = useState(false)

  const sortOptions = [
    { value: "popular", label: "По популярности", icon: TrendingUp },
    { value: "price-asc", label: "Цена: по возрастанию", icon: DollarSign },
    { value: "price-desc", label: "Цена: по убыванию", icon: DollarSign },
    { value: "rating", label: "По рейтингу", icon: Star },
    { value: "new", label: "Новинки", icon: Sparkles },
  ]

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts

    // Search filter
    if (state.searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.ru.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.name.uz.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (state.selectedCategory) {
      filtered = filtered.filter((product) => product.category === state.selectedCategory)
    }

    // Brand filter
    if (state.selectedBrand) {
      filtered = filtered.filter((product) => product.brand === state.selectedBrand)
    }

    // Price filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Stock filter
    if (showInStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Discount filter
    if (showWithDiscount) {
      filtered = filtered.filter((product) => product.discount && product.discount > 0)
    }

    // Sort
    switch (state.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "new":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // popular - keep original order but prioritize in stock
        filtered.sort((a, b) => {
          if (a.inStock && !b.inStock) return -1
          if (!a.inStock && b.inStock) return 1
          return b.rating - a.rating
        })
        break
    }

    return filtered
  }, [
    state.searchQuery,
    state.selectedCategory,
    state.selectedBrand,
    state.sortBy,
    priceRange,
    showInStock,
    showWithDiscount,
  ])

  const applyPriceFilter = () => {
    setPriceRange(tempPriceRange)
  }

  const resetFilters = () => {
    dispatch({ type: "SET_CATEGORY", payload: "" })
    dispatch({ type: "SET_BRAND", payload: "" })
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" })
    setPriceRange([0, 10000000])
    setTempPriceRange([0, 10000000])
    setShowInStock(false)
    setShowWithDiscount(false)
  }

  const activeFiltersCount = [
    state.selectedCategory,
    state.selectedBrand,
    state.searchQuery,
    priceRange[1] < 10000000 ? "price" : null,
    showInStock ? "stock" : null,
    showWithDiscount ? "discount" : null,
  ].filter(Boolean).length

  const selectedSortOption = sortOptions.find((option) => option.value === state.sortBy) || sortOptions[0]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Enhanced Header */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("catalog")}
              </h1>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Найдено: <span className="font-bold text-blue-600 dark:text-blue-400">{filteredProducts.length}</span>{" "}
                  товаров
                </span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {activeFiltersCount} фильтров активно
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Enhanced Sort */}
              <div className="relative">
                <select
                  value={state.sortBy}
                  onChange={(e) => dispatch({ type: "SET_SORT_BY", payload: e.target.value })}
                  className="appearance-none bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 pr-12 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-semibold min-w-[200px] shadow-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* View Mode - улучшенный */}
              <div className="hidden lg:flex border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-all ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-all ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle - улучшенный */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden relative flex items-center space-x-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
              >
                <Filter className="w-4 h-4" />
                <span className="font-semibold">Фильтры</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar - улучшенный */}
          <div className="lg:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск товаров, брендов..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })}
                className="w-full px-4 py-3 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 space-y-6 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Фильтры</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="flex items-center space-x-1 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Сбросить</span>
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                  Быстрые фильтры
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showInStock}
                      onChange={(e) => setShowInStock(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Только в наличии
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showWithDiscount}
                      onChange={(e) => setShowWithDiscount(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Со скидкой
                    </span>
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                  Категории
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => dispatch({ type: "SET_CATEGORY", payload: "" })}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all text-sm font-semibold ${
                      state.selectedCategory === ""
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Все категории
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => dispatch({ type: "SET_CATEGORY", payload: category.id })}
                      className={`w-full text-left px-4 py-3 rounded-2xl transition-all text-sm font-semibold flex items-center space-x-3 ${
                        state.selectedCategory === category.id
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{state.language === "uz" ? category.nameUz : category.nameRu}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Бренды</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => dispatch({ type: "SET_BRAND", payload: "" })}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all text-sm font-semibold ${
                      state.selectedBrand === ""
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Все бренды
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => dispatch({ type: "SET_BRAND", payload: brand })}
                      className={`w-full text-left px-4 py-3 rounded-2xl transition-all text-sm font-semibold ${
                        state.selectedBrand === brand
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Цена</h4>
                <div className="space-y-4">
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="50000"
                      value={tempPriceRange[1]}
                      onChange={(e) => setTempPriceRange([tempPriceRange[0], Number.parseInt(e.target.value)])}
                      className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">0 сум</span>
                    <span className="font-bold text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                      {tempPriceRange[1].toLocaleString()} сум
                    </span>
                  </div>
                  <button
                    onClick={applyPriceFilter}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    Применить цену
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">Товары не найдены</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Попробуйте изменить параметры поиска или фильтры, чтобы найти нужные товары
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showQuickView={viewMode === "grid"} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
