import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Ruler, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SoleaSunIcon } from './icons/SoleaSunIcon';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, openCheckout } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      if (quickViewProduct.availableSizes && quickViewProduct.availableSizes.length > 0) {
        setSelectedSize(quickViewProduct.availableSizes[0]);
      } else {
        setSelectedSize('');
      }
    }
  }, [quickViewProduct]);

  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeQuickView]);

  if (!quickViewProduct) return null;

  const pixPrice = quickViewProduct.price * 0.95;
  const installmentValue = quickViewProduct.price / quickViewProduct.installmentsCount;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      closeQuickView();
    }, 600);
  };

  const handleBuyWithOneClickPix = () => {
    addToCart(quickViewProduct, selectedSize);
    closeQuickView();
    openCheckout();
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % quickViewProduct.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + quickViewProduct.images.length) % quickViewProduct.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-solea-charcoal/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeQuickView}
      />

      {/* Container Adaptativo: Bottom Sheet no mobile / Modal clássico no Desktop */}
      <div className="relative w-full sm:max-w-4xl bg-solea-marfim rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-solea-border overflow-hidden z-10 max-h-[92vh] sm:max-h-[88vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Puxador Visual Superior no Mobile (Drag Handle Indicator) */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-white cursor-pointer" onClick={closeQuickView}>
          <div className="w-12 h-1.5 bg-solea-charcoal/25 rounded-full" />
        </div>

        {/* Header do Bottom Sheet com Botão Fechar (Área >= 44x44px) */}
        <div className="flex items-center justify-between px-4 py-2 sm:hidden bg-white border-b border-solea-border">
          <span className="text-[10px] uppercase tracking-[0.2em] text-solea-terracota font-bold">
            Detalhes da Joia
          </span>
          <button
            onClick={closeQuickView}
            className="w-11 h-11 flex items-center justify-center -mr-2 text-solea-charcoal hover:text-solea-terracota"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Botão Fechar Desktop */}
        <button
          onClick={closeQuickView}
          className="hidden sm:flex absolute top-4 right-4 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/80 hover:bg-white text-solea-charcoal hover:text-solea-terracota transition-colors shadow-sm"
          aria-label="Fechar espiar joia"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Corpo com Scroll interno */}
        <div className="overflow-y-auto flex-1 pb-24 sm:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* 1. Carrossel de Fotos com Controles Touch e Dots no Mobile */}
            <div className="p-4 sm:p-8 bg-solea-areia/40 flex flex-col justify-between border-b md:border-b-0 md:border-r border-solea-border">
              {/* Foto Principal */}
              <div className="relative aspect-[4/5] sm:aspect-square rounded-2xl overflow-hidden bg-white border border-solea-border shadow-xs group">
                <img
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Badge Prata de Lei */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-solea-marfim/95 backdrop-blur-xs text-solea-terracota border border-solea-border text-[10px] font-bold tracking-widest uppercase rounded-full shadow-2xs">
                    Prata de Lei 925
                  </span>
                </div>

                {/* Setas de navegação do carrossel */}
                {quickViewProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-solea-charcoal flex items-center justify-center shadow-xs active:scale-90"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-solea-charcoal flex items-center justify-center shadow-xs active:scale-90"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Bolinhas de paginação (Pagination Dots) */}
                {quickViewProduct.images.length > 1 && (
                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
                    {quickViewProduct.images.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setSelectedImageIndex(dotIdx)}
                        className={`h-2 rounded-full transition-all ${
                          selectedImageIndex === dotIdx
                            ? 'w-6 bg-solea-terracota'
                            : 'w-2 bg-white/80'
                        }`}
                        aria-label={`Ver foto ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails em Desktop */}
              {quickViewProduct.images.length > 1 && (
                <div className="hidden sm:flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-solea-terracota shadow-md ring-2 ring-solea-champagne/40'
                          : 'border-solea-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Informações, Seletor com Toque Amplo e Detalhes Técnicos */}
            <div className="p-4 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                
                {/* Categoria e ID */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-solea-terracota">
                    {quickViewProduct.category}
                  </span>
                  <span className="text-solea-border">•</span>
                  <span className="text-[10px] uppercase tracking-wider text-solea-charcoal/60">
                    Ref: {quickViewProduct.id}
                  </span>
                </div>

                {/* Título e Subtítulo */}
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-solea-charcoal font-medium leading-tight">
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-xs text-solea-charcoal/70 mt-1 font-light">
                    {quickViewProduct.subtitle}
                  </p>
                </div>

                {/* Bloco de Preços */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-solea-border">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-solea-terracota">
                      {formatCurrency(pixPrice)}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      5% OFF no Pix à vista
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-solea-charcoal/70 mt-1">
                    <span>Original: <span className="line-through">{formatCurrency(quickViewProduct.price)}</span></span>
                    <span>ou <strong>{quickViewProduct.installmentsCount}x</strong> de <strong>{formatCurrency(installmentValue)}</strong></span>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-xs sm:text-sm text-solea-charcoal/80 leading-relaxed font-light">
                  {quickViewProduct.description}
                </p>

                {/* Seletor de Aro/Tamanho com Botões de Toque Generosos (Área mínima 44x44px) */}
                {quickViewProduct.availableSizes && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-solea-charcoal flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-solea-terracota" />
                        <span>{quickViewProduct.sizeType === 'aro' ? 'Selecione o Aro:' : 'Selecione o Tamanho:'}</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => alert("Dica Solea: Meça o diâmetro interno de um anel que você já possui ou passe uma fita em volta do dedo.")}
                        className="text-[11px] text-solea-terracota underline font-medium hover:text-solea-terracota-dark"
                      >
                        Descubra seu tamanho
                      </button>
                    </div>

                    {/* Botões Generosos para Thumb Zone */}
                    <div className="flex flex-wrap gap-2.5">
                      {quickViewProduct.availableSizes.map((size) => {
                        const isSelected = selectedSize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-[48px] min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all border active:scale-95 flex items-center justify-center ${
                              isSelected
                                ? 'bg-solea-terracota text-white border-solea-terracota shadow-sm ring-2 ring-solea-champagne/40'
                                : 'bg-white text-solea-charcoal border-solea-border hover:border-solea-terracota hover:bg-solea-areia/40'
                            }`}
                            aria-pressed={isSelected}
                          >
                            {quickViewProduct.sizeType === 'aro' ? `Aro ${size}` : size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Detalhes Técnicos da Peça */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-solea-areia/60 border border-solea-border/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-solea-terracota font-semibold">
                    <SoleaSunIcon className="w-4 h-4 text-solea-champagne" />
                    <span className="tracking-wider uppercase text-[11px]">Especificações de Alta Joalheria</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-solea-charcoal/80 pt-1">
                    <div>
                      <span className="text-solea-charcoal/50 block text-[9px] uppercase font-bold">Metal:</span>
                      <span className="text-[11px] font-medium">{quickViewProduct.details.material}</span>
                    </div>
                    <div>
                      <span className="text-solea-charcoal/50 block text-[9px] uppercase font-bold">Garantia:</span>
                      <span className="text-[11px] font-medium">{quickViewProduct.details.guarantee}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Botões de Ação em Desktop */}
              <div className="hidden sm:flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddedFeedback}
                  className="flex-1 py-4 bg-solea-terracota hover:bg-solea-terracota-dark text-white rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 active:scale-95"
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Adicionado à Sacola!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-solea-champagne" />
                      <span>Adicionar à Sacola</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyWithOneClickPix}
                  className="px-6 py-4 bg-solea-charcoal hover:bg-black text-white rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Zap className="w-4 h-4 text-solea-champagne" />
                  <span>Comprar no Pix</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 5. Botão Flutuante Fixo de Compra Mobile (Sticky Add-to-Cart na Base do Bottom Sheet) */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 p-3 bg-white/98 backdrop-blur-md border-t border-solea-border flex items-center gap-2.5 z-20 pb-safe shadow-lg">
          <div className="flex-1">
            <span className="text-[10px] text-solea-charcoal/60 uppercase block">Total à vista</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-lg font-bold text-solea-terracota">
                {formatCurrency(pixPrice)}
              </span>
              <span className="text-[9px] text-emerald-700 font-bold">no Pix</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAddedFeedback}
            className="min-h-[48px] px-5 py-3 bg-solea-terracota active:bg-solea-terracota-dark text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
          >
            {isAddedFeedback ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-solea-champagne" />
                <span>Adicionar</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyWithOneClickPix}
            className="min-h-[48px] px-4 py-3 bg-solea-charcoal active:bg-black text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 active:scale-95"
            title="Comprar com 1 Clique no Pix"
          >
            <Zap className="w-3.5 h-3.5 text-solea-champagne" />
            <span>Pix 1-Clique</span>
          </button>
        </div>

      </div>
    </div>
  );
};
