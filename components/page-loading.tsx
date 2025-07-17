"use client"

import LoadingSpinner from "./loading-spinner"

interface PageLoadingProps {
  message?: string
}

export default function PageLoading({ message = "Загрузка..." }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">{message}</p>
      </div>
    </div>
  )
}
