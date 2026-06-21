import { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { Calendar, Clock, MapPin, X, Ticket } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

const exhibitions = [
  {
    title: 'Импрессионизм в России',
    description: 'Уникальная коллекция работ русских импрессионистов конца XIX - начала XX века. Представлены произведения Коровина, Серова, Грабаря и других мастеров.',
    fullDescription:
      'Выставка охватывает период расцвета русского импрессионизма — с 1880-х по 1920-е годы. На экспозиции представлено более 80 работ из музейных и частных коллекций. Посетители смогут увидеть знаменитые полотна Константина Коровина, Валентина Серова и Игоря Грабаря, а также менее известных, но не менее талантливых мастеров эпохи. Экскурсионное сопровождение доступно по расписанию.',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
    date: 'До 30 августа 2026',
    hall: 'Залы 5–8, 2-й этаж',
    time: 'Вт–Вс, 10:00–20:00',
  },
  {
    title: 'Древние цивилизации',
    description: 'Артефакты и предметы искусства древних культур Средиземноморья и Ближнего Востока. Более 200 экспонатов из собраний крупнейших музеев мира.',
    fullDescription:
      'Монументальная выставка объединяет более 200 артефактов из Египта, Греции, Рима и Месопотамии. Многие предметы экспонируются в России впервые. Интерактивные стенды позволяют глубже погрузиться в историю каждой цивилизации. Для детей предусмотрена специальная образовательная программа с квестом по залам.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    date: 'До 15 сентября 2026',
    hall: 'Залы 1–4, 1-й этаж',
    time: 'Вт–Вс, 10:00–20:00',
  },
  {
    title: 'Современное искусство',
    description: 'Экспериментальные работы современных художников, исследующих границы искусства. Живопись, скульптура, видео-арт и инсталляции.',
    fullDescription:
      'Выставка представляет работы 30 художников из 15 стран мира. Инсталляции, перформативные объекты, видео-арт и живопись сосуществуют в едином пространстве, предлагая зрителю задуматься о природе искусства в XXI веке. Часть работ создана специально для этого показа. Вход для детей до 12 лет — свободный.',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
    date: 'До 10 июля 2026',
    hall: 'Зал современного искусства, 3-й этаж',
    time: 'Вт–Вс, 12:00–21:00',
  },
  {
    title: 'Золотой век портрета',
    description: 'Парадные и камерные портреты XVIII-XIX веков из частных коллекций. Работы Левицкого, Боровиковского, Брюллова.',
    fullDescription:
      'Уникальное собрание портретной живописи золотого века российской художественной школы. На выставке впервые в одном пространстве встречаются парадные государственные портреты и интимные камерные работы. Среди экспонатов — произведения из частных собраний, ранее недоступные широкой публике. Аудиогид включён в стоимость билета.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    date: 'До 20 июля 2026',
    hall: 'Парадные залы, 2-й этаж',
    time: 'Вт–Вс, 10:00–20:00',
  },
  {
    title: 'Авангард и революция',
    description: 'Искусство русского авангарда 1910-1930-х годов. Малевич, Кандинский, Родченко и другие новаторы.',
    fullDescription:
      'Экспозиция посвящена одному из самых революционных периодов в истории мирового искусства. Работы Казимира Малевича, Василия Кандинского, Александра Родченко и их современников представлены в контексте исторических событий эпохи. Выставка сопровождается архивными документами, фотографиями и кинохроникой. Лекционная программа — по расписанию.',
    image: 'https://images.unsplash.com/photo-1724774120625-7bd015b0a518?w=800&q=80',
    date: 'До 5 августа 2026',
    hall: 'Залы 9–12, 3-й этаж',
    time: 'Вт–Вс, 10:00–20:00',
  },
  {
    title: 'Японская гравюра',
    description: 'Шедевры японской ксилографии XVIII-XIX веков. Работы Хокусая, Утамаро, Хиросиге из собрания музея.',
    fullDescription:
      'Собрание насчитывает более 150 листов японской ксилографии укиё-э — "картин изменчивого мира". Среди экспонатов — знаменитая серия Хокусая "36 видов горы Фудзи", лирические образы Утамаро и пейзажи Хиросиге. Все работы прошли реставрацию и экспонируются в специальных условиях освещения, сохраняющих хрупкие оригиналы.',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
    date: 'До 25 августа 2026',
    hall: 'Зал восточного искусства, 1-й этаж',
    time: 'Вт–Вс, 10:00–19:00',
  },
];

type Exhibition = (typeof exhibitions)[0];

function ExhibitionModal({
  exhibition,
  onClose,
  onBuyTicket,
}: {
  exhibition: Exhibition | null;
  onClose: () => void;
  onBuyTicket: () => void;
}) {
  return (
    <Dialog open={!!exhibition} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        {exhibition && (
          <>
            <div className="aspect-[16/7] overflow-hidden">
              <img
                src={exhibition.image}
                alt={exhibition.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl">{exhibition.title}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-wrap gap-4 mt-4 mb-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  {exhibition.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  {exhibition.hall}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {exhibition.time}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {exhibition.fullDescription}
              </p>

              <div className="flex gap-3">
                <Button variant="primary" onClick={() => { onClose(); onBuyTicket(); }} className="flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Купить билет
                </Button>
                <Button variant="outline" onClick={onClose}>Закрыть</Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function TicketModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const TICKET_TYPES = [
    { id: 'adult', label: 'Взрослый', price: 400 },
    { id: 'student', label: 'Студент', price: 200 },
    { id: 'child', label: 'Ребёнок до 12 лет', price: 0 },
    { id: 'senior', label: 'Льготный', price: 150 },
  ];
  const [quantities, setQuantities] = useState<Record<string, number>>({ adult: 1, student: 0, child: 0, senior: 0 });
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState(false);

  const total = TICKET_TYPES.reduce((s, t) => s + t.price * (quantities[t.id] || 0), 0);
  const totalCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  const adjust = (id: string, delta: number) =>
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));

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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Билеты оформлены!</h3>
            <p className="text-muted-foreground mb-6">
              Подтверждение будет отправлено на вашу почту.
            </p>
            <Button variant="primary" onClick={handleClose}>Закрыть</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Купить билет</DialogTitle>
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
                      <button onClick={() => adjust(t.id, -1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                        <X className="w-3 h-3 rotate-45" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{quantities[t.id]}</span>
                      <button onClick={() => adjust(t.id, 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                        <span className="text-lg leading-none">+</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-semibold">Итого:</span>
                <span className="text-lg font-bold text-primary">{total} ₽</span>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">Отмена</Button>
              <Button
                variant="primary"
                onClick={() => { if (date && totalCount > 0) setSuccess(true); }}
                disabled={!date || totalCount === 0}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Оплатить
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Exhibitions() {
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [ticketOpen, setTicketOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', path: '/' },
          { label: 'Выставки' },
        ]}
      />

      <div className="mb-12">
        <h1 className="mb-4">Текущие выставки</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Познакомьтесь с разнообразными экспозициями, охватывающими различные эпохи и направления искусства
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exhibitions.map((exhibition, index) => (
          <div
            key={index}
            className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={exhibition.image}
                alt={exhibition.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="mb-3">{exhibition.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{exhibition.description}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    {exhibition.date}
                  </div>
                  <button
                    onClick={() => setSelectedExhibition(exhibition)}
                    className="inline-flex items-center text-primary hover:text-[var(--accent-hover)] transition-colors text-sm font-medium"
                  >
                    Подробнее
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExhibitionModal
        exhibition={selectedExhibition}
        onClose={() => setSelectedExhibition(null)}
        onBuyTicket={() => setTicketOpen(true)}
      />
      <TicketModal open={ticketOpen} onClose={() => setTicketOpen(false)} />
    </div>
  );
}
