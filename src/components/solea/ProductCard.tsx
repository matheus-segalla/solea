import React from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import type { Product } from '../../data/mockProducts';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openQuickView, isFavorite, toggleFavorite } = useCart();
  const favorite = isFavorite(product.id);

  // Cálculos financeiros
  const pixPrice = product.price * 0.95;
  const installmentValue = product.price / product.installmentsCount;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-solea-border/80 hover:border-solea-champagne/80 hover:shadow-solea-card transition-all duration-300">
      
      {/* 1. Área de Imagem Editorial (aspect-[4/5] para elegância de joalheria) */}
      <div
        className="relative aspect-[4/5] w-full bg-solea-areia/40 overflow-hidden cursor-pointer"
        onClick={() => openQuickView(product)}
      >
        {/* Imagem Principal */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Imagem Secundária no Hover (desktop) */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} detalhe`}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out hidden sm:block"
          />
        )}

        {/* Badges Flutuantes Discretas no Topo Esquerdo */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider bg-solea-marfim/95 backdrop-blur-xs text-solea-charcoal border border-solea-border/90 shadow-2xs">
            Prata 925
          </span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider bg-solea-champagne/25 backdrop-blur-xs text-solea-terracota border border-solea-champagne/40 shadow-2xs">
            <Sparkles className="w-2.5 h-2.5 text-solea-terracota inline" />
            -5% no Pix
          </span>
        </div>

        {/* Botão de Favoritar (Área de toque mínima 44x44px garantida para o polegar) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 sm:bg-white/90 backdrop-blur-xs text-solea-charcoal hover:text-solea-terracota transition-all duration-200 z-10 active:scale-90 shadow-xs"
          title={favorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
          aria-label={favorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${favorite ? 'fill-solea-terracota text-solea-terracota' : ''}`} />
        </button>

        {/* Botão de "Espiar Joia" (Quick View) no Hover para Desktop */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-solea-marfim/95 hover:bg-white backdrop-blur-md text-solea-charcoal hover:text-solea-terracota text-xs font-semibold tracking-wider uppercase rounded-xl border border-solea-border/80 shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-solea-terracota" />
            <span>Espiar Joia</span>
          </button>
        </div>
      </div>

      {/* 2. Informações, Preços e Ações */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Categoria / Metal */}
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-solea-charcoal/60 font-semibold block">
            {product.category}
          </span>

          {/* Nome da Joia */}
          <h3
            onClick={() => openQuickView(product)}
            className="font-serif text-sm sm:text-lg font-medium text-solea-charcoal hover:text-solea-terracota cursor-pointer transition-colors mt-0.5 line-clamp-1 leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-solea-charcoal/60 line-clamp-1 mt-0.5 font-light hidden sm:block">
            {product.subtitle}
          </p>
        </div>

        {/* Bloco de Preço */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-solea-border/60">
          {product.originalPrice && (
            <span className="text-[10px] text-solea-charcoal/40 line-through block leading-none">
              {formatCurrency(product.originalPrice)}
            </span>
          )}

          {/* Preço à vista com 5% de desconto no Pix */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
            <span className="font-serif text-base sm:text-2xl font-bold text-solea-terracota leading-tight">
              {formatCurrency(pixPrice)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded w-fit">
              no Pix
            </span>
          </div>

          {/* Parcelamento Secundário Suave */}
          <p className="text-[10px] sm:text-[11px] text-solea-charcoal/60 mt-0.5 line-clamp-1 font-light">
            ou {product.installmentsCount}x de <span className="font-medium text-solea-charcoal/80">{formatCurrency(installmentValue)}</span>
          </p>

          {/* Botões Rápidos de Toque na Base do Card (Área mínima 44x44px) */}
          <div className="mt-2.5 sm:mt-3.5 flex gap-1.5 sm:gap-2">
            {/* Mobile: Botão "Ver Detalhes" */}
            <button
              onClick={() => openQuickView(product)}
              className="sm:hidden flex-1 min-h-[44px] py-2 px-2.5 bg-solea-areia/80 active:bg-solea-terracota text-solea-charcoal active:text-white rounded-xl text-[11px] font-semibold tracking-wider uppercase border border-solea-border transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-solea-terracota" />
              <span>Ver Peça</span>
            </button>

            {/* Ícone rápido de sacola (mobile: 44x44px, desktop: botão estendido) */}
            <button
              onClick={() => addToCart(product)}
              className="min-h-[44px] min-w-[44px] sm:flex-1 py-2 px-3 sm:px-4 bg-solea-terracota active:bg-solea-terracota-dark sm:bg-solea-areia/70 sm:hover:bg-solea-terracota text-white sm:text-solea-charcoal sm:hover:text-white rounded-xl text-xs font-semibold tracking-wider uppercase border border-solea-terracota sm:border-solea-border transition-all duration-300 flex items-center justify-center gap-1.5 group/btn active:scale-95 shadow-2xs"
              title="Adicionar à Sacola"
              aria-label={`Adicionar ${product.name} à sacola`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white sm:text-solea-terracota sm:group-hover/btn:text-white transition-colors" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
