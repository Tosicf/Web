import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowRight, Plus, Minus, CheckCircle, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';

const TICKET_TYPES = [
  { id: 'adult', label: 'Взрослый', price: 400 },
  { id: 'student', label: 'Студент (с удостоверением)', price: 200 },
  { id: 'child', label: 'Ребёнок до 12 лет', price: 0 },
  { id: 'senior', label: 'Льготный', price: 150 },
];

const EVENTS = [
  {
    id: 'lecture',
    title: 'Лекция: История импрессионизма',
    date: '15 июня, 2026',
    time: '18:00',
    speaker: 'Анна Петрова, искусствовед',
  },
  {
    id: 'workshop',
    title: 'Мастер-класс по живописи',
    date: '22 июня, 2026',
    time: '14:00',
    speaker: 'Профессиональный художник',
  },
];

function TicketModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({ adult: 1, student: 0, child: 0, senior: 0 });
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState(false);

  const total = TICKET_TYPES.reduce((sum, t) => sum + t.price * (quantities[t.id] || 0), 0);
  const totalCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  const adjust = (id: string, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const handleBuy = () => {
    if (!date || totalCount === 0) return;
    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setQuantities({ adult: 1, student: 0, child: 0, senior: 0 });
    setDate('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {success ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Билеты оформлены!</h3>
            <p className="text-muted-foreground mb-2">
              Ваши билеты на <strong>{date}</strong> успешно куплены.
            </p>
            <p className="text-muted-foreground mb-6">
              Подтверждение будет отправлено на вашу почту.
            </p>
            <Button variant="primary" onClick={handleClose}>Закрыть</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Купить билет</DialogTitle>
              <p className="text-sm text-muted-foreground">Музей истории и искусств</p>
            </DialogHeader>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Дата посещения</label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setDate(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Тип билетов</label>
                <div className="space-y-3">
                  {TICKET_TYPES.map(t => (
                    <div key={t.id} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">{t.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {t.price === 0 ? 'Бесплатно' : `${t.price} ₽`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjust(t.id, -1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{quantities[t.id]}</span>
                        <button
                          onClick={() => adjust(t.id, 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-semibold">Итого:</span>
                <span className="text-lg font-bold text-primary">{total} ₽</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} className="flex-1">Отмена</Button>
              <Button
                variant="primary"
                onClick={handleBuy}
                disabled={!date || totalCount === 0}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Оплатить
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function EventModal({
  event,
  onClose,
}: {
  event: (typeof EVENTS)[0] | null;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Введите корректный email';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSuccess(true);
  };

  const handleClose = () => {
    setForm({ name: '', email: '', phone: '' });
    setErrors({});
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={!!event} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {success ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Вы зарегистрированы!</h3>
            <p className="text-muted-foreground mb-1">
              <strong>{event?.title}</strong>
            </p>
            <p className="text-muted-foreground mb-6">
              {event?.date} в {event?.time}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Подтверждение отправлено на {form.email}
            </p>
            <Button variant="primary" onClick={handleClose}>Закрыть</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Регистрация на мероприятие</DialogTitle>
              {event && (
                <div className="mt-1 p-3 bg-muted rounded-lg text-sm">
                  <p className="font-medium text-foreground">{event.title}</p>
                  <p className="text-muted-foreground">{event.date} в {event.time}</p>
                  <p className="text-muted-foreground">{event.speaker}</p>
                </div>
              )}
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Имя *</label>
                <input
                  value={form.name}
                  onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                  placeholder="Ваше имя"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                  placeholder="example@mail.com"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Телефон</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} className="flex-1">Отмена</Button>
              <Button variant="primary" onClick={handleSubmit} className="flex-1">
                Зарегистрироваться
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [ticketOpen, setTicketOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<(typeof EVENTS)[0] | null>(null);

  const featuredExhibitions = [
    {
      title: 'Импрессионизм в России',
      description: 'Уникальная коллекция работ русских импрессионистов конца XIX - начала XX века.',
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
    },
    {
      title: 'Древние цивилизации',
      description: 'Артефакты и предметы искусства древних культур Средиземноморья и Ближнего Востока.',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    },
    {
      title: 'Современное искусство',
      description: 'Экспериментальные работы современных художников, исследующих границы искусства.',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-secondary to-secondary/80 flex items-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl mb-6">Музей истории и искусств</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl opacity-90">
            Откройте для себя удивительный мир искусства и культурного наследия
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              className="bg-primary hover:bg-[var(--accent-hover)]"
              onClick={() => setTicketOpen(true)}
            >
              Купить билет
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-secondary"
              onClick={() => navigate('/exhibitions')}
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Exhibitions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="mb-4">Текущие выставки</h2>
            <p className="text-muted-foreground">Погрузитесь в мир искусства через наши кураторские экспозиции</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExhibitions.map((exhibition, index) => (
            <Card
              key={index}
              image={exhibition.image}
              title={exhibition.title}
              description={exhibition.description}
              link="/exhibitions"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" onClick={() => navigate('/exhibitions')}>
            Все выставки
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">О музее</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Музей истории и искусств — это культурное пространство, где встречаются прошлое и настоящее.
                Наша коллекция насчитывает более 50 000 экспонатов, охватывающих период от древности до современности.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Мы стремимся сделать искусство доступным каждому, предлагая образовательные программы,
                экскурсии и интерактивные мероприятия для посетителей всех возрастов.
              </p>
              <Button variant="primary" onClick={() => navigate('/collection')}>
                Узнать больше о музее
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1565626424178-c699f6601afd?w=800&q=80"
                alt="Интерьер музея"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="mb-12 text-center">Ближайшие события</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS.map(event => (
            <div key={event.id} className="bg-card p-6 rounded-xl shadow-md border-l-4 border-primary">
              <div className="text-sm text-primary font-medium mb-2">{event.date}</div>
              <h3 className="mb-3">{event.title}</h3>
              <p className="text-muted-foreground mb-4">
                {event.id === 'lecture'
                  ? 'Искусствовед Анна Петрова расскажет о зарождении и развитии импрессионистского движения.'
                  : 'Научитесь основам масляной живописи под руководством профессионального художника.'}
              </p>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setSelectedEvent(event)}
              >
                Зарегистрироваться
              </Button>
            </div>
          ))}
        </div>
      </section>

      <TicketModal open={ticketOpen} onClose={() => setTicketOpen(false)} />
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
