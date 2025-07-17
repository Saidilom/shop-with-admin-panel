"use client"

import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { Phone, Mail, MapPin, Facebook, Instagram, TextIcon as Telegram } from 'lucide-react'

export default function Footer() {
  const { t } = useApp()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold">StroiMarket</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {t('mainBanner')} - {t('bannerSubtitle')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Telegram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('catalog')}</h4>
            <div className="space-y-2 text-sm">
              <Link href="/catalog?category=tools" className="block text-gray-300 hover:text-white transition-colors">
                {t('tools')}
              </Link>
              <Link href="/catalog?category=plumbing" className="block text-gray-300 hover:text-white transition-colors">
                {t('plumbing')}
              </Link>
              <Link href="/catalog?category=electrical" className="block text-gray-300 hover:text-white transition-colors">
                {t('electrical')}
              </Link>
              <Link href="/catalog?category=paints" className="block text-gray-300 hover:text-white transition-colors">
                {t('paints')}
              </Link>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                {t('aboutUs')}
              </Link>
              <Link href="/delivery" className="block text-gray-300 hover:text-white transition-colors">
                {t('delivery')}
              </Link>
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/contacts" className="block text-gray-300 hover:text-white transition-colors">
                {t('contacts')}
              </Link>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contacts')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+998 90 123 45 67</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@stroimarket.uz</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 StroiMarket. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
