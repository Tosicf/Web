import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-white mb-4">О музее</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Музей истории и искусств — культурное пространство, где встречаются прошлое и настоящее через призму искусства.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/exhibitions" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Выставки
                </Link>
              </li>
              <li>
                <Link to="/collection" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Постоянные экспозиции
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Новости
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Правила посещения
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-gray-300">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>г. Москва, ул. Культурная, д. 15</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>info@museum.ru</span>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="text-white mb-4">Часы работы</h4>
            <p className="text-gray-300 text-sm mb-4">
              Вт–Вс: 10:00 – 20:00<br />
              Пн: выходной
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/museum"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/museum"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/museum"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Музей истории и искусств. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
