/**
 * Lokal Kitchen — Direct Food Delivery & Catalog (Production Edition)
 * Single Source of Truth (PRODUCTS & CONFIG), Dynamic Catalog Rendering,
 * Product Customizer Modal, Payment Selector, Customer Profile & Order Dispatcher
 */

// ============================================================================
// 1. БАЗОВАЯ КОНФИГУРАЦИЯ ЗАВЕДЕНИЯ (CONFIG)
// Все настройки клиента меняются здесь за 1 минуту:
// ============================================================================
const CONFIG = {
  restaurantName: 'Lokal Kitchen',
  restaurantTagline: 'Craft Food & Direct Delivery',
  telegramUsername: 'zifca',          // Telegram-контакт или бот (без @)
  whatsappPhone: '79991234567',      // Номер WhatsApp для приёма заказов (без +)
  displayPhone: '+7 (999) 123-45-67', // Красиво отформатированный телефон
  freeDeliveryThreshold: 1200,       // Порог бесплатной доставки в рублях
  deliveryPrice: 150,                // Стоимость доставки (если меньше порога)
  pickupDiscountPercent: 10,         // Скидка за самовывоз (в %)
  deliveryTime: '35-45 мин',         // Среднее время доставки
  pickupAddress: 'г. Москва, ул. Большая Покровская, 14 (вход с аллеи)',
  workingHours: 'Ежедневно с 10:00 до 22:30',
  welcomeGiftText: 'Фирменный ягодный морс', // Подарок к заказу
  firstOrderGiftNotice: 'Морс или десерт к первому прямому заказу'
};

