import { Link } from 'react-router';
import { Button } from '../components/Button';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="mb-4">Страница не найдена</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
        <Link to="/">
          <Button variant="primary">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
