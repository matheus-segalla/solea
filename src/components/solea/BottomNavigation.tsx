import React from 'react';
import { Home, Layers, Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface BottomNavigationProps {
  onHomeClick?: () => void;
  onFavoritesClick?: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onHomeClick,
  onFavoritesClick,
}) => {
  const { totalItems, setIsCartOpen, favorites, setIsMobileMenuOpen } = useCart();

  const handleHome = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-solea-border/90 pb-safe shadow-[0_-4px_20px_rgba(30,27,24,0.07)]"
      aria-label="Navegação inferior mobile"
    >
      <div className="grid grid-cols-5 items-center h-14">
        {/* 1. Início */}
        <button
          onClick={handleHome}
          className="flex flex-col items-center justify-center h-full text-solea-charcoal hover:text-solea-terracota active:scale-90 transition-all focus:outline-none"
          aria-label="Ir para a página inicial"
        >
          <Home className="w-5 h-5 text-solea-charcoal" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 text-solea-charcoal/80">
            Início
          </span>
        </button>

        {/* 2. Categorias (Abre Drawer Lateral) */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center h-full text-solea-charcoal hover:text-solea-terracota active:scale-90 transition-all focus:outline-none"
          aria-label="Abrir menu de categorias"
        >
          <Layers className="w-5 h-5 text-solea-charcoal" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 text-solea-charcoal/80">
            Categorias
          </span>
        </button>

        {/* 3. Favoritos */}
        <button
          onClick={onFavoritesClick}
          className="relative flex flex-col items-center justify-center h-full text-solea-charcoal hover:text-solea-terracota active:scale-90 transition-all focus:outline-none"
          aria-label="Ver produtos favoritos"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-solea-terracota text-solea-terracota' : 'text-solea-charcoal'}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-solea-terracota text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5 text-solea-charcoal/80">
            Favoritos
          </span>
        </button>

        {/* 4. WhatsApp */}
        <a
          href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20atendimento%20exclusivo%20sobre%20as%20joias%20Solea."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full text-solea-charcoal hover:text-emerald-700 active:scale-90 transition-all focus:outline-none"
          aria-label="Falar pelo WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-emerald-700" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5 text-emerald-800">
            WhatsApp
          </span>
        </a>

        {/* 5. Sacola */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center h-full text-solea-charcoal hover:text-solea-terracota active:scale-90 transition-all focus:outline-none"
          aria-label="Abrir sacola de compras"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-solea-terracota" />
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-solea-terracota text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {totalItems}
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5 text-solea-terracota font-bold">
            Sacola
          </span>
        </button>
      </div>
    </nav>
  );
};