// ============================================================================
// 2. ЕДИНАЯ МОДЕЛЬ ДАННЫХ (PRODUCTS) — Single Source of Truth
// ============================================================================
const PRODUCTS = [
  // --- ПИЦЦА И СЭНДВИЧИ ---
  {
    id: 'pizza-stracciatella',
    category: 'pizza',
    title: 'Пицца Страчателла & Песто',
    desc: 'Хрустящие неаполитанские бортики из дровяной печи, свежая сливочная страчателла, спелые томаты черри, соус песто и оливковое масло extra virgin.',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    basePrice: 690,
    weight: '30 см • 480 г',
    badge: { text: 'Хит продаж', type: 'hit' },
    tags: ['🧀 Сливочная', '🌱 Вегетарианская'],
    sizes: [
      { name: '30 см (480 г)', priceDelta: 0 },
      { name: '40 см (750 г)', priceDelta: 320 }
    ],
    modifiers: [
      { id: 'extra_cheese', name: 'Двойная страчателла', price: 140 },
      { id: 'garlic_crust', name: 'Чесночно-сырный бортик', price: 110 },
      { id: 'truffle_oil', name: 'Капли трюфельного масла', price: 80 }
    ]
  },
  {
    id: 'pizza-pepperoni',
    category: 'pizza',
    title: 'Пицца Пепперони Hot Honey',
    desc: 'Пикантная чоризо и острая пепперони, сыр моцарелла, томатный соус San Marzano и капли жгуче-сладкого перцового мёда чили.',
    img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80',
    basePrice: 620,
    weight: '30 см • 450 г',
    badge: { text: 'Острая нотка', type: 'new' },
    tags: ['🌶️ Острая', '🔥 Из дровяной печи'],
    sizes: [
      { name: '30 см (450 г)', priceDelta: 0 },
      { name: '40 см (710 г)', priceDelta: 290 }
    ],
    modifiers: [
      { id: 'extra_jalapeno', name: 'Экстра халапеньо', price: 60 },
      { id: 'extra_mozzarella', name: 'Дополнительная моцарелла', price: 110 },
      { id: 'dip_sauce', name: 'Фирменный сырный дип', price: 70 }
    ]
  },
  {
    id: 'pizza-four-cheese',
    category: 'pizza',
    title: 'Пицца 4 Сыра с грушей и мёдом',
    desc: 'Сливочная основа, сыр горгонзола с благородной плесенью, моцарелла, пармезан, скаморца, карамелизированная груша и грецкие орехи.',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    basePrice: 680,
    weight: '30 см • 470 г',
    badge: { text: 'Шеф-выбор', type: 'chef' },
    tags: ['🧀 4 Сыра', '🍐 Сладкая груша'],
    sizes: [
      { name: '30 см (470 г)', priceDelta: 0 },
      { name: '40 см (730 г)', priceDelta: 310 }
    ],
    modifiers: [
      { id: 'extra_gorgonzola', name: 'Дополнительная горгонзола', price: 120 },
      { id: 'extra_walnuts', name: 'Дроблёный грецкий орех', price: 60 }
    ]
  },
  {
    id: 'ciabatta-prosciutto',
    category: 'pizza',
    title: 'Чиабатта с прошутто & пармой',
    desc: 'Хрустящая домашняя чиабатта на закваске, тончайшее итальянское прошутто, моцарелла fiore di latte, вяленые томаты и свежая руккола.',
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    basePrice: 390,
    weight: '220 г',
    badge: { text: 'Сытный ланч', type: 'chef' },
    tags: ['🥪 Крафтовый хлеб', '🥩 Мясное'],
    sizes: [],
    modifiers: [
      { id: 'extra_meat', name: 'Двойная порция прошутто', price: 120 },
      { id: 'no_greens', name: 'Без рукколы', price: 0 }
    ]
  },

  // --- РОЛЛЫ И БОУЛЫ ---
  {
    id: 'roll-philadelphia',
    category: 'rolls',
    title: 'Филадельфия Премиум',
    desc: 'Крупный охлаждённый фарерский лосось, нежнейший сливочный сыр Cremette, свежий огурец и спелое авокадо хасс.',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80',
    basePrice: 670,
    weight: '8 шт • 290 г',
    badge: { text: 'Любимое', type: 'hit' },
    tags: ['🐟 Фарерский лосось', '🥑 Спелое авокадо'],
    sizes: [
      { name: '8 шт (290 г)', priceDelta: 0 },
      { name: '12 шт (430 г)', priceDelta: 310 }
    ],
    modifiers: [
      { id: 'extra_unagi', name: 'Полить унаги + кунжут', price: 50 },
      { id: 'spicy_sauce', name: 'Острый соус спайси', price: 50 }
    ]
  },
  {
    id: 'bowl-salmon',
    category: 'rolls',
    title: 'Поке-боул с лососем и киноа',
    desc: 'Маринованный в понзу лосось, тёплый рис жасмин или киноа, бобы эдамаме, чука, слайсы авокадо, кунжут и ореховый соус гомадаре.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    basePrice: 590,
    weight: '340 г',
    badge: { text: 'Здоровый выбор', type: 'chef' },
    tags: ['🥗 Без глютена', '🥑 Суперфуд'],
    sizes: [
      { name: 'Стандарт (340 г)', priceDelta: 0 },
      { name: 'XXL порция (460 г)', priceDelta: 240 }
    ],
    modifiers: [
      { id: 'extra_salmon', name: 'Двойная порция лосося', price: 160 },
      { id: 'extra_avocado', name: 'Половинка авокадо', price: 90 }
    ]
  },
  {
    id: 'roll-volcano',
    category: 'rolls',
    title: 'Запечённый ролл Вулкан с крабом',
    desc: 'Нежное мясо снежного краба, тигровые креветки, сливочный сыр, шапочка из соуса спайси под грилем и сладкий соус унаги.',
    img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=700&q=80',
    basePrice: 580,
    weight: '8 шт • 310 г',
    badge: { text: 'Горячий', type: 'new' },
    tags: ['🦀 Снежный краб', '🔥 Запечённый'],
    sizes: [
      { name: '8 шт (310 г)', priceDelta: 0 },
      { name: '12 шт (460 г)', priceDelta: 270 }
    ],
    modifiers: [
      { id: 'extra_tobiko', name: 'Икра тобико сверху', price: 70 },
      { id: 'jalapeno_slice', name: 'Слайс халапеньо к каждому', price: 40 }
    ]
  },

  // --- КОФЕ И НАПИТКИ ---
  {
    id: 'drink-cappuccino',
    category: 'coffee',
    title: 'Капучино Спешелти',
    desc: 'Двойной шот свежеобжаренной арабики из Эфиопии, бархатистая молочная пена с орехово-шоколадными нотами.',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80',
    basePrice: 260,
    weight: '350 мл',
    badge: { text: '100% Арабика', type: 'hit' },
    tags: ['☕ Свежая обжарка', '🥛 Выбор молока'],
    sizes: [
      { name: 'Средний 350 мл', priceDelta: 0 },
      { name: 'Большой 450 мл', priceDelta: 60 }
    ],
    modifiers: [
      { id: 'milk_oat', name: 'Овсяное молоко Nemoloko Barista', price: 50 },
      { id: 'milk_coconut', name: 'Кокосовое молоко Alpro', price: 60 },
      { id: 'syrup_caramel', name: 'Домашняя солёная карамель', price: 40 }
    ]
  },
  {
    id: 'drink-seabuckthorn',
    category: 'coffee',
    title: 'Облепиховый чай & Розмарин',
    desc: 'Натуральная протёртая лесная облепиха, веточка свежего розмарина, апельсин, натуральный цветочный мёд и пряный бадьян.',
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80',
    basePrice: 290,
    weight: '500 мл',
    badge: { text: 'Согревающий', type: 'chef' },
    tags: ['🍯 Натуральный мёд', '🍊 Витамины'],
    sizes: [
      { name: 'Стакан 500 мл', priceDelta: 0 },
      { name: 'Термобутылка 800 мл', priceDelta: 130 }
    ],
    modifiers: [
      { id: 'extra_ginger', name: 'Добавить корень имбиря', price: 40 },
      { id: 'no_sugar', name: 'Без сахара и мёда', price: 0 }
    ]
  },
  {
    id: 'drink-lavender-raf',
    category: 'coffee',
    title: 'Лавандово-черничный Раф',
    desc: 'Сливочный кофе на натуральных сливках 10%, цветы крымской лаванды, черничный мусс и тростниковый сахар.',
    img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80',
    basePrice: 320,
    weight: '350 мл',
    badge: { text: 'Авторский', type: 'new' },
    tags: ['🫐 Черника & Лаванда', '🍦 Сливочный'],
    sizes: [
      { name: '350 мл', priceDelta: 0 },
      { name: '450 мл', priceDelta: 60 }
    ],
    modifiers: [
      { id: 'extra_cream', name: 'Экстра взбитые сливки', price: 40 },
      { id: 'marshmallow', name: 'Мини-маршмеллоу', price: 30 }
    ]
  },

  // --- ВЫПЕЧКА И ДЕСЕРТЫ ---
  {
    id: 'dessert-cheesecake',
    category: 'dessert',
    title: 'Баскский чизкейк Сан-Себастьян',
    desc: 'Карамелизированная обожжённая корочка снаружи и нежная кремовая текстура с натуральной мадагаскарской ванилью внутри.',
    img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80',
    basePrice: 370,
    weight: '170 г',
    badge: { text: 'Шедевр', type: 'hit' },
    tags: ['🍰 Свежая выпечка', '✨ Шеф-десерт'],
    sizes: [
      { name: '1 порция (170 г)', priceDelta: 0 },
      { name: 'Двойная (340 г)', priceDelta: 310 }
    ],
    modifiers: [
      { id: 'pistachio_paste', name: 'Топпинг из 100% фисташки', price: 90 },
      { id: 'salted_caramel', name: 'Топпинг солёная карамель', price: 60 }
    ]
  },
  {
    id: 'dessert-croissant',
    category: 'dessert',
    title: 'Миндальный круассан Франжипан',
    desc: 'Французское слоёное тесто на натуральном сливочном масле 82.5%, крем франжипан и обжаренные лепестки миндаля.',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    basePrice: 240,
    weight: '130 г',
    badge: { text: 'Каждое утро', type: 'hit' },
    tags: ['🥐 Слоеное тесто', '🌰 Миндаль'],
    sizes: [
      { name: '1 шт (130 г)', priceDelta: 0 },
      { name: 'Пара 2 шт (260 г)', priceDelta: 200 }
    ],
    modifiers: [
      { id: 'warm_croissant', name: 'Подогреть перед отправкой', price: 0 }
    ]
  }
];

