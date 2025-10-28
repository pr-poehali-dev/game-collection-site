import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AuthDialog from '@/components/AuthDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Game {
  id: number;
  title: string;
  genre: string;
  image: string;
  description: string;
  rating: number;
  fullDescription: string;
  developer: string;
  releaseDate: string;
  screenshots: string[];
}

const GAMES: Game[] = [
  {
    id: 1,
    title: 'Counter-Strike 2',
    genre: 'Шутер',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    description: 'Легендарный тактический шутер',
    fullDescription: 'Counter-Strike 2 — это легендарный тактический многопользовательский шутер от первого лица. Две команды сражаются друг против друга: террористы и контртеррористы. Обе стороны пытаются ликвидировать друг друга, а также выполнить отдельные цели карты. Террористы, в зависимости от режима игры, должны заложить бомбу или охранять заложников, а контртеррористы должны предотвратить заложение бомбы, разминировать её или спасти заложников.',
    developer: 'Valve Corporation',
    releaseDate: '27.09.2023',
    screenshots: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop'
    ],
    rating: 4.9
  },
  {
    id: 2,
    title: 'Dota 2',
    genre: 'MOBA',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    description: 'Командная стратегия в реальном времени',
    fullDescription: 'Dota 2 — многопользовательская командная компьютерная игра в жанре MOBA. Игра является продолжением DotA — пользовательской карты-модификации для игры Warcraft III. Две команды по пять игроков сражаются друг с другом, защищая свою базу и пытаясь уничтожить базу противника.',
    developer: 'Valve Corporation',
    releaseDate: '09.07.2013',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop'
    ],
    rating: 4.8
  },
  {
    id: 3,
    title: 'World of Tanks',
    genre: 'Экшен',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
    description: 'Массовые танковые сражения',
    fullDescription: 'World of Tanks — массовая многопользовательская онлайн-игра, посвящённая бронированной технике середины XX века. Игрокам предстоит управлять легендарными танками различных наций и участвовать в масштабных командных сражениях. Прокачивайте технику, разрабатывайте тактику и доминируйте на полях сражений.',
    developer: 'Wargaming',
    releaseDate: '12.08.2010',
    screenshots: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop'
    ],
    rating: 4.7
  },
  {
    id: 4,
    title: 'Escape from Tarkov',
    genre: 'Шутер',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    description: 'Хардкорный тактический шутер',
    fullDescription: 'Escape from Tarkov — хардкорный многопользовательский шутер от первого лица с элементами RPG и симулятора выживания. Игрокам предстоит выживать в вымышленном российском городе Тарков, собирать добычу и сражаться с другими игроками и NPC. Реалистичная баллистика, система ранений и необходимость тщательной подготовки к каждому рейду делают игру уникальной в своём жанре.',
    developer: 'Battlestate Games',
    releaseDate: '27.07.2017',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop'
    ],
    rating: 4.6
  },
  {
    id: 5,
    title: 'War Thunder',
    genre: 'Симулятор',
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&h=300&fit=crop',
    description: 'Военная авиация и танки',
    fullDescription: 'War Thunder — многопользовательская игра, посвящённая авиации, бронетехнике и флоту периода Второй мировой войны и послевоенного времени. Игра включает более 2000 единиц техники из разных стран и эпох. Реалистичная физика повреждений, различные режимы игры от аркады до симулятора и возможность сражаться на суше, в воздухе и на море делают War Thunder уникальным военным симулятором.',
    developer: 'Gaijin Entertainment',
    releaseDate: '15.08.2013',
    screenshots: [
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop'
    ],
    rating: 4.5
  },
  {
    id: 6,
    title: 'Metro Exodus',
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    description: 'Постапокалиптическое приключение',
    fullDescription: 'Metro Exodus — постапокалиптический шутер от первого лица с элементами survival horror и RPG, основанный на романах Дмитрия Глуховского. Артём и группа выживших отправляются в путешествие по России на паровозе "Аврора" в поисках нового дома. Игра сочетает линейные уровни с открытыми локациями, предлагая уникальную атмосферу и глубокий сюжет.',
    developer: '4A Games',
    releaseDate: '15.02.2019',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop'
    ],
    rating: 4.8
  },
  {
    id: 7,
    title: 'Atomic Heart',
    genre: 'Экшен',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    description: 'Альтернативная история СССР',
    fullDescription: 'Atomic Heart — экшен от первого лица в альтернативной реальности СССР. События разворачиваются в утопическом мире, где передовые технологии и роботизация достигли невероятных высот, но что-то пошло не так. Игроку предстоит разобраться в тайнах секретного объекта №3826 и остановить восстание машин, используя уникальное оружие и полимерную перчатку.',
    developer: 'Mundfish',
    releaseDate: '21.02.2023',
    screenshots: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop'
    ],
    rating: 4.4
  },
  {
    id: 8,
    title: 'Stalker 2',
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    description: 'Выживание в Зоне',
    fullDescription: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl — долгожданное продолжение легендарной серии игр о Зоне отчуждения. Игрокам предстоит исследовать огромный открытый мир, полный аномалий, мутантов и других сталкеров. Нелинейный сюжет, система A-Life 2.0 и уникальная атмосфера создают непередаваемое чувство присутствия в опасной и загадочной Зоне.',
    developer: 'GSC Game World',
    releaseDate: '20.11.2024',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop'
    ],
    rating: 4.7
  },
  {
    id: 9,
    title: 'Minecraft',
    genre: 'Песочница',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
    description: 'Строй и исследуй мир',
    fullDescription: 'Minecraft — культовая игра-песочница, где игроки могут строить и исследовать бесконечные процедурно генерируемые миры из блоков. Режим выживания предлагает добывать ресурсы и защищаться от монстров, а творческий режим дает безграничные возможности для строительства. Миллионы игроков по всему миру создают удивительные постройки и делятся своими творениями.',
    developer: 'Mojang Studios',
    releaseDate: '18.11.2011',
    screenshots: [
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop'
    ],
    rating: 4.9
  },
  {
    id: 10,
    title: 'GTA V',
    genre: 'Экшен',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    description: 'Открытый мир криминала',
    fullDescription: 'Grand Theft Auto V — культовая игра в открытом мире от Rockstar Games, действие которой разворачивается в вымышленном штате Сан-Андреас. Игроки управляют тремя главными героями с уникальными историями и способностями, совершая дерзкие ограбления и исследуя огромный мир. Многопользовательский режим GTA Online предлагает бесконечные возможности для развлечений с друзьями.',
    developer: 'Rockstar Games',
    releaseDate: '17.09.2013',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop'
    ],
    rating: 4.8
  },
  {
    id: 11,
    title: 'League of Legends',
    genre: 'MOBA',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
    description: 'Соревновательная арена сражений',
    fullDescription: 'League of Legends — самая популярная MOBA-игра в мире с многомиллионной аудиторией и развитой киберспортивной сценой. Две команды по пять игроков выбирают уникальных чемпионов и сражаются за разрушение базы противника. Постоянные обновления, новые чемпионы и сезонные изменения делают игру свежей и увлекательной на протяжении многих лет.',
    developer: 'Riot Games',
    releaseDate: '27.10.2009',
    screenshots: [
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=450&fit=crop'
    ],
    rating: 4.7
  },
  {
    id: 12,
    title: 'Valorant',
    genre: 'Шутер',
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&h=300&fit=crop',
    description: 'Тактический 5v5 шутер',
    rating: 4.6
  },
  {
    id: 13,
    title: 'Tetris',
    genre: 'Головоломка',
    image: 'https://images.unsplash.com/photo-1611329532992-7dfbd8d0e5a0?w=400&h=300&fit=crop',
    description: 'Классическая головоломка',
    rating: 4.9
  },
  {
    id: 14,
    title: 'World of Warcraft',
    genre: 'MMORPG',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    description: 'Легендарная онлайн RPG',
    rating: 4.5
  },
  {
    id: 15,
    title: 'Fortnite',
    genre: 'Экшен',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    description: 'Королевская битва',
    rating: 4.4
  },
  {
    id: 16,
    title: 'Cyberpunk 2077',
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    description: 'Будущее найт-сити',
    rating: 4.3
  }
];

