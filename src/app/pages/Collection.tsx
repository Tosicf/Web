import { Breadcrumbs } from '../components/Breadcrumbs';
import { Card } from '../components/Card';
import { useState } from 'react';

const categories = [
  'Все',
  'Живопись',
  'Скульптура',
  'Графика',
  'Прикладное искусство',
  'Археология'
];

export function Collection() {
  const [activeCategory, setActiveCategory] = useState('Все');

  const collections = [
    {
      title: 'Русская живопись XVIII-XIX вв.',
      description: 'Обширная коллекция произведений русских художников, включая работы Репина, Сурикова, Айвазовского.',
      image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&q=80',
      category: 'Живопись'
    },
    {
      title: 'Античная скульптура',
      description: 'Мраморные и бронзовые скульптуры Древней Греции и Рима. Копии и оригинальные произведения.',
      image: 'https://images.unsplash.com/photo-1551863397-eba0e56e6b97?w=800&q=80',
      category: 'Скульптура'
    },
    {
      title: 'Европейская графика',
      description: 'Рисунки и гравюры мастеров Возрождения и Барокко. Дюрер, Рембрандт, Пиранези.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      category: 'Графика'
    },
    {
      title: 'Русский фарфор',
      description: 'Изделия Императорского фарфорового завода XVIII-XX веков. Сервизы, вазы, статуэтки.',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      category: 'Прикладное искусство'
    },
    {
      title: 'Древнерусская иконопись',
      description: 'Иконы XIV-XVII веков из различных иконописных школ. Новгородская, московская, псковская традиции.',
      image: 'https://images.unsplash.com/photo-1582571570656-c7d5e0c25c69?w=800&q=80',
      category: 'Живопись'
    },
    {
      title: 'Археологическая коллекция',
      description: 'Находки с территории Восточной Европы от каменного века до средневековья.',
      image: 'https://images.unsplash.com/photo-1594998893017-36147cbdcb1e?w=800&q=80',
      category: 'Археология'
    }
  ];

  const filteredCollections = activeCategory === 'Все'
    ? collections
    : collections.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', path: '/' },
          { label: 'Постоянные экспозиции' }
        ]}
      />

      <div className="mb-12">
        <h1 className="mb-4">Постоянные экспозиции</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Наша постоянная коллекция включает более 50 000 экспонатов различных эпох и культур
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-lg transition-all ${
              activeCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-foreground hover:bg-muted border border-border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCollections.map((collection, index) => (
          <Card
            key={index}
            image={collection.image}
            title={collection.title}
            description={collection.description}
          />
        ))}
      </div>
    </div>
  );
}
