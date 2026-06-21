import { ReactNode } from 'react';
import { Link } from 'react-router';

interface CardProps {
  image?: string;
  title: string;
  description: string;
  link?: string;
  onDetailClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export function Card({ image, title, description, link, onDetailClick, className = '', children }: CardProps) {
  return (
    <div className={`bg-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        {children}
        {link && !onDetailClick && (
          <Link
            to={link}
            className="inline-flex items-center text-primary hover:text-[var(--accent-hover)] transition-colors"
          >
            Подробнее
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
        {onDetailClick && (
          <button
            onClick={onDetailClick}
            className="inline-flex items-center text-primary hover:text-[var(--accent-hover)] transition-colors"
          >
            Подробнее
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
