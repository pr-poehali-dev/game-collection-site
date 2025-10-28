import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess?: (user: { name: string; email: string; avatar: string }) => void;
}

export default function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = isLogin 
        ? { email, password }
        : { email, password, username };

      const response = await fetch('https://functions.poehali.dev/5a946706-a300-45aa-9363-e08bb8050988', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        if (onAuthSuccess) {
          onAuthSuccess({
            name: data.username,
            email: data.email,
            avatar: data.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username)}&background=06b6d4&color=fff`
          });
        }
        toast({
          title: isLogin ? 'Вход выполнен' : 'Регистрация успешна',
          description: `Добро пожаловать, ${data.username}!`
        });
        onOpenChange(false);
        setEmail('');
        setPassword('');
        setUsername('');
      } else {
        toast({
          title: 'Ошибка',
          description: data.error || 'Что-то пошло не так',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    const mockUsers = {
      vk: {
        name: 'Иван Иванов',
        email: 'ivan@vk.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      },
      yandex: {
        name: 'Мария Петрова',
        email: 'maria@yandex.ru',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      },
      telegram: {
        name: 'Алексей Смирнов',
        email: 'alexey@telegram.org',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      }
    };

    const user = mockUsers[provider as keyof typeof mockUsers];
    if (user && onAuthSuccess) {
      onAuthSuccess(user);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            {isLogin ? 'Вход' : 'Регистрация'}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEmailAuth} className="space-y-4 py-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Имя пользователя</Label>
              <Input
                id="username"
                type="text"
                placeholder="Введите имя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                className="bg-background"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-background"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={loading}
          >
            {loading ? (
              <Icon name="Loader2" size={18} className="animate-spin mr-2" />
            ) : null}
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>

        <Separator className="my-4" />

        <div className="space-y-3">
          <p className="text-sm text-center text-muted-foreground">Или войдите через</p>
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary/10 hover:border-primary transition-all"
              onClick={() => handleSocialAuth('vk')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.63h-1.55c-.54 0-.71-.43-1.67-1.42-.86-.83-1.23-.94-1.45-.94-.29 0-.38.09-.38.5v1.3c0 .35-.11.56-1.03.56-1.51 0-3.18-.91-4.36-2.61C6.19 11.46 5.65 9.4 5.65 9c0-.23.09-.44.5-.44h1.55c.38 0 .52.17.67.56.76 2.24 2.03 4.2 2.56 4.2.2 0 .29-.09.29-.58v-2.3c-.06-1.25-.73-1.35-.73-1.8 0-.18.15-.36.4-.36h2.43c.32 0 .44.17.44.54v3.09c0 .32.14.44.23.44.2 0 .38-.12.76-.5 1.16-1.3 1.99-3.31 1.99-3.31.11-.23.28-.44.66-.44h1.55c.47 0 .57.24.47.56-.17.8-1.94 3.39-1.94 3.39-.17.26-.23.38 0 .68.17.23.73.71 1.10 1.14.68.77 1.2 1.41 1.34 1.86.14.44-.08.67-.51.67z"/>
              </svg>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary/10 hover:border-primary transition-all"
              onClick={() => handleSocialAuth('yandex')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.93 13.44h-2.15V9.56h-.93c-1.48 0-2.24.73-2.24 1.97 0 1.35.52 1.86 1.73 2.63l1.02.65-2.98 4.63h-2.4l2.66-4.07c-1.53-1.02-2.27-2.02-2.27-3.68 0-2.17 1.33-3.69 4.01-3.69h3.55v10.44z"/>
              </svg>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary/10 hover:border-primary transition-all"
              onClick={() => handleSocialAuth('telegram')}
            >
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}