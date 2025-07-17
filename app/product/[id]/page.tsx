"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { mockProducts } from "@/utils/mock-data"
import ProductCard from "@/components/product-card"
import { ShoppingCart, Heart, Share2, Star, ArrowLeft, Plus, Minus } from "lucide-react"

export default function ProductPage() {
  const { id } = useParams()
  const { state, dispatch, t, getImageUrl } = useApp()
  const [product, setProduct] = useState(mockProducts.find((p) => p.id === Number.parseInt(id as string)))
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [reviews] = useState([
    {
      id: 1,
      author: "Алексей К.",
      rating: 5,
      date: "2024-01-15",
      text: "Отличный товар, качество на высоте. Рекомендую!",
    },
    {
      id: 2,
      author: "Мария С.",
      rating: 4,
      date: "2024-01-10",
      text: "Хорошее качество, быстрая доставка. Спасибо!",
    },
  ])

  const similarProducts = mockProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Товар не найден</h2>
            <Link
              href="/catalog"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }

    // Simple notification
    const notification = document.createElement("div")
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in"
    notification.textContent = `${quantity} товар(ов) добавлено в корзину!`
    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t("home")}
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t("catalog")}
          </Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-white">{product.name[state.language]}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <Image
                src={getImageUrl(product) || "/placeholder.svg"}
                alt={product.name[state.language]}
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-lg text-gray-600 dark:text-gray-300">{product.brand}</p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name[state.language]}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-300">
                {product.rating} ({reviews.length} отзывов)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.discount ? (
                <>
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {discountedPrice.toLocaleString()} {t("sum")}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {product.price.toLocaleString()} {t("sum")}
                    </span>
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">-{product.discount}%</span>
                  </div>
                </>
              ) : (
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {product.price.toLocaleString()} {t("sum")}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span
                className={`font-semibold ${product.inStock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {product.inStock ? t("inStock") : t("outOfStock")}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t("quantity")}:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold text-gray-800 dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={addToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{t("addToCart")}</span>
                  </button>
                  <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-16 transition-colors">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {t(tab as any)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description[state.language]}
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{key}:</span>
                    <span className="text-gray-600 dark:text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-800 dark:text-white">{review.author}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">{t("similarProducts")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} showQuickView />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
