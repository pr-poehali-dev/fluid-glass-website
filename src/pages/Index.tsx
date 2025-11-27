import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  rating: number;
  image: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Будущее веб-дизайна в стиле Frutiger Aero',
    excerpt: 'Исследуем возвращение эстетики прозрачных интерфейсов и жидкого стекла в современном дизайне',
    category: 'Дизайн',
    tags: ['UI/UX', 'Тренды', 'Frutiger'],
    date: '2025-11-20',
    rating: 4.8,
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Создание glassmorphism эффектов с помощью CSS',
    excerpt: 'Пошаговое руководство по созданию эффекта матового стекла используя backdrop-filter',
    category: 'Разработка',
    tags: ['CSS', 'Tutorial', 'Glassmorphism'],
    date: '2025-11-18',
    rating: 4.5,
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'История интерфейсов: от Windows Vista до сегодняшнего дня',
    excerpt: 'Как эволюционировали прозрачные интерфейсы и почему они снова в тренде',
    category: 'История',
    tags: ['Интерфейсы', 'Windows', 'Ретро'],
    date: '2025-11-15',
    rating: 4.9,
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Анимации и микроинтеракции в современных SPA',
    excerpt: 'Разбираем лучшие практики создания плавных переходов и интерактивных элементов',
    category: 'Разработка',
    tags: ['JavaScript', 'Animation', 'UX'],
    date: '2025-11-12',
    rating: 4.6,
    image: '/placeholder.svg'
  }
];

const categories = ['Все', 'Дизайн', 'Разработка', 'История', 'Тренды'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [email, setEmail] = useState('');

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Спасибо за подписку! Письма будут приходить на ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen">
      <header className="backdrop-blur-xl bg-white/30 border-b border-white/40 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
              <Icon name="Sparkles" size={36} className="animate-float" />
              AeroBlог
            </h1>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Icon name="Home" size={20} />
                Главная
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Icon name="User" size={20} />
                Об авторе
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Icon name="Mail" size={20} />
                Контакты
              </a>
            </nav>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по статьям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg backdrop-blur-md bg-white/50 border-white/60 shadow-lg rounded-2xl focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-wrap gap-3 justify-center animate-fade-in">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={`backdrop-blur-md transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary/90 text-white shadow-xl scale-105'
                  : 'bg-white/40 hover:bg-white/60 border-white/60'
              } rounded-full px-6 py-2`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredArticles.map((article, index) => (
            <Card
              key={article.id}
              className="backdrop-blur-xl bg-white/40 border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/50 rounded-3xl overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Icon name="Image" size={64} className="text-primary/40" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/80 text-white backdrop-blur-sm">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {new Date(article.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-foreground">{article.title}</h2>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="backdrop-blur-sm bg-white/30 border-white/50">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name={i < Math.floor(article.rating) ? 'Star' : 'StarHalf'}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{article.rating}</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button className="flex-1 backdrop-blur-md bg-primary hover:bg-primary/90 rounded-xl">
                  Читать
                </Button>
                <Button variant="outline" size="icon" className="backdrop-blur-md bg-white/40 border-white/60 rounded-xl">
                  <Icon name="Share2" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="backdrop-blur-md bg-white/40 border-white/60 rounded-xl">
                  <Icon name="Bookmark" size={18} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/40 border-white/60 rounded-3xl shadow-2xl p-8 mb-12 animate-fade-in">
          <div className="text-center mb-6">
            <Icon name="Bell" size={48} className="mx-auto mb-4 text-primary animate-float" />
            <h2 className="text-3xl font-bold mb-2">Подпишитесь на рассылку</h2>
            <p className="text-muted-foreground">Получайте новые статьи прямо на почту</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-3">
            <Input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12 backdrop-blur-md bg-white/50 border-white/60 rounded-xl"
            />
            <Button type="submit" className="backdrop-blur-md bg-primary hover:bg-primary/90 rounded-xl px-8">
              Подписаться
            </Button>
          </form>
        </div>
      </main>

      <footer className="backdrop-blur-xl bg-white/30 border-t border-white/40 shadow-lg py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Icon name="Sparkles" size={28} className="text-primary" />
              <span className="font-semibold text-lg">AeroBlог © 2025</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="backdrop-blur-md bg-white/40 hover:bg-white/60 rounded-xl">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="backdrop-blur-md bg-white/40 hover:bg-white/60 rounded-xl">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="backdrop-blur-md bg-white/40 hover:bg-white/60 rounded-xl">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="backdrop-blur-md bg-white/40 hover:bg-white/60 rounded-xl">
                <Icon name="Linkedin" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
