export interface Product {
  id: string;
  name: { uz: string; en: string; ru: string };
  tagline: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
  category: { uz: string; en: string; ru: string };
  price: string;
  image: string;
  juiciness: string;
  bakeTime: string;
  spiciness: number;
  flakiness: number;
  savory: number;
  ingredients: { uz: string[]; en: string[]; ru: string[] };
}

export interface TimelineEvent {
  year: string;
  title: { uz: string; en: string; ru: string };
  subtitle: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
  image: string;
}

export const HERO_PRODUCTS: Product[] = [
  {
    id: 'domoti-somsa',
    name: {
      uz: 'Domoti Somsa',
      en: 'Domoti Somsa',
      ru: 'Самса Домоти'
    },
    tagline: {
      uz: 'Qarsildoq xamir, sersuv dumba yog‘i va mol go‘shti.',
      en: 'Crispy pastry, juicy beef chunk, and traditional spices.',
      ru: 'Хрустящее тесто, сочная говядина и традиционные специи.'
    },
    description: {
      uz: 'Tandirda pishirilgan, qarsildoq xamir, sersuv dumba yog‘i va maxsus kesilgan mayin mol go‘shti uyg‘unligi.',
      en: 'Baked in our custom clay tandir, this somsa features crispy pastry sheets, juicy beef chunks, and authentic spices.',
      ru: 'Запеченная в тандыре, эта самса сочетает хрустящее тесто, сочную говядину и ароматный курдючный жир.'
    },
    category: { uz: 'Tandir', en: 'Tandir', ru: 'Тандыр' },
    price: '15,000 UZS',
    image: '/1.png',
    juiciness: '88%',
    bakeTime: '25 Mins',
    spiciness: 3,
    flakiness: 4,
    savory: 5,
    ingredients: {
      uz: ['Halol Mol Go‘shti', 'Dumba Yog‘i', 'Piyoz', 'Kunjut'],
      en: ['Halal Beef', 'Tail Fat', 'Onions', 'Sesame Seeds'],
      ru: ['Халяль Говядина', 'Курдюк', 'Лук', 'Кунжут']
    }
  },
  {
    id: 'pesochni-beef',
    name: {
      uz: 'Pesochni Somsa (Mol go‘shti)',
      en: 'Beef Shortcrust Somsa',
      ru: 'Песочная Самса (Говядина)'
    },
    tagline: {
      uz: 'Og‘izda eriydigan pesochniy xamir va mayin go‘sht.',
      en: 'Melt-in-your-mouth shortcrust pastry with tender beef.',
      ru: 'Тающее во рту песочное тесто с нежной говядиной.'
    },
    description: {
      uz: 'Tandirda sarg‘ayib pishgan, og‘izda eriydigan pesochniy xamir va mayin mol go‘shti to‘ldirmasi.',
      en: 'Delightfully golden shortcrust pastry that crumbles perfectly, filled with savory hand-minced beef.',
      ru: 'Золотистое песочное тесто, которое приятно тает во рту, с начинкой из нежной рубленой говядины.'
    },
    category: { uz: 'Pesochni', en: 'Shortcrust', ru: 'Песочное' },
    price: '16,000 UZS',
    image: '/2.png',
    juiciness: '75%',
    bakeTime: '20 Mins',
    spiciness: 2,
    flakiness: 5,
    savory: 4,
    ingredients: {
      uz: ['Mol Go‘shti', 'Sariyog‘', 'Piyoz', 'Tuxum sarig‘i'],
      en: ['Beef', 'Butter', 'Onions', 'Egg Yolk'],
      ru: ['Говядина', 'Сливочное масло', 'Лук', 'Желток']
    }
  },
  {
    id: 'tomchi-somsa',
    name: {
      uz: 'Tomchi Somsa (Qovoq)',
      en: 'Tomchi Pumpkin Somsa',
      ru: 'Самса Томчи (Тыква)'
    },
    tagline: {
      uz: 'Tandirda pishirilgan shirin qovoqli somsa.',
      en: 'Delicious and sweet pumpkin baked in traditional tandir.',
      ru: 'Сладкая тыква с приправами, запеченная в тандыре.'
    },
    description: {
      uz: 'Tabiiy shirin qovoq, piyoz va murch bilan to‘ldirilib, loy tandir devorida pishirilgan an‘anaviy tansiq taom.',
      en: 'Sweet local pumpkin, onions, and mild black pepper baked against the clay walls of our hot tandir.',
      ru: 'Сладкая местная тыква, лук и черный перец, запеченные на глиняных стенах нашего горячего тандыра.'
    },
    category: { uz: 'Tandir', en: 'Tandir', ru: 'Тандыр' },
    price: '10,000 UZS',
    image: '/3.png',
    juiciness: '92%',
    bakeTime: '25 Mins',
    spiciness: 1,
    flakiness: 4,
    savory: 3,
    ingredients: {
      uz: ['Shirin Qovoq', 'Dumba Yog‘i', 'Piyoz', 'Murch'],
      en: ['Sweet Pumpkin', 'Tail Fat', 'Onions', 'Black Pepper'],
      ru: ['Сладкая тыква', 'Курдюк', 'Лук', 'Черный перец']
    }
  },
  {
    id: 'qiyma-somsa',
    name: {
      uz: 'Qiyma Somsa',
      en: 'Minced Beef Somsa',
      ru: 'Самса с фаршем'
    },
    tagline: {
      uz: 'Kattalashtirilgan maxsus qiyma tandir somsa.',
      en: 'Super-sized special minced beef tandir somsa.',
      ru: 'Увеличенная тандырная самса с сочным фаршем.'
    },
    description: {
      uz: 'Yirik va to‘yimli, mayda qiyma va piyoz to‘ldirmasi bilan loy tandirda an‘anaviy pishirilgan shohona taom.',
      en: 'Hearty and extra-large, filled with perfectly spiced minced beef and onions, baked in our heritage clay oven.',
      ru: 'Большая и сытная самса с сочным мясным фаршем и луком, запеченная по старинному рецепту в глиняной печи.'
    },
    category: { uz: 'Tandir', en: 'Tandir', ru: 'Тандыр' },
    price: '18,000 UZS',
    image: '/4.png',
    juiciness: '85%',
    bakeTime: '25 Mins',
    spiciness: 4,
    flakiness: 4,
    savory: 5,
    ingredients: {
      uz: ['Yumshoq Qiyma', 'Dumba Yog‘i', 'Piyoz', 'Zira'],
      en: ['Minced Beef', 'Tail Fat', 'Onions', 'Cumin'],
      ru: ['Мясной фарш', 'Курдюк', 'Лук', 'Зира']
    }
  },
  {
    id: 'pora-somsa',
    name: {
      uz: 'Pora Somsa',
      en: 'Pora Greens Somsa',
      ru: 'Самса Пора (Зелень)'
    },
    tagline: {
      uz: 'Bahoriy ko‘katlar va barra piyoz bilan tayyorlangan somsa.',
      en: 'Spring greens and fresh dough baked to perfection.',
      ru: 'Весенняя зелень и сочные травы, запеченные в тесте.'
    },
    description: {
      uz: 'Yangi yig‘ilgan bahoriy ko‘katlar, barra piyoz va dumba yog‘i bo‘lakchalari bilan to‘ldirilgan xushbo‘y somsa.',
      en: 'A fresh, aromatic somsa stuffed with handpicked spring greens, green onions, and savory butter pools.',
      ru: 'Свежая ароматная самса, наполненная весенней зеленью, зеленым луком и сливочным маслом.'
    },
    category: { uz: 'Tandir', en: 'Tandir', ru: 'Тандыр' },
    price: '12,000 UZS',
    image: '/5.png',
    juiciness: '80%',
    bakeTime: '22 Mins',
    spiciness: 2,
    flakiness: 4,
    savory: 4,
    ingredients: {
      uz: ['Barra Ko‘katlar', 'Barra Piyoz', 'Sariyog‘', 'Murch'],
      en: ['Spring Greens', 'Green Onions', 'Butter', 'Black Pepper'],
      ru: ['Весенняя зелень', 'Зеленый лук', 'Сливочное масло', 'Перец']
    }
  },
  {
    id: 'pesochni-chicken',
    name: {
      uz: 'Pesochni Somsa (Tovuq)',
      en: 'Chicken Shortcrust Somsa',
      ru: 'Песочная Самса (Курица)'
    },
    tagline: {
      uz: 'Og‘izda eriydigan pesochniy xamir va barra tovuq go‘shti.',
      en: 'Melt-in-your-mouth shortcrust pastry with tender chicken.',
      ru: 'Тающее во рту песочное тесто с нежным куриным мясом.'
    },
    description: {
      uz: 'Mayin parhezbop tovuq go‘shti va sariyog‘li pesochniy xamirning og‘izda erib ketuvchi uyg‘unligi.',
      en: 'Light and tender chicken breast with onions, encased in our signature melt-in-your-mouth shortcrust pastry.',
      ru: 'Нежное диетическое куриное филе с луком в фирменном рассыпчатом песочном тесте.'
    },
    category: { uz: 'Pesochni', en: 'Shortcrust', ru: 'Песочное' },
    price: '14,000 UZS',
    image: '/6.png',
    juiciness: '72%',
    bakeTime: '20 Mins',
    spiciness: 2,
    flakiness: 5,
    savory: 4,
    ingredients: {
      uz: ['Tovuq Go‘shti', 'Sariyog‘', 'Piyoz', 'Ziravorlar'],
      en: ['Chicken Breast', 'Butter', 'Onions', 'Spices'],
      ru: ['Куриное филе', 'Сливочное масло', 'Лук', 'Специи']
    }
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1998',
    title: {
      uz: 'Tandir o‘chog‘ining qurilishi',
      en: 'First Hearth Spark',
      ru: 'Первая искра тандыра'
    },
    subtitle: {
      uz: 'Loy o‘choqdan boshlangan ilk qadam',
      en: 'Clay and wood-fired beginning',
      ru: 'Начало из глины и дров'
    },
    description: {
      uz: 'Oilamizning birinchi an‘anaviy loy tandir o‘chog‘i qurildi. Qarsildoq va sersuv go‘shtli somsalarimizning ilk retsepti shu yili yaratilgan.',
      en: 'Our family built the very first traditional clay tandir oven, baking the original recipe somsa that would become our signature.',
      ru: 'Наша семья построила первый традиционный глиняный тандыр, испекая самсу по оригинальному рецепту, ставшему нашей визитной карточкой.'
    },
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600'
  },
  {
    year: '2008',
    title: {
      uz: 'Xamir qatlamlari mukammalligi',
      en: 'Perfecting the Layers',
      ru: 'Совершенство слоев'
    },
    subtitle: {
      uz: 'Qarsildoq qobiq sirlari',
      en: 'Secrets of the golden crunch',
      ru: 'Секреты золотистого хруста'
    },
    description: {
      uz: 'Novvoylarimiz ko‘p yillik izlanishlardan so‘ng somsa xamirini ko‘p qavatli qilib yoyish sirlarini mukammallashtirishdi.',
      en: 'After years of trial, our master bakers perfected the multi-layered hand-rolling technique for the ultimate crispy puff pastry.',
      ru: 'После многих лет практики наши мастера усовершенствовали технику ручной раскатки многослойного слоеного теста.'
    },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600'
  },
  {
    year: '2018',
    title: {
      uz: 'Toshkentda birinchi filial',
      en: 'Tashkent Central Branch',
      ru: 'Первый филиал в Ташкенте'
    },
    subtitle: {
      uz: 'Poytaxtda tandir atri',
      en: 'Clay baking in the capital',
      ru: 'Глиняная выпечка в столице'
    },
    description: {
      uz: 'Biz Toshkent shahrida o‘zimizning ilk markaziy novvoyxonamizni ochdik, poytaxt ahliga tandirdan uzilgan issiq somsalarni taqdim eta boshladik.',
      en: 'We opened our first central bakery in Tashkent, bringing the warm aroma of fresh clay-baked somsa directly to the city residents.',
      ru: 'Мы открыли нашу первую центральную пекарню в Ташкенте, доставляя горячую самсу прямо из тандыра столичным жителям.'
    },
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=600'
  },
  {
    year: 'Bugun',
    title: {
      uz: 'An‘analar kelajagi',
      en: 'Future of Our Heritage',
      ru: 'Будущее нашего наследия'
    },
    subtitle: {
      uz: 'Kuniga 5000+ baxtli mijoz',
      en: '5,000+ hot somsas daily',
      ru: 'Более 5000 горячих самс ежедневно'
    },
    description: {
      uz: 'Bugungi kunda biz 100% tabiiy va halol masalliqlar yordamida kuniga minglab mijozlarga eng lazzatli tandir va pesochni somsalarni taqdim etmoqdamiz.',
      en: 'Today, we serve thousands of customers daily using 100% natural, halal ingredients, keeping our rich culinary legacy alive and fresh.',
      ru: 'Сегодня мы обслуживаем тысячи клиентов ежедневно, используя 100% натуральные халяльные ингредиенты, сохраняя кулинарные традиции.'
    },
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600'
  }
];

export const GALLERY_PHOTOS = [
  'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600'
];
