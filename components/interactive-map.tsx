"use client"

import { useEffect, useRef } from "react"

interface InteractiveMapProps {
  address: string
  className?: string
}

export default function InteractiveMap({ address, className = "" }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Координаты для г. Ташкент, ул. Строительная, 15
    const lat = 41.2995
    const lng = 69.2401

    // Создаем iframe с картой
    const iframe = document.createElement("iframe")
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`
    iframe.width = "100%"
    iframe.height = "100%"
    iframe.style.border = "none"
    iframe.style.borderRadius = "8px"
    iframe.loading = "lazy"
    iframe.title = "Карта местоположения StroiMarket"

    // Очищаем контейнер и добавляем карту
    mapRef.current.innerHTML = ""
    mapRef.current.appendChild(iframe)

    // Добавляем кнопку для открытия в полном размере
    const openButton = document.createElement("button")
    openButton.innerHTML = "📍 Открыть в картах"
    openButton.className =
      "absolute top-2 right-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg shadow-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
    openButton.onclick = () => {
      window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=16#map=16/${lat}/${lng}`, "_blank")
    }

    mapRef.current.style.position = "relative"
    mapRef.current.appendChild(openButton)

    // Добавляем информацию об адресе
    const addressInfo = document.createElement("div")
    addressInfo.innerHTML = `
      <div class="absolute bottom-2 left-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg shadow-md text-sm z-10">
        <div class="font-semibold">StroiMarket</div>
        <div class="text-xs">${address}</div>
      </div>
    `
    mapRef.current.appendChild(addressInfo)
  }, [address])

  return (
    <div
      ref={mapRef}
      className={`w-full h-64 sm:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden ${className}`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Загрузка карты...</p>
        </div>
      </div>
    </div>
  )
}