// ============================================================================
// 3. СОСТОЯНИЕ ПРИЛОЖЕНИЯ (APP STATE)
// ============================================================================
let cart = [];
let orderType = 'delivery'; // 'delivery' | 'pickup'
let paymentMethod = 'card'; // 'card' | 'sbp' | 'cash'
let activeFilter = 'all';

// Состояние настраиваемого в модальном окне товара
let modalState = {
  product: null,
  selectedSizeIndex: 0,
  selectedModifiers: new Set()
};

// ============================================================================
// 4. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ DOM
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  applyConfigToDOM();
  loadCartFromStorage();
  loadCustomerProfile();
  renderCatalog();
  initCatalogTabs();
  initCartDrawer();
  initProductModal();
  initOrderTypeSwitch();
  initPaymentMethodSwitch();
  initCheckoutActions();
  initAddressCopy();
  updateCartUI();
});

// ============================================================================
// 5. ДИНАМИЧЕСКОЕ ПРИМЕНЕНИЕ КОНФИГУРАЦИИ К СТРАНИЦЕ (1-MINUTE CLIENT SETUP)
// ============================================================================
function applyConfigToDOM() {
  const safeSetText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  const safeSetHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  const safeSetHref = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('href', href);
  };

  // 1. Верхняя строка (Top Bar)
  safeSetHtml('topBarInfo', `<strong>Доставка за ${CONFIG.deliveryTime}</strong> • Бесплатно от ${CONFIG.freeDeliveryThreshold} ₽`);
  safeSetText('topBarPromoText', CONFIG.firstOrderGiftNotice);
  safeSetText('topBarDiscountBadge', `Самовывоз -${CONFIG.pickupDiscountPercent}%`);
  safeSetText('topBarPhone', CONFIG.displayPhone);
  safeSetHref('topBarPhone', `tel:+${CONFIG.whatsappPhone}`);

  // 2. Шапка
  safeSetText('headerBrandTitle', CONFIG.restaurantName);
  safeSetText('headerBrandSub', CONFIG.restaurantTagline);

  // 3. Hero-мессенджеры
  safeSetHref('heroTgBtn', `https://t.me/${CONFIG.telegramUsername}`);
  safeSetHref('heroWaBtn', `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent('Здравствуйте! Хочу сделать заказ в ' + CONFIG.restaurantName)}`);

  // 4. Статистика доставки
  safeSetText('statDeliveryTime', CONFIG.deliveryTime);
  safeSetText('statFreeThreshold', `от ${CONFIG.freeDeliveryThreshold} ₽`);
  safeSetText('statPickupDiscount', `-${CONFIG.pickupDiscountPercent}%`);
  safeSetText('statGiftTitle', `🎁 ${CONFIG.welcomeGiftText}`);

  // 5. Контакты
  safeSetText('pickupAddressText', CONFIG.pickupAddress);
  safeSetText('contactWorkingHours', CONFIG.workingHours);
  safeSetText('contactPhone', CONFIG.displayPhone);
  safeSetHref('contactPhone', `tel:+${CONFIG.whatsappPhone}`);
  safeSetHref('contactTgBtn', `https://t.me/${CONFIG.telegramUsername}`);
  safeSetHref('contactWaBtn', `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent('Здравствуйте! Подскажите по заказу в ' + CONFIG.restaurantName)}`);

  // 6. Мобильный бар
  safeSetHref('mobileNavPhone', `tel:+${CONFIG.whatsappPhone}`);

  // 7. Футер
  safeSetText('footerBrandTitle', CONFIG.restaurantName);
  safeSetText('footerBrandSub', CONFIG.restaurantTagline);
  safeSetHref('footerTgBtn', `https://t.me/${CONFIG.telegramUsername}`);
  safeSetHref('footerWaBtn', `https://wa.me/${CONFIG.whatsappPhone}`);
  safeSetText('footerPhone', CONFIG.displayPhone);
  safeSetHref('footerPhone', `tel:+${CONFIG.whatsappPhone}`);
}

