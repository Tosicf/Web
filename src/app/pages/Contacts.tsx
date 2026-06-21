import { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Input, Textarea } from '../components/Input';
import { Button } from '../components/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Главная', path: '/' },
          { label: 'Контакты' }
        ]}
      />

      <div className="mb-12">
        <h1 className="mb-4">Контакты</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Свяжитесь с нами любым удобным способом
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="mb-6">Контактная информация</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">Адрес</h4>
                <p className="text-muted-foreground">
                  г. Москва, ул. Культурная, д. 15<br />
                  метро «Парк культуры»
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">Телефон</h4>
                <p className="text-muted-foreground">
                  +7 (495) 123-45-67<br />
                  +7 (495) 123-45-68 (экскурсии)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">Email</h4>
                <p className="text-muted-foreground">
                  info@museum.ru<br />
                  press@museum.ru (пресс-служба)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="mb-1">Часы работы</h4>
                <p className="text-muted-foreground">
                  Вторник – Воскресенье: 10:00 – 20:00<br />
                  Понедельник: выходной<br />
                  Касса закрывается в 19:30
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-md">
            <div className="bg-muted h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Карта расположения</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="mb-6">Форма обратной связи</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Имя *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Введите ваше имя"
            />

            <Input
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@mail.com"
            />

            <Input
              label="Тема сообщения *"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="О чём вы хотите узнать?"
            />

            <Textarea
              label="Сообщение *"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Напишите ваше сообщение..."
              rows={6}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
            >
              Отправить сообщение
            </Button>

            <p className="text-sm text-muted-foreground">
              * Обязательные поля
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
