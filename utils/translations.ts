export const translations = {
  ru: {
    // Navigation
    home: "Главная",
    catalog: "Каталог",
    cart: "Корзина",
    profile: "Профиль",
    aboutUs: "О нас",
    contacts: "Контакты",
    search: "Поиск товаров...",

    // Theme and Language
    light: "Светлая",
    dark: "Тёмная",

    // Main page
    mainBanner: "Всё для строительства",
    bannerSubtitle: "Качественные строительные материалы и инструменты для ваших проектов",
    categories: "Категории",
    popularProducts: "Популярные товары",
    newProducts: "Новинки",
    viewAll: "Смотреть все",

    // Categories
    tools: "Инструменты",
    plumbing: "Сантехника",
    electrical: "Электрика",
    paints: "Краски",
    building: "Стройматериалы",
    garden: "Сад и огород",

    // Product
    addToCart: "В корзину",
    quickView: "Быстрый просмотр",
    specifications: "Характеристики",
    description: "Описание",
    reviews: "Отзывы",
    similarProducts: "Похожие товары",
    inStock: "В наличии",
    outOfStock: "Нет в наличии",
    brand: "Бренд",
    rating: "Рейтинг",

    // Cart
    cartEmpty: "Ваша корзина пуста",
    total: "Итого",
    promoCode: "Промокод",

    // Checkout
    checkout: "Оформить заказ",
    orderForm: "Данные для заказа",
    fullName: "ФИО",
    phone: "Телефон",
    address: "Адрес",
    delivery: "Доставка",
    pickup: "Самовывоз",
    paymentMethod: "Способ оплаты",
    confirmOrder: "Подтвердить заказ",

    // Profile
    orderHistory: "История заказов",
    settings: "Настройки",
    personalInfo: "Личная информация",

    // Common
    price: "Цена",
    quantity: "Количество",
    sum: "сум",
    loading: "Загрузка...",
    error: "Ошибка",
    save: "Сохранить",
    cancel: "Отмена",
    edit: "Редактировать",
    delete: "Удалить",

    // Order statuses
    processing: "Обрабатывается",
    confirmed: "Подтвержден",
    shipping: "Доставляется",
    delivered: "Доставлен",
    cancelled: "Отменен",

    // Footer
    privacy: "Политика конфиденциальности",
  },
  uz: {
    // Navigation
    home: "Bosh sahifa",
    catalog: "Katalog",
    cart: "Savatcha",
    profile: "Profil",
    aboutUs: "Biz haqimizda",
    contacts: "Aloqa",
    search: "Mahsulotlarni qidirish...",

    // Theme and Language
    light: "Yorug'",
    dark: "Qorong'u",

    // Main page
    mainBanner: "Barchasi qurilish uchun",
    bannerSubtitle: "Sifatli qurilish materiallari va asboblari sizning loyihalaringiz uchun",
    categories: "Kategoriyalar",
    popularProducts: "Mashhur mahsulotlar",
    newProducts: "Yangiliklar",
    viewAll: "Barchasini ko'rish",

    // Categories
    tools: "Asboblar",
    plumbing: "Santexnika",
    electrical: "Elektr",
    paints: "Bo'yoqlar",
    building: "Qurilish materiallari",
    garden: "Bog' va poliz",

    // Product
    addToCart: "Savatchaga",
    quickView: "Tezkor ko'rish",
    specifications: "Xususiyatlari",
    description: "Tavsif",
    reviews: "Sharhlar",
    similarProducts: "O'xshash mahsulotlar",
    inStock: "Mavjud",
    outOfStock: "Mavjud emas",
    brand: "Brend",
    rating: "Reyting",

    // Cart
    cartEmpty: "Savatchangiz bo'sh",
    total: "Jami",
    promoCode: "Promokod",

    // Checkout
    checkout: "Buyurtma berish",
    orderForm: "Buyurtma ma'lumotlari",
    fullName: "F.I.O",
    phone: "Telefon",
    address: "Manzil",
    delivery: "Yetkazib berish",
    pickup: "O'zim olib ketaman",
    paymentMethod: "To'lov usuli",
    confirmOrder: "Buyurtmani tasdiqlash",

    // Profile
    orderHistory: "Buyurtmalar tarixi",
    settings: "Sozlamalar",
    personalInfo: "Shaxsiy ma'lumotlar",

    // Common
    price: "Narx",
    quantity: "Miqdor",
    sum: "so'm",
    loading: "Yuklanmoqda...",
    error: "Xatolik",
    save: "Saqlash",
    cancel: "Bekor qilish",
    edit: "Tahrirlash",
    delete: "O'chirish",

    // Order statuses
    processing: "Qayta ishlanmoqda",
    confirmed: "Tasdiqlangan",
    shipping: "Yetkazilmoqda",
    delivered: "Yetkazildi",
    cancelled: "Bekor qilindi",

    // Footer
    privacy: "Maxfiylik siyosati",
  },
}

export type Language = "ru" | "uz"
export type TranslationKey = keyof typeof translations.ru
