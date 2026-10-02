import React from 'react';
import { Sparkles, Flame, Gem } from 'lucide-react';
import { SoleaSunIcon } from './icons/SoleaSunIcon';

interface CategoryPillsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const pills = [
    { id: 'todos', label: 'Todas as Joias', icon: null },
    { id: 'aneis', label: 'Anéis', icon: <Gem className="w-3.5 h-3.5" /> },
    { id: 'colares', label: 'Colares', icon: null },
    { id: 'brincos', label: 'Brincos', icon: null },
    { id: 'pulseiras', label: 'Pulseiras', icon: null },
    { id: 'solar', label: 'Coleção Solar', icon: <SoleaSunIcon className="w-3.5 h-3.5 text-solea-champagne" /> },
    { id: 'mais-vendidos', label: 'Mais Vendidos', icon: <Flame className="w-3.5 h-3.5 text-amber-500" /> },
  ];

  return (
    <div className="w-full bg-solea-marfim border-b border-solea-border/80 sticky top-14 sm:top-20 z-30 backdrop-blur-md bg-solea-marfim/95 py-2.5">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {pills.map((pill) => {
            const isActive = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => onSelectCategory(pill.id)}
                className={`flex-shrink-0 min-h-[44px] px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 active:scale-95 border ${
                  isActive
                    ? 'bg-solea-terracota text-white border-solea-terracota shadow-sm'
                    : 'bg-white text-solea-charcoal border-solea-border hover:border-solea-champagne hover:bg-solea-areia/50'
                }`}
                style={{ minHeight: '44px' }}
                aria-pressed={isActive}
              >
                {pill.icon}
                <span>{pill.label}</span>
                {pill.id === 'solar' && !isActive && (
                  <Sparkles className="w-3 h-3 text-solea-terracota inline ml-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
