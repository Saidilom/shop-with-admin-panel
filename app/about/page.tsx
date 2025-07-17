"use client"

import { useApp } from "@/contexts/app-context"
import { Award, Truck, Shield, Target, Heart, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const { t } = useApp()

  const stats = [
    { number: "10+", label: "Лет на рынке", labelUz: "Yil bozorda" },
    { number: "50000+", label: "Довольных клиентов", labelUz: "Mamnun mijozlar" },
    { number: "10000+", label: "Товаров в каталоге", labelUz: "Katalogdagi mahsulotlar" },
    { number: "24/7", label: "Поддержка клиентов", labelUz: "Mijozlarni qo'llab-quvvatlash" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Качество",
      titleUz: "Sifat",
      description: "Мы работаем только с проверенными поставщиками и гарантируем качество всех товаров",
      descriptionUz:
        "Biz faqat tekshirilgan yetkazib beruvchilar bilan ishlaymiz va barcha mahsulotlarning sifatini kafolatlaymiz",
    },
    {
      icon: Truck,
      title: "Быстрая доставка",
      titleUz: "Tez yetkazib berish",
      description: "Доставляем заказы по всему Ташкенту в течение 24 часов",
      descriptionUz: "Buyurtmalarni butun Toshkent bo'ylab 24 soat ichida yetkazib beramiz",
    },
    {
      icon: Heart,
      title: "Забота о клиентах",
      titleUz: "Mijozlarga g'amxo'rlik",
      description: "Наша команда всегда готова помочь и ответить на любые вопросы",
      descriptionUz: "Bizning jamoamiz har doim yordam berishga va har qanday savolga javob berishga tayyor",
    },
    {
      icon: Award,
      title: "Профессионализм",
      titleUz: "Professionallik",
      description: "Многолетний опыт работы в сфере строительных материалов",
      descriptionUz: "Qurilish materiallari sohasida ko'p yillik ish tajribasi",
    },
  ]

  const team = [
    {
      name: "Алексей Иванов",
      nameUz: "Aleksey Ivanov",
      position: "Генеральный директор",
      positionUz: "Bosh direktor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Мария Петрова",
      nameUz: "Mariya Petrova",
      position: "Менеджер по продажам",
      positionUz: "Sotuv menejeri",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Дмитрий Сидоров",
      nameUz: "Dmitriy Sidorov",
      position: "Руководитель склада",
      positionUz: "Ombor rahbari",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-black text-white py-16 sm:py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">{t("aboutUs")}</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Мы — команда профессионалов, которая помогает воплощать строительные мечты в реальность уже более 10 лет
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800 dark:text-white">
              Наша история
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  StroiMarket начал свою деятельность в 2014 году как небольшой магазин строительных материалов. За годы
                  работы мы выросли в крупную компанию, которая обслуживает тысячи клиентов по всему Узбекистану.
                </p>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Наша миссия — сделать строительство доступным и качественным для каждого. Мы тщательно отбираем
                  поставщиков и следим за качеством каждого товара в нашем каталоге.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Сертифицированные товары
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Гарантия на все товары
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Профессиональная консультация
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-first lg:order-last">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop"
                  alt="Наш магазин"
                  className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800 dark:text-white">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center group">
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 dark:text-white">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800 dark:text-white">
            Наша команда
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 bg-blue-600 dark:bg-blue-800 text-white transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Наша миссия</h2>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
              Мы стремимся быть надежным партнером для каждого, кто занимается строительством — от профессиональных
              строителей до домашних мастеров. Наша цель — предоставить качественные материалы, инструменты и сервис,
              который превосходит ожидания.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
