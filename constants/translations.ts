export type Language = 'en' | 'ru' | 'uk';

type Translation = {
  [key: string]: string | Translation;
};

export const translations: Record<Language, Translation> = {
  en: {
    // Navigation & Tabs
    today: 'Today',
    calendar: 'Calendar',
    customers: 'Customers',
    services: 'Services',
    more: 'More',

    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    back: 'Back',

    // Today Screen
    todayAppointments: 'Today\'s Appointments',
    noAppointments: 'No appointments today',
    walkInQueue: 'Walk-in Queue',
    addWalkIn: 'Add Walk-In',
    upcomingAppointments: 'Upcoming',

    // Appointments
    bookAppointment: 'Book Appointment',
    appointmentDate: 'Date',
    appointmentTime: 'Time',
    appointmentService: 'Service',
    appointmentCustomer: 'Customer',
    appointmentStatus: 'Status',
    confirmed: 'Confirmed',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',

    // Customers
    customersTitle: 'Customers',
    addCustomer: 'Add Customer',
    customerName: 'Full Name',
    customerPhone: 'Phone Number',
    customerEmail: 'Email',
    customerProfile: 'Customer Profile',
    totalVisits: 'Total Visits',
    lastVisit: 'Last Visit',
    noCustomers: 'No customers yet',
    searchCustomers: 'Search customers...',
    visits: 'Visits',

    // Services
    servicesTitle: 'Services',
    serviceName: 'Service Name',
    servicePrice: 'Price',
    serviceDuration: 'Duration',
    serviceDescription: 'Description',
    addService: 'Add Service',
    minutes: 'minutes',

    // Settings
    settings: 'Settings',
    language: 'Language',
    darkMode: 'Dark Mode',
    serverSync: 'Server Sync',
    serverOnline: 'Server Online',
    serverOffline: 'Server Offline',
    uploadData: 'Upload Data',
    downloadData: 'Download Data',
    syncing: 'Syncing...',
    lastSynced: 'Last synced',
    syncError: 'Sync error',

    // Gallery
    gallery: 'Gallery',
    portfolio: 'Portfolio',
    shopProfile: 'Shop Profile',
    about: 'About',
    hours: 'Hours',
    location: 'Location',
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    website: 'Website',

    // Messages
    enterCustomerName: 'Please enter a customer name',
    enterPhoneNumber: 'Please enter a phone number',
    selectService: 'Please select a service',
    selectDate: 'Please select a date',
    selectTime: 'Please select a time',
    customerAdded: 'Customer added successfully',
    appointmentBooked: 'Appointment booked',
    tryDifferentSearch: 'Try a different search',
  },
  ru: {
    // Navigation & Tabs
    today: 'Сегодня',
    calendar: 'Календарь',
    customers: 'Клиенты',
    services: 'Услуги',
    more: 'Ещё',

    // Common
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    add: 'Добавить',
    search: 'Поиск',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    back: 'Назад',

    // Today Screen
    todayAppointments: 'Сегодня',
    noAppointments: 'Нет записей на сегодня',
    walkInQueue: 'Очередь для входа без записи',
    addWalkIn: 'Добавить клиента',
    upcomingAppointments: 'Предстоящие',

    // Appointments
    bookAppointment: 'Забронировать приём',
    appointmentDate: 'Дата',
    appointmentTime: 'Время',
    appointmentService: 'Услуга',
    appointmentCustomer: 'Клиент',
    appointmentStatus: 'Статус',
    confirmed: 'Подтверждено',
    pending: 'В ожидании',
    completed: 'Завершено',
    cancelled: 'Отменено',

    // Customers
    customersTitle: 'Клиенты',
    addCustomer: 'Добавить клиента',
    customerName: 'Полное имя',
    customerPhone: 'Номер телефона',
    customerEmail: 'Email',
    customerProfile: 'Профиль клиента',
    totalVisits: 'Всего визитов',
    lastVisit: 'Последний визит',
    noCustomers: 'Клиентов ещё нет',
    searchCustomers: 'Поиск по клиентам...',
    visits: 'Визиты',

    // Services
    servicesTitle: 'Услуги',
    serviceName: 'Название услуги',
    servicePrice: 'Цена',
    serviceDuration: 'Длительность',
    serviceDescription: 'Описание',
    addService: 'Добавить услугу',
    minutes: 'минут',

    // Settings
    settings: 'Параметры',
    language: 'Язык',
    darkMode: 'Тёмный режим',
    serverSync: 'Синхронизация с сервером',
    serverOnline: 'Сервер в сети',
    serverOffline: 'Сервер не в сети',
    uploadData: 'Загрузить данные',
    downloadData: 'Скачать данные',
    syncing: 'Синхронизация...',
    lastSynced: 'Последняя синхронизация',
    syncError: 'Ошибка синхронизации',

    // Gallery
    gallery: 'Галерея',
    portfolio: 'Портфолио',
    shopProfile: 'Профиль магазина',
    about: 'О нас',
    hours: 'Часы работы',
    location: 'Местоположение',
    contact: 'Контакт',
    phone: 'Телефон',
    email: 'Email',
    website: 'Веб-сайт',

    // Messages
    enterCustomerName: 'Пожалуйста, введите имя клиента',
    enterPhoneNumber: 'Пожалуйста, введите номер телефона',
    selectService: 'Пожалуйста, выберите услугу',
    selectDate: 'Пожалуйста, выберите дату',
    selectTime: 'Пожалуйста, выберите время',
    customerAdded: 'Клиент успешно добавлен',
    appointmentBooked: 'Приём зарезервирован',
    tryDifferentSearch: 'Попробуйте другой поиск',
  },
  uk: {
    // Navigation & Tabs
    today: 'Сьогодні',
    calendar: 'Календар',
    customers: 'Клієнти',
    services: 'Послуги',
    more: 'Ще',

    // Common
    save: 'Зберегти',
    cancel: 'Скасувати',
    delete: 'Видалити',
    edit: 'Редагувати',
    add: 'Додати',
    search: 'Пошук',
    loading: 'Завантаження...',
    error: 'Помилка',
    success: 'Успішно',
    back: 'Назад',

    // Today Screen
    todayAppointments: 'Сьогодні',
    noAppointments: 'Немає записів на сьогодні',
    walkInQueue: 'Черга без запису',
    addWalkIn: 'Додати клієнта',
    upcomingAppointments: 'Наступні',

    // Appointments
    bookAppointment: 'Забронювати візит',
    appointmentDate: 'Дата',
    appointmentTime: 'Час',
    appointmentService: 'Послуга',
    appointmentCustomer: 'Клієнт',
    appointmentStatus: 'Статус',
    confirmed: 'Підтверджено',
    pending: 'В очікуванні',
    completed: 'Завершено',
    cancelled: 'Скасовано',

    // Customers
    customersTitle: 'Клієнти',
    addCustomer: 'Додати клієнта',
    customerName: 'Повне ім\'я',
    customerPhone: 'Номер телефону',
    customerEmail: 'Email',
    customerProfile: 'Профіль клієнта',
    totalVisits: 'Всього візитів',
    lastVisit: 'Останній візит',
    noCustomers: 'Клієнтів ще немає',
    searchCustomers: 'Пошук за клієнтами...',
    visits: 'Візити',

    // Services
    servicesTitle: 'Послуги',
    serviceName: 'Назва послуги',
    servicePrice: 'Ціна',
    serviceDuration: 'Тривалість',
    serviceDescription: 'Опис',
    addService: 'Додати послугу',
    minutes: 'хвилин',

    // Settings
    settings: 'Параметри',
    language: 'Мова',
    darkMode: 'Темний режим',
    serverSync: 'Синхронізація з сервером',
    serverOnline: 'Сервер в мережі',
    serverOffline: 'Сервер не в мережі',
    uploadData: 'Завантажити дані',
    downloadData: 'Завантажити дані',
    syncing: 'Синхронізація...',
    lastSynced: 'Остання синхронізація',
    syncError: 'Помилка синхронізації',

    // Gallery
    gallery: 'Галерея',
    portfolio: 'Портфоліо',
    shopProfile: 'Профіль магазину',
    about: 'Про нас',
    hours: 'Години роботи',
    location: 'Місцезнаходження',
    contact: 'Контакт',
    phone: 'Телефон',
    email: 'Email',
    website: 'Веб-сайт',

    // Messages
    enterCustomerName: 'Будь ласка, введіть ім\'я клієнта',
    enterPhoneNumber: 'Будь ласка, введіть номер телефону',
    selectService: 'Будь ласка, виберіть послугу',
    selectDate: 'Будь ласка, виберіть дату',
    selectTime: 'Будь ласка, виберіть час',
    customerAdded: 'Клієнта успішно додано',
    appointmentBooked: 'Візит зарезервовано',
    tryDifferentSearch: 'Спробуйте інший пошук',
  },
};

export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return translations.en[key] as string || key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}