const GENRES = ['Все', 'Шутер', 'RPG', 'Экшен', 'MOBA', 'Головоломка', 'Симулятор', 'Песочница', 'MMORPG'];

interface User {
  name: string;
  email: string;
  avatar: string;
}

export default function Index() {
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = (gameId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const filteredGames = GAMES.filter(game => {
    const matchesGenre = selectedGenre === 'Все' || game.genre === selectedGenre;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorites = !showFavoritesOnly || favorites.includes(game.id);
    return matchesGenre && matchesSearch && matchesFavorites;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Icon name="Gamepad2" size={32} className="text-primary" />
              <h1 className="text-3xl font-bold text-foreground">QatroStudio</h1>
            </div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 h-auto py-2 px-3 hover:bg-primary/10">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                  <DropdownMenuLabel className="text-foreground">Мой профиль</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  >
                    <Icon name="Heart" size={16} className="mr-2" />
                    {showFavoritesOnly ? 'Все игры' : 'Избранное'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-destructive/10 text-destructive"
                    onClick={() => setUser(null)}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setAuthDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Icon name="User" size={18} />
                Вход
              </Button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {GENRES.map(genre => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  onClick={() => setSelectedGenre(genre)}
                  className="transition-all"
                >
                  {genre}
                </Button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {showFavoritesOnly ? 'Избранные игры' : 'Найдено игр'}: <span className="text-primary font-semibold">{filteredGames.length}</span>
          </p>
          {favorites.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className="gap-2"
            >
              <Icon name="Heart" size={16} className={showFavoritesOnly ? 'fill-current text-primary' : ''} />
              {showFavoritesOnly ? 'Показать все' : `Избранное (${favorites.length})`}
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <Card 
              key={game.id} 
              className="overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 bg-card border-border"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className={`h-8 w-8 p-0 bg-background/80 backdrop-blur hover:bg-primary/20 ${
                      favorites.includes(game.id) ? 'text-primary' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(game.id);
                    }}
                  >
                    <Icon 
                      name={favorites.includes(game.id) ? "Heart" : "Heart"} 
                      size={16}
                      className={favorites.includes(game.id) ? 'fill-current' : ''}
                    />
                  </Button>
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                    <Icon name="Star" size={14} className="text-primary mr-1" />
                    {game.rating}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-start">
                  <Badge variant="outline" className="border-primary text-primary">
                    {game.genre}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <Icon name="GamepadIcon" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Игры не найдены</h2>
            <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </main>

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={setUser}
      />
    </div>
  );
}