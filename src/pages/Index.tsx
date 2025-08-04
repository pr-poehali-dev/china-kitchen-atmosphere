import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import CartSidebar from '@/components/CartSidebar';
import ImageGallery from '@/components/ImageGallery';
import FloatingParticles from '@/components/FloatingParticles';
import AnimatedDragon from '@/components/AnimatedDragon';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const menuItems = [
    { name: 'Утка по-пекински', price: '2890₽', description: 'Традиционное блюдо с хрустящей корочкой', image: '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg', category: 'Основные блюда' },
    { name: 'Дим Сам', price: '890₽', description: 'Паровые пельмени с различными начинками', image: '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg', category: 'Закуски' },
    { name: 'Жареная лапша', price: '1290₽', description: 'Классическая лапша вок с овощами', image: '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg', category: 'Лапша' },
    { name: 'Кисло-сладкая свинина', price: '1590₽', description: 'Нежная свинина в фирменном соусе', image: '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg', category: 'Основные блюда' },
    { name: 'Чай Пуэр', price: '590₽', description: 'Выдержанный китайский чай', image: '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg', category: 'Напитки' },
    { name: 'Жареный рис', price: '990₽', description: 'Ароматный рис с яйцом и овощами', image: '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg', category: 'Рис' }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item: any) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.name);
    if (existingItem) {
      updateCartQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, {
        id: item.name,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image
      }]);
    }
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredMenuItems = selectedCategory === 'Все' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const galleryImages = [
    '/img/795b2b07-b5cb-4fd9-8173-57cf4277880f.jpg',
    '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg',
    '/img/67a335d2-f54d-48fb-9229-c4a3ff55345d.jpg',
    '/img/795b2b07-b5cb-4fd9-8173-57cf4277880f.jpg',
    '/img/0c431847-b69b-4038-a808-47714b4e6c17.jpg',
    '/img/67a335d2-f54d-48fb-9229-c4a3ff55345d.jpg'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-chinese-dark to-black text-white relative overflow-x-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-chinese-red/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">☁️</div>
              <h1 className="text-xl font-bold text-chinese-gold">Облака Китая</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'menu', label: 'Меню' },
                { id: 'about', label: 'О ресторане' },
                { id: 'delivery', label: 'Доставка' },
                { id: 'gallery', label: 'Галерея' },
                { id: 'promotions', label: 'Акции' },
                { id: 'booking', label: 'Бронирование' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm hover:text-chinese-gold transition-colors ${
                    activeSection === item.id ? 'text-chinese-gold border-b-2 border-chinese-gold' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button 
              className="bg-chinese-red hover:bg-chinese-red/80 text-white relative"
              onClick={() => setIsCartOpen(true)}
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Корзина
              {getCartItemsCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-chinese-gold text-black text-xs animate-bounce-in">
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-chinese-red/20 to-chinese-gold/20"></div>
        <img 
          src="/img/67a335d2-f54d-48fb-9229-c4a3ff55345d.jpg" 
          alt="Dragon" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 animate-float"
        />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="relative mb-4">
            <div className="text-6xl animate-glow">🐉☁️</div>
            <AnimatedDragon size="small" className="top-0 left-10" />
            <AnimatedDragon size="small" className="top-0 right-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-chinese-red to-chinese-gold bg-clip-text text-transparent">
            Облака Китая
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-chinese-gold max-w-2xl mx-auto">
            Подлинная китайская кухня в сердце города. Окунитесь в мир древних традиций и неповторимых вкусов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-chinese-red hover:bg-chinese-red/80 text-white px-8 py-4 text-lg animate-glow"
              onClick={() => scrollToSection('menu')}
            >
              Посмотреть меню
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-chinese-gold text-chinese-gold hover:bg-chinese-gold hover:text-black px-8 py-4 text-lg"
              onClick={() => scrollToSection('booking')}
            >
              Забронировать столик
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-chinese-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-chinese-gold">Наше меню</h2>
            <p className="text-xl text-gray-300 mb-8">Изысканные блюда китайской кухни</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Все', 'Основные блюда', 'Закуски', 'Лапша', 'Рис', 'Напитки'].map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className={`border-chinese-gold cursor-pointer transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-chinese-gold text-black' 
                      : 'text-chinese-gold hover:bg-chinese-gold hover:text-black'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.map((item, index) => (
              <Card key={index} className="bg-chinese-black/70 border-chinese-red/30 hover:border-chinese-gold/50 transition-all duration-300 hover:scale-105 animate-fade-in">
                <CardHeader className="p-0">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-chinese-gold">{item.name}</CardTitle>
                    <Badge className="bg-chinese-red text-white">{item.category}</Badge>
                  </div>
                  <CardDescription className="text-gray-300 mb-4">{item.description}</CardDescription>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-chinese-gold">{item.price}</span>
                    <Button 
                      className="bg-chinese-red hover:bg-chinese-red/80 text-white transition-transform hover:scale-105"
                      onClick={() => addToCart(item)}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-chinese-dark/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6 text-chinese-gold">О ресторане</h2>
              <p className="text-lg text-gray-300 mb-6">
                Ресторан "Облака Китая" – это место, где встречаются древние традиции китайской кулинарии 
                и современный комфорт. Наши повара имеют многолетний опыт работы в лучших ресторанах Китая.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Мы используем только свежие продукты высочайшего качества и аутентичные рецепты, 
                передаваемые из поколения в поколение. Каждое блюдо готовится с душой и любовью к китайской культуре.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-chinese-red">15+</div>
                  <div className="text-sm text-gray-400">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chinese-red">100+</div>
                  <div className="text-sm text-gray-400">Блюд в меню</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chinese-red">5000+</div>
                  <div className="text-sm text-gray-400">Довольных гостей</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/795b2b07-b5cb-4fd9-8173-57cf4277880f.jpg" 
                alt="Restaurant Interior" 
                className="rounded-lg shadow-2xl animate-float"
              />
              <div className="absolute -top-4 -right-4 text-6xl animate-float">🏮</div>
              <AnimatedDragon size="medium" className="top-10 right-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-20 bg-chinese-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-chinese-gold">Доставка</h2>
            <p className="text-xl text-gray-300">Быстрая доставка по всему городу</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-chinese-black/70 border-chinese-red/30 text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🚚</div>
                <CardTitle className="text-xl text-chinese-gold mb-2">Быстрая доставка</CardTitle>
                <CardDescription className="text-gray-300">Доставим ваш заказ за 30-45 минут</CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-chinese-black/70 border-chinese-red/30 text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">💰</div>
                <CardTitle className="text-xl text-chinese-gold mb-2">Бесплатно от 2000₽</CardTitle>
                <CardDescription className="text-gray-300">При заказе от 2000₽ доставка бесплатно</CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-chinese-black/70 border-chinese-red/30 text-center">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">📱</div>
                <CardTitle className="text-xl text-chinese-gold mb-2">Онлайн заказ</CardTitle>
                <CardDescription className="text-gray-300">Удобное оформление заказа через сайт</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-chinese-dark/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-chinese-gold">Галерея</h2>
            <p className="text-xl text-gray-300">Атмосфера нашего ресторана</p>
          </div>
          <ImageGallery images={galleryImages} />
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promotions" className="py-20 bg-chinese-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-chinese-gold">Акции</h2>
            <p className="text-xl text-gray-300">Специальные предложения</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-chinese-red/20 to-chinese-gold/20 border-chinese-gold/50 animate-glow">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <CardTitle className="text-2xl text-chinese-gold mb-4">Счастливый час</CardTitle>
                <CardDescription className="text-lg text-gray-300 mb-4">
                  Скидка 20% на все блюда с 15:00 до 17:00
                </CardDescription>
                <Badge className="bg-chinese-red text-white text-lg px-4 py-2">Ежедневно</Badge>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-chinese-gold/20 to-chinese-red/20 border-chinese-red/50 animate-glow">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">🥢</div>
                <CardTitle className="text-2xl text-chinese-gold mb-4">Семейный ужин</CardTitle>
                <CardDescription className="text-lg text-gray-300 mb-4">
                  При заказе от 4000₽ десерт в подарок
                </CardDescription>
                <Badge className="bg-chinese-gold text-black text-lg px-4 py-2">Выходные</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-chinese-dark/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-chinese-gold">Бронирование столика</h2>
              <p className="text-xl text-gray-300">Забронируйте столик прямо сейчас</p>
            </div>
            <Card className="bg-chinese-black/70 border-chinese-red/30">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-chinese-gold mb-2">Имя *</label>
                      <Input className="bg-chinese-black/50 border-chinese-red/30 text-white" placeholder="Ваше имя" />
                    </div>
                    <div>
                      <label className="block text-chinese-gold mb-2">Телефон *</label>
                      <Input className="bg-chinese-black/50 border-chinese-red/30 text-white" placeholder="+7 (___) ___-__-__" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-chinese-gold mb-2">Дата *</label>
                      <Input type="date" className="bg-chinese-black/50 border-chinese-red/30 text-white" />
                    </div>
                    <div>
                      <label className="block text-chinese-gold mb-2">Время *</label>
                      <Input type="time" className="bg-chinese-black/50 border-chinese-red/30 text-white" />
                    </div>
                    <div>
                      <label className="block text-chinese-gold mb-2">Гостей *</label>
                      <Input type="number" className="bg-chinese-black/50 border-chinese-red/30 text-white" placeholder="2" min="1" max="20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-chinese-gold mb-2">Комментарий</label>
                    <Textarea className="bg-chinese-black/50 border-chinese-red/30 text-white" placeholder="Особые пожелания..." />
                  </div>
                  <Button className="w-full bg-chinese-red hover:bg-chinese-red/80 text-white text-lg py-3">
                    Забронировать столик
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-chinese-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-chinese-gold">Контакты</h2>
            <p className="text-xl text-gray-300">Мы всегда рады видеть вас</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Icon name="MapPin" size={24} className="text-chinese-red" />
                <div>
                  <h3 className="text-xl font-semibold text-chinese-gold">Адрес</h3>
                  <p className="text-gray-300">ул. Пушкина, д. 15, Москва</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Icon name="Phone" size={24} className="text-chinese-red" />
                <div>
                  <h3 className="text-xl font-semibold text-chinese-gold">Телефон</h3>
                  <p className="text-gray-300">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Icon name="Clock" size={24} className="text-chinese-red" />
                <div>
                  <h3 className="text-xl font-semibold text-chinese-gold">Время работы</h3>
                  <p className="text-gray-300">Ежедневно с 11:00 до 23:00</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Icon name="Mail" size={24} className="text-chinese-red" />
                <div>
                  <h3 className="text-xl font-semibold text-chinese-gold">Email</h3>
                  <p className="text-gray-300">info@china-clouds.ru</p>
                </div>
              </div>
            </div>
            <div className="bg-chinese-black/70 border border-chinese-red/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-chinese-gold mb-6">Напишите нам</h3>
              <form className="space-y-4">
                <Input className="bg-chinese-black/50 border-chinese-red/30 text-white" placeholder="Ваше имя" />
                <Input type="email" className="bg-chinese-black/50 border-chinese-red/30 text-white" placeholder="Email" />
                <Textarea className="bg-chinese-black/50 border-chinese-red/30 text-white" placeholder="Сообщение" rows={4} />
                <Button className="w-full bg-chinese-red hover:bg-chinese-red/80 text-white">
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chinese-black border-t border-chinese-red/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">☁️</div>
                <h3 className="text-xl font-bold text-chinese-gold">Облака Китая</h3>
              </div>
              <p className="text-gray-400">Подлинная китайская кухня в сердце города</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-chinese-gold mb-4">Меню</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Основные блюда</a></li>
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Закуски</a></li>
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Напитки</a></li>
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Десерты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-chinese-gold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Бронирование</a></li>
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Банкеты</a></li>
                <li><a href="#" className="hover:text-chinese-gold transition-colors">Корпоративы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-chinese-gold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-chinese-gold transition-colors">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-chinese-gold transition-colors">
                  <Icon name="Facebook" size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-chinese-gold transition-colors">
                  <Icon name="Twitter" size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-chinese-red/30 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Облака Китая. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};

export default Index;