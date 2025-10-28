import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSocialAuth = (provider: string) => {
    console.log(`Auth with ${provider}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground">
            {isLogin ? 'Вход' : 'Регистрация'}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Войдите через социальные сети
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            variant="outline"
            className="w-full h-12 text-base hover:bg-primary/10 hover:border-primary transition-all"
            onClick={() => handleSocialAuth('vk')}
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.63h-1.55c-.54 0-.71-.43-1.67-1.42-.86-.83-1.23-.94-1.45-.94-.29 0-.38.09-.38.5v1.3c0 .35-.11.56-1.03.56-1.51 0-3.18-.91-4.36-2.61C6.19 11.46 5.65 9.4 5.65 9c0-.23.09-.44.5-.44h1.55c.38 0 .52.17.67.56.76 2.24 2.03 4.2 2.56 4.2.2 0 .29-.09.29-.58v-2.3c-.06-1.25-.73-1.35-.73-1.8 0-.18.15-.36.4-.36h2.43c.32 0 .44.17.44.54v3.09c0 .32.14.44.23.44.2 0 .38-.12.76-.5 1.16-1.3 1.99-3.31 1.99-3.31.11-.23.28-.44.66-.44h1.55c.47 0 .57.24.47.56-.17.8-1.94 3.39-1.94 3.39-.17.26-.23.38 0 .68.17.23.73.71 1.1 1.14.68.77 1.2 1.41 1.34 1.86.14.44-.08.67-.51.67z"/>
              </svg>
              <span>ВКонтакте</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 text-base hover:bg-primary/10 hover:border-primary transition-all"
            onClick={() => handleSocialAuth('yandex')}
          >
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.93 13.44h-2.15V9.56h-.93c-1.48 0-2.24.73-2.24 1.97 0 1.35.52 1.86 1.73 2.63l1.02.65-2.98 4.63h-2.4l2.66-4.07c-1.53-1.02-2.27-2.02-2.27-3.68 0-2.17 1.33-3.69 4.01-3.69h3.55v10.44z"/>
              </svg>
              <span>Яндекс</span>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 text-base hover:bg-primary/10 hover:border-primary transition-all"
            onClick={() => handleSocialAuth('telegram')}
          >
            <div className="flex items-center justify-center gap-3">
              <Icon name="Send" size={24} />
              <span>Telegram</span>
            </div>
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="text-center">
          <button
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
