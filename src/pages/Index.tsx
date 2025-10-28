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
}

const GAMES: Game[] = [
  {
    id: 1,
    title: 'Cyber Warriors',
    genre: 'Action',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
    description: 'Intense futuristic combat',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Dragon Quest',
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    description: 'Epic fantasy adventure',
    rating: 4.9
  },
  {
    id: 3,
    title: 'Empire Builder',
    genre: 'Strategy',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
    description: 'Build your civilization',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Mind Maze',
    genre: 'Puzzle',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
    description: 'Challenge your brain',
    rating: 4.6
  },
  {
    id: 5,
    title: 'Street Fighter X',
    genre: 'Action',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    description: 'Ultimate fighting game',
    rating: 4.8
  },
  {
    id: 6,
    title: 'Kingdom Legends',
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    description: 'Medieval fantasy world',
    rating: 4.9
  },
  {
    id: 7,
    title: 'War Commander',
    genre: 'Strategy',
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=400&h=300&fit=crop',
    description: 'Real-time strategy battles',
    rating: 4.5
  },
  {
    id: 8,
    title: 'Cube Master',
    genre: 'Puzzle',
    image: 'https://images.unsplash.com/photo-1611329532992-7dfbd8d0e5a0?w=400&h=300&fit=crop',
    description: 'Solve complex puzzles',
    rating: 4.7
  }
];

const GENRES = ['All', 'Action', 'RPG', 'Strategy', 'Puzzle'];

interface User {
  name: string;
  email: string;
  avatar: string;
}

export default function Index() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const filteredGames = GAMES.filter(game => {
    const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
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
                  <DropdownMenuItem className="cursor-pointer hover:bg-primary/10">
                    <Icon name="Heart" size={16} className="mr-2" />
                    Избранное
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
        <div className="mb-6">
          <p className="text-muted-foreground">
            Найдено игр: <span className="text-primary font-semibold">{filteredGames.length}</span>
          </p>
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
                <div className="absolute top-2 right-2">
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
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-primary text-primary">
                    {game.genre}
                  </Badge>
                  <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon name="Play" size={16} className="mr-1" />
                    Играть
                  </Button>
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