// ============================================================================
// 6. ДИНАМИЧЕСКИЙ РЕНДЕРИНГ КАТАЛОГА (DYNAMIC CATALOG)
// ============================================================================
function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const filtered = activeFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  grid.innerHTML = filtered.map(product => {
    const inCartItems = cart.filter(item => item.productId === product.id);
    const totalCountInCart = inCartItems.reduce((sum, item) => sum + item.count, 0);

    const hasCustomization = (product.sizes && product.sizes.length > 0) || (product.modifiers && product.modifiers.length > 0);

    return `
      <article class="product-card" data-category="${product.category}" data-id="${product.id}">
        <div class="product-card__media" onclick="openProductCustomizer('${product.id}')" style="cursor: pointer;">
          <img src="${product.img}" alt="${product.title}" loading="lazy" class="product-card__img">
          ${product.badge ? `<span class="product-tag product-tag--${product.badge.type}">${product.badge.text}</span>` : ''}
        </div>
        
        <div class="product-card__content">
          ${product.tags && product.tags.length > 0 ? `
            <div class="product-card__tags">
              ${product.tags.map(tag => `<span class="card-micro-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}

          <div class="product-card__meta">
            <h3 class="product-card__title" onclick="openProductCustomizer('${product.id}')" style="cursor: pointer;">
              ${product.title}
            </h3>
            <span class="product-card__weight">${product.weight}</span>
          </div>

          <p class="product-card__desc">${product.desc}</p>

          <div class="product-card__footer">
            <div class="product-card__price">${product.basePrice} ₽</div>
            <div class="product-card__action" data-item-id="${product.id}">
              ${totalCountInCart > 0 && !hasCustomization ? `
                <div class="card-qty-control">
                  <button type="button" class="card-qty-btn" onclick="updateItemCount('${inCartItems[0].cartId}', -1)" aria-label="Уменьшить">−</button>
                  <span class="card-qty-value">${totalCountInCart}</span>
                  <button type="button" class="card-qty-btn" onclick="updateItemCount('${inCartItems[0].cartId}', 1)" aria-label="Увеличить">+</button>
                </div>
              ` : `
                <button type="button" class="btn-add-to-cart" onclick="handleCardButtonClick('${product.id}')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-plus-icon">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>${hasCustomization ? 'Настроить' : (totalCountInCart > 0 ? `В заказе (${totalCountInCart})` : 'В заказ')}</span>
                </button>
              `}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function handleCardButtonClick(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const hasOptions = (product.sizes && product.sizes.length > 0) || (product.modifiers && product.modifiers.length > 0);

  if (hasOptions) {
    openProductCustomizer(productId);
  } else {
    addCustomizedItemToCart(product, null, []);
  }
}

// ============================================================================
// 7. МОДАЛЬНОЕ ОКНО КАСТОМИЗАЦИИ (PRODUCT CUSTOMIZER MODAL)
// ============================================================================
function initProductModal() {
  const backdrop = document.getElementById('productModalBackdrop');
  const closeBtn = document.getElementById('closeProductModalBtn');
  const addBtn = document.getElementById('modalAddToCartBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeProductModal();
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!modalState.product) return;

      const selectedSize = modalState.product.sizes && modalState.product.sizes.length > 0 
        ? modalState.product.sizes[modalState.selectedSizeIndex] 
        : null;

      const selectedMods = Array.from(modalState.selectedModifiers).map(modId => {
        return modalState.product.modifiers.find(m => m.id === modId);
      }).filter(Boolean);

      addCustomizedItemToCart(modalState.product, selectedSize, selectedMods);
      closeProductModal();
    });
  }
}

function openProductCustomizer(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  modalState.product = product;
  modalState.selectedSizeIndex = 0;
  modalState.selectedModifiers.clear();

  const title = document.getElementById('modalProductTitle');
  const img = document.getElementById('modalProductImg');
  const desc = document.getElementById('modalProductDesc');
  const tagsWrap = document.getElementById('modalProductTags');
  const badge = document.getElementById('modalProductBadge');

  if (title) title.textContent = product.title;
  if (img) {
    img.src = product.img;
    img.alt = product.title;
  }
  if (desc) desc.textContent = product.desc;

  if (badge) {
    if (product.badge) {
      badge.textContent = product.badge.text;
      badge.className = `product-tag product-tag--${product.badge.type}`;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  if (tagsWrap) {
    if (product.tags && product.tags.length > 0) {
      tagsWrap.innerHTML = product.tags.map(t => `<span class="card-micro-tag">${t}</span>`).join('');
    } else {
      tagsWrap.innerHTML = '';
    }
  }

  // Отрисовка размеров
  const sizesGroup = document.getElementById('modalSizesGroup');
  const sizesList = document.getElementById('modalSizesList');
  if (sizesGroup && sizesList) {
    if (product.sizes && product.sizes.length > 0) {
      sizesGroup.style.display = 'flex';
      sizesList.innerHTML = product.sizes.map((size, idx) => `
        <label class="option-pill ${idx === 0 ? 'active' : ''}" data-size-idx="${idx}">
          <input type="radio" name="modalSize" value="${idx}" ${idx === 0 ? 'checked' : ''}>
          <span class="pill-title">${size.name}</span>
          ${size.priceDelta > 0 ? `<span class="pill-extra">+${size.priceDelta} ₽</span>` : ''}
        </label>
      `).join('');

      sizesList.querySelectorAll('.option-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          sizesList.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          modalState.selectedSizeIndex = parseInt(pill.getAttribute('data-size-idx'), 10);
          updateModalPrice();
        });
      });
    } else {
      sizesGroup.style.display = 'none';
    }
  }

  // Отрисовка модификаторов
  const modsGroup = document.getElementById('modalModifiersGroup');
  const modsList = document.getElementById('modalModifiersList');
  if (modsGroup && modsList) {
    if (product.modifiers && product.modifiers.length > 0) {
      modsGroup.style.display = 'flex';
      modsList.innerHTML = product.modifiers.map(mod => `
        <div class="modifier-item" data-mod-id="${mod.id}">
          <div class="modifier-left">
            <div class="modifier-checkbox">✓</div>
            <span class="modifier-name">${mod.name}</span>
          </div>
          <span class="modifier-price">${mod.price > 0 ? `+${mod.price} ₽` : 'Бесплатно'}</span>
        </div>
      `).join('');

      modsList.querySelectorAll('.modifier-item').forEach(item => {
        item.addEventListener('click', () => {
          const modId = item.getAttribute('data-mod-id');
          if (modalState.selectedModifiers.has(modId)) {
            modalState.selectedModifiers.delete(modId);
            item.classList.remove('active');
          } else {
            modalState.selectedModifiers.add(modId);
            item.classList.add('active');
          }
          updateModalPrice();
        });
      });
    } else {
      modsGroup.style.display = 'none';
    }
  }

  updateModalPrice();

  const backdrop = document.getElementById('productModalBackdrop');
  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function updateModalPrice() {
  if (!modalState.product) return;

  let total = modalState.product.basePrice;

  if (modalState.product.sizes && modalState.product.sizes[modalState.selectedSizeIndex]) {
    total += (modalState.product.sizes[modalState.selectedSizeIndex].priceDelta || 0);
  }

  modalState.selectedModifiers.forEach(modId => {
    const mod = modalState.product.modifiers.find(m => m.id === modId);
    if (mod) total += mod.price;
  });

  const priceEl = document.getElementById('modalTotalPrice');
  if (priceEl) priceEl.textContent = `${total} ₽`;
}

function closeProductModal() {
  const backdrop = document.getElementById('productModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    const cartBackdrop = document.getElementById('cartBackdrop');
    if (!cartBackdrop || !cartBackdrop.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
}

// ============================================================================
// 8. ОПЕРАЦИИ С КОРЗИНОЙ (CART STATE & LOGIC)
// ============================================================================
function addCustomizedItemToCart(product, sizeObj, modifiersArr) {
  let unitPrice = product.basePrice;
  if (sizeObj && sizeObj.priceDelta) unitPrice += sizeObj.priceDelta;
  modifiersArr.forEach(m => { unitPrice += m.price; });

  const modIdsKey = modifiersArr.map(m => m.id).sort().join('_');
  const sizeKey = sizeObj ? sizeObj.name : 'default';
  const cartId = `${product.id}_${sizeKey}_${modIdsKey}`;

  const existing = cart.find(item => item.cartId === cartId);

  if (existing) {
    existing.count += 1;
  } else {
    cart.push({
      cartId,
      productId: product.id,
      title: product.title,
      sizeName: sizeObj ? sizeObj.name : product.weight,
      modifiers: modifiersArr.map(m => ({ id: m.id, name: m.name, price: m.price })),
      unitPrice,
      img: product.img,
      count: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  renderCatalog();
  showToast(`«${product.title}» добавлен в корзину`);
}

function updateItemCount(cartId, delta) {
  const idx = cart.findIndex(item => item.cartId === cartId);
  if (idx === -1) return;

  cart[idx].count += delta;

  if (cart[idx].count <= 0) {
    const title = cart[idx].title;
    cart.splice(idx, 1);
    showToast(`«${title}» удалён из заказа`);
  }

  saveCartToStorage();
  updateCartUI();
  renderCatalog();
}

function getCartCalculations() {
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.count), 0);

  let discount = 0;
  if (orderType === 'pickup' && subtotal > 0) {
    discount = Math.round(subtotal * (CONFIG.pickupDiscountPercent / 100));
  }

  let deliveryCost = 0;
  if (orderType === 'delivery' && subtotal > 0) {
    deliveryCost = subtotal >= CONFIG.freeDeliveryThreshold ? 0 : CONFIG.deliveryPrice;
  }

  const finalTotal = Math.max(0, subtotal - discount + deliveryCost);

  return { totalCount, subtotal, discount, deliveryCost, finalTotal };
}

function updateCartUI() {
  const { totalCount, subtotal, discount, deliveryCost, finalTotal } = getCartCalculations();

  // 1. Шапка
  const headerCount = document.getElementById('headerCartCount');
  const headerTotal = document.getElementById('headerCartTotal');
  if (headerCount) headerCount.textContent = totalCount;
  if (headerTotal) headerTotal.textContent = `${subtotal} ₽`;

  // 2. Мобильный нижний бар
  const mobileBadge = document.getElementById('mobileCartBadge');
  const mobileSum = document.getElementById('mobileCartSum');
  if (mobileBadge) mobileBadge.textContent = totalCount;
  if (mobileSum) mobileSum.textContent = `${finalTotal} ₽`;

  // 3. Бейдж в дровере
  const drawerBadge = document.getElementById('cartItemsBadge');
  if (drawerBadge) drawerBadge.textContent = `${totalCount} поз.`;

  // 4. Прогресс-бар бесплатной доставки
  const freeNotice = document.getElementById('freeDeliveryNotice');
  const freeBar = document.getElementById('freeDeliveryBar');
  if (freeNotice && freeBar) {
    if (orderType === 'pickup') {
      freeNotice.innerHTML = `🛍️ Выбран самовывоз: <strong>скидка ${CONFIG.pickupDiscountPercent}%</strong> на все блюда`;
      freeBar.style.width = '100%';
    } else if (subtotal === 0) {
      freeNotice.innerHTML = `Бесплатная доставка от <strong>${CONFIG.freeDeliveryThreshold} ₽</strong>`;
      freeBar.style.width = '0%';
    } else if (subtotal >= CONFIG.freeDeliveryThreshold) {
      freeNotice.innerHTML = `🎉 <strong>Бесплатная доставка активирована!</strong> + ${CONFIG.welcomeGiftText} в подарок`;
      freeBar.style.width = '100%';
    } else {
      const needed = CONFIG.freeDeliveryThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / CONFIG.freeDeliveryThreshold) * 100));
      freeNotice.innerHTML = `До бесплатной доставки осталось <strong>${needed} ₽</strong>`;
      freeBar.style.width = `${pct}%`;
    }
  }

  // 5. Список позиций в корзине
  const container = document.getElementById('cartItemsContainer');
  if (container) {
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🛒</div>
          <h3>В корзине пока пусто</h3>
          <p>Выберите любимые блюда из каталога, чтобы сделать заказ напрямую без наценок</p>
          <button type="button" class="btn btn--primary" id="emptyCartCatalogBtn">Перейти к меню</button>
        </div>
      `;
      const btn = document.getElementById('emptyCartCatalogBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          closeCart();
          const cat = document.getElementById('catalog');
          if (cat) cat.scrollIntoView({ behavior: 'smooth' });
        });
      }
    } else {
      container.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-cart-id="${item.cartId}">
          <img src="${item.img}" alt="${item.title}" class="cart-item-img" loading="lazy">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-sub">
              ${item.sizeName ? `<span>${item.sizeName}</span>` : ''}
              ${item.modifiers && item.modifiers.length > 0 
                ? `<div style="color: var(--c-accent-amber); font-size: 0.7188rem; margin-top: 2px;">+ ${item.modifiers.map(m => m.name).join(', ')}</div>` 
                : ''}
            </div>
            <div class="cart-item-price">${item.unitPrice * item.count} ₽</div>
          </div>
          <div class="cart-item-actions">
            <button type="button" class="cart-count-btn" onclick="updateItemCount('${item.cartId}', -1)" aria-label="Уменьшить">−</button>
            <span class="cart-item-qty">${item.count}</span>
            <button type="button" class="cart-count-btn" onclick="updateItemCount('${item.cartId}', 1)" aria-label="Увеличить">+</button>
          </div>
        </div>
      `).join('');
    }
  }

  // 6. Суммы
  const subtotalEl = document.getElementById('summarySubtotal');
  const discountLine = document.getElementById('discountLine');
  const discountEl = document.getElementById('summaryDiscount');
  const deliveryCostEl = document.getElementById('summaryDeliveryCost');
  const totalEl = document.getElementById('summaryTotal');

  if (subtotalEl) subtotalEl.textContent = `${subtotal} ₽`;

  if (discountLine && discountEl) {
    if (discount > 0) {
      discountLine.style.display = 'flex';
      discountEl.textContent = `-${discount} ₽`;
    } else {
      discountLine.style.display = 'none';
    }
  }

  if (deliveryCostEl) {
    if (orderType === 'pickup') {
      deliveryCostEl.textContent = 'Самовывоз (0 ₽)';
    } else if (subtotal === 0) {
      deliveryCostEl.textContent = `${CONFIG.deliveryPrice} ₽`;
    } else if (deliveryCost === 0) {
      deliveryCostEl.textContent = 'Бесплатно';
    } else {
      deliveryCostEl.textContent = `${deliveryCost} ₽`;
    }
  }

  if (totalEl) totalEl.textContent = `${finalTotal} ₽`;
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('lokal_kitchen_cart_v2');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('lokal_kitchen_cart_v2', JSON.stringify(cart));
  } catch (e) {
    console.error('Ошибка сохранения корзины', e);
  }
}

// ============================================================================
// 9. АВТОЗАПОЛНЕНИЕ ПРОФИЛЯ КЛИЕНТА (CUSTOMER PROFILE)
// ============================================================================
function loadCustomerProfile() {
  try {
    const saved = localStorage.getItem('lokal_customer_profile');
    if (!saved) return;

    const profile = JSON.parse(saved);
    if (!profile) return;

    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const addressInput = document.getElementById('clientAddress');
    const autofillNotice = document.getElementById('clientAutofillNotice');

    if (nameInput && profile.name) nameInput.value = profile.name;
    if (phoneInput && profile.phone) phoneInput.value = profile.phone;
    if (addressInput && profile.address) addressInput.value = profile.address;

    if (profile.name || profile.phone) {
      if (autofillNotice) autofillNotice.style.display = 'flex';
    }

    const clearBtn = document.getElementById('clearProfileBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        localStorage.removeItem('lokal_customer_profile');
        if (nameInput) nameInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (addressInput) addressInput.value = '';
        if (autofillNotice) autofillNotice.style.display = 'none';
        showToast('Сохранённые данные очищены');
      });
    }
  } catch (e) {
    console.error('Ошибка профиля клиента', e);
  }
}

function saveCustomerProfile(name, phone, address) {
  try {
    const profile = { name, phone, address, lastOrderAt: new Date().toISOString() };
    localStorage.setItem('lokal_customer_profile', JSON.stringify(profile));
  } catch (e) {
    console.error('Ошибка сохранения профиля', e);
  }
}

// ============================================================================
// 10. ВЫБОР СПОСОБА ОПЛАТЫ И САМОВЫВОЗА
// ============================================================================
function initOrderTypeSwitch() {
  const delOption = document.getElementById('deliveryTypeDelivery');
  const pickOption = document.getElementById('deliveryTypePickup');
  const addressRow = document.getElementById('addressRow');

  if (!delOption || !pickOption) return;

  delOption.addEventListener('click', () => {
    orderType = 'delivery';
    delOption.classList.add('active');
    pickOption.classList.remove('active');
    if (addressRow) addressRow.style.display = 'flex';
    updateCartUI();
  });

  pickOption.addEventListener('click', () => {
    orderType = 'pickup';
    pickOption.classList.add('active');
    delOption.classList.remove('active');
    if (addressRow) addressRow.style.display = 'none';
    updateCartUI();
  });
}

function initPaymentMethodSwitch() {
  const cardOpt = document.getElementById('payMethodCard');
  const sbpOpt = document.getElementById('payMethodSbp');
  const cashOpt = document.getElementById('payMethodCash');
  const cashChangeRow = document.getElementById('cashChangeRow');

  const options = [
    { el: cardOpt, method: 'card' },
    { el: sbpOpt, method: 'sbp' },
    { el: cashOpt, method: 'cash' }
  ];

  options.forEach(item => {
    if (!item.el) return;
    item.el.addEventListener('click', () => {
      options.forEach(o => o.el && o.el.classList.remove('active'));
      item.el.classList.add('active');
      paymentMethod = item.method;

      if (cashChangeRow) {
        cashChangeRow.style.display = (paymentMethod === 'cash') ? 'block' : 'none';
      }
    });
  });
}

// ============================================================================
// 11. ФИЛЬТРАЦИЯ КАТАЛОГА ПО ТАБАМ
// ============================================================================
function initCatalogTabs() {
  const tabs = document.querySelectorAll('.catalog-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeFilter = tab.getAttribute('data-filter') || 'all';
      renderCatalog();
    });
  });
}

// ============================================================================
// 12. ОТКРЫТИЕ И ЗАКРЫТИЕ КОРЗИНЫ
// ============================================================================
function initCartDrawer() {
  const backdrop = document.getElementById('cartBackdrop');
  const openHeaderBtn = document.getElementById('openCartBtn');
  const openMobileBtn = document.getElementById('mobileCartTrigger');
  const closeBtn = document.getElementById('closeCartBtn');

  if (openHeaderBtn) openHeaderBtn.addEventListener('click', openCart);
  if (openMobileBtn) openMobileBtn.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCart();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeProductModal();
    }
  });
}

function openCart() {
  const backdrop = document.getElementById('cartBackdrop');
  if (backdrop) {
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const backdrop = document.getElementById('cartBackdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ============================================================================
// 13. ОТПРАВКА ЗАКАЗА В MESSENGER (TELEGRAM & WHATSAPP)
// ============================================================================
function initCheckoutActions() {
  const tgBtn = document.getElementById('sendToTelegramBtn');
  const waBtn = document.getElementById('sendToWhatsappBtn');

  if (tgBtn) tgBtn.addEventListener('click', () => processCheckout('telegram'));
  if (waBtn) waBtn.addEventListener('click', () => processCheckout('whatsapp'));
}

function processCheckout(targetMessenger) {
  if (cart.length === 0) {
    showToast('⚠️ Ваша корзина пуста! Добавьте блюда');
    return;
  }

  const nameInput = document.getElementById('clientName');
  const phoneInput = document.getElementById('clientPhone');
  const addressInput = document.getElementById('clientAddress');
  const commentInput = document.getElementById('clientComment');
  const cashChangeInput = document.getElementById('cashChangeAmount');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const address = addressInput ? addressInput.value.trim() : '';
  const comment = commentInput ? commentInput.value.trim() : '';
  const cashChange = cashChangeInput ? cashChangeInput.value.trim() : '';

  if (!name) {
    showToast('Пожалуйста, укажите ваше имя');
    if (nameInput) nameInput.focus();
    return;
  }

  if (!phone) {
    showToast('Пожалуйста, укажите номер телефона');
    if (phoneInput) phoneInput.focus();
    return;
  }

  if (orderType === 'delivery' && !address) {
    showToast('Пожалуйста, введите адрес доставки');
    if (addressInput) addressInput.focus();
    return;
  }

  saveCustomerProfile(name, phone, address);

  const { subtotal, discount, deliveryCost, finalTotal } = getCartCalculations();

  let paymentText = '💳 Картой курьеру при получении';
  if (paymentMethod === 'sbp') {
    paymentText = '📲 СБП (перевод по номеру / QR-код)';
  } else if (paymentMethod === 'cash') {
    paymentText = cashChange 
      ? `💵 Наличными (сдача с ${cashChange})` 
      : '💵 Наличными без сдачи';
  }

  const itemsText = cart.map((item, index) => {
    let line = `${index + 1}. ${item.title}`;
    if (item.sizeName) line += ` [${item.sizeName}]`;
    if (item.modifiers && item.modifiers.length > 0) {
      line += `\n   + ${item.modifiers.map(m => m.name).join(', ')}`;
    }
    line += `\n   ↳ ${item.count} шт. × ${item.unitPrice} ₽ = ${item.unitPrice * item.count} ₽`;
    return line;
  }).join('\n\n');

  let message = `🔥 НОВЫЙ ЗАКАЗ (${CONFIG.restaurantName})\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 Клиент: ${name}\n`;
  message += `📞 Телефон: ${phone}\n`;
  message += `📦 Получение: ${orderType === 'delivery' ? '🚚 Доставка курьером' : `🛍️ Самовывоз (-${CONFIG.pickupDiscountPercent}%)`}\n`;

  if (orderType === 'delivery') {
    message += `📍 Адрес доставки: ${address}\n`;
  } else {
    message += `📍 Самовывоз: ${CONFIG.pickupAddress}\n`;
  }

  message += `💳 Оплата: ${paymentText}\n`;

  if (comment) {
    message += `💬 Комментарий: ${comment}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 СОСТАВ ЗАКАЗА:\n\n${itemsText}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💵 Сумма блюд: ${subtotal} ₽\n`;

  if (discount > 0) {
    message += `🏷️ Скидка за самовывоз (${CONFIG.pickupDiscountPercent}%): -${discount} ₽\n`;
  }

  if (orderType === 'delivery') {
    message += `🚚 Доставка: ${deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}\n`;
  }

  if (subtotal >= CONFIG.freeDeliveryThreshold) {
    message += `🎁 Подарок к заказу: ${CONFIG.welcomeGiftText}!\n`;
  }

  message += `⭐ ИТОГО К ОПЛАТЕ: ${finalTotal} ₽\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `(Прямой заказ с сайта без комиссий агрегаторов)`;

  if (targetMessenger === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${CONFIG.whatsappPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  } else if (targetMessenger === 'telegram') {
    copyTextToClipboard(message);
    showToast('Чек скопирован в буфер! Открываем Telegram...');
    window.open(`https://t.me/${CONFIG.telegramUsername}`, '_blank', 'noopener,noreferrer');
  }

  setTimeout(() => {
    cart = [];
    saveCartToStorage();
    updateCartUI();
    renderCatalog();
    closeCart();
  }, 1000);
}

// ============================================================================
// 14. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (COPY, TOAST)
// ============================================================================
function initAddressCopy() {
  const btn = document.getElementById('copyAddressBtn');
  const addressEl = document.getElementById('pickupAddressText');
  if (!btn || !addressEl) return;

  btn.addEventListener('click', () => {
    copyTextToClipboard(CONFIG.pickupAddress);
    showToast('Адрес кухни скопирован в буфер обмена!');
  });
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }
}

function showToast(message) {
  const toast = document.getElementById('toastAlert');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
