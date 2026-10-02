import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, MessageCircle, ShieldCheck, RefreshCw, Gem, ChevronRight } from 'lucide-react';
import { SoleaSunIcon } from './icons/SoleaSunIcon';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  onSearchChange?: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory = 'todos',
  onSelectCategory,
  onSearchChange,
}) => {
  const { totalItems, setIsCartOpen, favorites, isMobileMenuOpen, setIsMobileMenuOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'todos', label: 'Todas as Joias', icon: null },
    { id: 'aneis', label: 'Anéis', icon: <Gem className="w-4 h-4 text-solea-champagne" /> },
    { id: 'colares', label: 'Colares', icon: null },
    { id: 'brincos', label: 'Brincos', icon: null },
    { id: 'pulseiras', label: 'Pulseiras', icon: null },
    { id: 'solar', label: 'Coleção Solar', icon: <Sparkles className="w-4 h-4 text-solea-champagne" /> },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  };

  const handleSearchInput = (val: string) => {
    setSearchTerm(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-solea-marfim/95 backdrop-blur-md border-b border-solea-border transition-all duration-300">
        {/* 1. Top Banner */}
        <div className="bg-solea-charcoal text-solea-areia py-1.5 px-3 sm:px-4 text-[10px] sm:text-xs tracking-wider uppercase">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden md:flex items-center space-x-2 text-solea-champagne">
              <SoleaSunIcon className="w-3.5 h-3.5 text-solea-champagne" />
              <span className="font-medium tracking-widest text-[11px]">Prata de Lei 925 • Garantia Vitalícia</span>
            </div>

            <div className="mx-auto md:mx-0 text-center font-medium text-[10px] sm:text-xs tracking-widest flex items-center gap-1.5 sm:gap-2">
              <span>✨ Frete Grátis &gt; R$ 299</span>
              <span className="text-solea-champagne">•</span>
              <span className="text-solea-champagne font-semibold">5% OFF no Pix</span>
              <span className="hidden sm:inline text-solea-areia/80">• até 6x s/ juros</span>
            </div>

            <div className="hidden lg:flex items-center space-x-3 text-[11px] text-solea-areia/80 tracking-wider">
              <span>Atendimento Exclusivo</span>
            </div>
          </div>
        </div>

        {/* 2. Main Header Compacto Mobile-First (h-14 no mobile, h-20 em desktop) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20">
            
            {/* Lado Esquerdo Mobile: Botão Hambúrguer (Área de toque mínima 44x44px) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-11 h-11 flex items-center justify-center -ml-2 text-solea-charcoal hover:text-solea-terracota active:scale-95 transition-all focus:outline-none"
                aria-label="Abrir menu de navegação lateral"
              >
                <Menu className="w-6 h-6" />
              </button>

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-11 h-11 flex items-center justify-center text-solea-charcoal hover:text-solea-terracota active:scale-95 transition-all focus:outline-none"
                aria-label="Buscar joia"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Search bar desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar anéis, colares, prata 925..."
                  value={searchTerm}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-solea-areia/60 border border-solea-border/80 rounded-full text-xs text-solea-charcoal placeholder-solea-charcoal/50 focus:outline-none focus:border-solea-terracota focus:bg-white transition-all duration-200"
                />
                <Search className="w-4 h-4 text-solea-charcoal/50 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchTerm && (
                  <button
                    onClick={() => handleSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-solea-charcoal/40 hover:text-solea-terracota"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Logo Tipográfico Solea Centralizado */}
            <div className="flex-1 flex justify-center text-center">
              <a href="#" className="group inline-flex items-center gap-1.5 sm:gap-2.5 transition-transform duration-300">
                <SoleaSunIcon className="w-6 h-6 sm:w-8 sm:h-8 text-solea-champagne group-hover:text-solea-terracota transition-colors duration-500" />
                <div className="flex flex-col text-left">
                  <span className="font-serif text-2xl sm:text-4xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-solea-charcoal font-medium leading-none">
                    SOLEA
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-solea-terracota font-medium mt-0.5 sm:mt-1 hidden sm:block">
                    Alta Joalheria • 925
                  </span>
                </div>
              </a>
            </div>

            {/* Ações (Favoritos e Sacola com área de toque >= 44x44px) */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-3 flex-1 lg:max-w-xs">
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('favoritos');
                }}
                className="relative w-11 h-11 flex items-center justify-center text-solea-charcoal hover:text-solea-terracota transition-colors group active:scale-95"
                title="Joias Favoritas"
                aria-label="Ver joias favoritas"
              >
                <Heart className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${favorites.length > 0 ? 'text-solea-terracota fill-solea-terracota/20' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-solea-areia text-solea-terracota border border-solea-border text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Botão da Sacola Lateral */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative min-w-[44px] h-11 px-2.5 sm:px-4 flex items-center justify-center gap-2 bg-solea-areia/80 hover:bg-solea-terracota text-solea-charcoal hover:text-white rounded-full transition-all duration-300 border border-solea-border group shadow-xs active:scale-95"
                aria-label="Abrir sacola de compras"
              >
                <ShoppingBag className="w-4 h-4 text-solea-terracota group-hover:text-white transition-colors" />
                <span className="hidden sm:inline text-xs font-medium tracking-wider uppercase">
                  Sacola
                </span>
                <span className="w-5 h-5 bg-solea-terracota text-white group-hover:bg-solea-champagne group-hover:text-solea-charcoal text-[10px] sm:text-[11px] font-bold rounded-full flex items-center justify-center transition-colors">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Input expandido */}
          {isSearchOpen && (
            <div className="lg:hidden pb-3 pt-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar anéis, brincos, prata 925..."
                  value={searchTerm}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-8 py-2.5 bg-solea-areia border border-solea-border rounded-xl text-xs text-solea-charcoal focus:outline-none focus:border-solea-terracota"
                />
                <Search className="w-4 h-4 text-solea-charcoal/50 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => handleSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-solea-charcoal/60"
                  >
                    ✕
                  </button>
                )}
              </form>
            </div>
          )}

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center justify-center space-x-10 py-3 border-t border-solea-border/60">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isSolar = cat.id === 'solar';

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className={`group relative text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-solea-terracota font-semibold'
                      : 'text-solea-charcoal/80 hover:text-solea-terracota'
                  } ${isSolar ? 'text-solea-terracota flex items-center gap-1.5' : ''}`}
                >
                  {isSolar && <Sparkles className="w-3.5 h-3.5 text-solea-champagne inline" />}
                  {cat.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-solea-terracota transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 3. Menu Lateral Off-Canvas (Drawer fluido pela esquerda) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-solea-charcoal/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-[85vw] max-w-sm bg-solea-marfim shadow-2xl flex flex-col justify-between border-r border-solea-border">
              
              {/* Top Drawer */}
              <div>
                <div className="p-4 border-b border-solea-border flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <SoleaSunIcon className="w-6 h-6 text-solea-champagne" />
                    <div>
                      <span className="font-serif text-xl tracking-[0.2em] uppercase font-medium text-solea-charcoal">
                        SOLEA
                      </span>
                      <p className="text-[9px] uppercase tracking-widest text-solea-terracota font-semibold">
                        Atelier de Prata 925
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-11 h-11 flex items-center justify-center rounded-full text-solea-charcoal hover:text-solea-terracota hover:bg-solea-areia/50 transition-colors"
                    aria-label="Fechar menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categorias bem espaçadas */}
                <div className="p-4 space-y-1.5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-solea-terracota font-bold px-3 py-2">
                    Coleções & Joias
                  </p>

                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          if (onSelectCategory) onSelectCategory(cat.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full min-h-[48px] px-3.5 py-3 rounded-xl text-left text-xs uppercase tracking-wider font-semibold flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-solea-terracota text-white shadow-xs'
                            : 'text-solea-charcoal hover:bg-solea-areia/70'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {cat.icon}
                          {cat.label}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-solea-charcoal/40'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seção Inferior do Drawer: WhatsApp e Políticas */}
              <div className="p-4 border-t border-solea-border bg-white space-y-3">
                {/* Link direto para WhatsApp */}
                <a
                  href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20atendimento%20exclusivo%20sobre%20as%20joias%20Solea."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Atendimento WhatsApp VIP</span>
                </a>

                {/* Políticas & Selos */}
                <div className="pt-2 border-t border-solea-border/60 space-y-2 text-[11px] text-solea-charcoal/75">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-solea-champagne flex-shrink-0" />
                    <span>Prata de Lei 925 com garantia vitalícia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-solea-champagne flex-shrink-0" />
                    <span>Troca fácil em até 30 dias sem custos</span>
                  </div>
                </div>

                <div className="text-center pt-2 text-[10px] text-solea-charcoal/50">
                  Solea Joalheria • CNPJ 48.912.403/0001-82
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
