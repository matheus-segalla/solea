import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SoleaSunIcon } from './icons/SoleaSunIcon';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    pixDiscountAmount,
    totalWithPix,
    freeShippingThreshold,
    remainingForFreeShipping,
    freeShippingProgress,
    isFreeShipping,
    shippingCep,
    setShippingCep,
    shippingOptions,
    selectedShipping,
    setSelectedShipping,
    isCalculatingShipping,
    calculateShipping,
    openCheckout
  } = useCart();

  const [inputCep, setInputCep] = useState(shippingCep);

  if (!isCartOpen) return null;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleCepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingCep(inputCep);
    calculateShipping(inputCep);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-solea-charcoal/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-solea-marfim shadow-solea-drawer border-l border-solea-border flex flex-col justify-between">
          
          {/* Header da Gaveta */}
          <div className="p-5 sm:p-6 border-b border-solea-border bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <SoleaSunIcon className="w-6 h-6 text-solea-champagne" />
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-solea-charcoal">
                  Sua Sacola Solea
                </h2>
                <p className="text-[11px] text-solea-charcoal/60 tracking-wider uppercase">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} joia(s) selecionada(s)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-solea-areia text-solea-charcoal hover:text-solea-terracota transition-colors"
              aria-label="Fechar sacola"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 1. Barra de Progresso Visual de Frete Grátis (Meta R$ 299) */}
          <div className="p-4 bg-solea-areia/60 border-b border-solea-border">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="flex items-center gap-1.5 font-medium text-solea-charcoal">
                <Truck className="w-4 h-4 text-solea-terracota" />
                {isFreeShipping ? (
                  <span className="text-solea-terracota font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Parabéns! Você ganhou Frete Grátis
                  </span>
                ) : (
                  <span>
                    Faltam <strong className="text-solea-terracota">{formatCurrency(remainingForFreeShipping)}</strong> para Frete Grátis
                  </span>
                )}
              </span>
              <span className="text-[11px] font-semibold text-solea-charcoal/70">
                Meta: {formatCurrency(freeShippingThreshold)}
              </span>
            </div>

            {/* Barra de Progresso com gradiente Terracota / Champagne */}
            <div className="w-full h-2.5 bg-solea-border rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-solea-terracota to-solea-champagne rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* 2. Lista de Itens com Controle de Quantidade e Remoção */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 divide-y divide-solea-border/60">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <SoleaSunIcon className="w-12 h-12 text-solea-champagne/60 mx-auto" />
                <h3 className="font-serif text-xl font-medium text-solea-charcoal">Sua sacola está vazia</h3>
                <p className="text-xs text-solea-charcoal/60 max-w-xs mx-auto">
                  Explore nossas coleções em Prata de Lei 925 e encante-se com designs atemporais.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-solea-terracota text-white rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-solea-terracota-dark transition-colors"
                >
                  Continuar Explorando
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="pt-4 first:pt-0 flex gap-4">
                  {/* Foto da Joia */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-solea-areia border border-solea-border flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Informações e Controles */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-base font-medium text-solea-charcoal leading-snug">
                            {item.product.name}
                          </h4>
                          {item.selectedSize && (
                            <span className="text-[11px] font-medium text-solea-charcoal/60 bg-solea-areia px-1.5 py-0.5 rounded">
                              Tamanho: {item.selectedSize}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="p-1 text-solea-charcoal/40 hover:text-solea-terracota transition-colors"
                          title="Remover joia"
                          aria-label="Remover joia"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="font-serif font-bold text-sm text-solea-terracota">
                          {formatCurrency(item.product.price * 0.95)}
                        </span>
                        <span className="text-[10px] text-solea-charcoal/50 line-through">
                          {formatCurrency(item.product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-solea-border rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="p-1.5 hover:bg-solea-areia text-solea-charcoal transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-solea-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="p-1.5 hover:bg-solea-areia text-solea-charcoal transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-medium text-solea-charcoal">
                        Subtotal: {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 3. Simulador de CEP e Opções de Frete */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-solea-border space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-solea-charcoal">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-solea-terracota" />
                  Simular Frete
                </span>
                <span className="text-[10px] text-solea-charcoal/60 lowercase">estimativa de entrega</span>
              </div>

              <form onSubmit={handleCepSubmit} className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="00000-000"
                  maxLength={9}
                  value={inputCep}
                  onChange={(e) => setInputCep(e.target.value)}
                  className="flex-1 min-h-[44px] px-3.5 py-2 bg-solea-areia/50 border border-solea-border rounded-xl text-xs text-solea-charcoal focus:outline-none focus:border-solea-terracota"
                />
                <button
                  type="submit"
                  disabled={isCalculatingShipping}
                  className="min-h-[44px] px-4 py-2 bg-solea-areia hover:bg-solea-terracota text-solea-charcoal hover:text-white rounded-xl text-xs font-semibold tracking-wider uppercase border border-solea-border transition-colors disabled:opacity-50 active:scale-95"
                >
                  {isCalculatingShipping ? '...' : 'Calcular'}
                </button>
              </form>

              {/* Opções de Frete (PAC, Jadlog, Sedex) */}
              {shippingOptions.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {shippingOptions.map((opt) => {
                    const isSelected = selectedShipping?.id === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedShipping(opt)}
                        className={`p-2 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'border-solea-terracota bg-solea-areia/40'
                            : 'border-solea-border/70 hover:border-solea-champagne'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="shipping"
                            checked={isSelected}
                            onChange={() => setSelectedShipping(opt)}
                            className="accent-solea-terracota"
                          />
                          <div>
                            <span className="font-semibold text-solea-charcoal">{opt.name}</span>
                            <span className="text-[10px] text-solea-charcoal/60 block">{opt.deadline}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          {opt.price === 0 ? (
                            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
                              Grátis
                            </span>
                          ) : (
                            <span className="font-bold text-solea-charcoal">
                              {formatCurrency(opt.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 4. Resumo Financeiro & Botão de Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-solea-marfim border-t border-solea-border space-y-3">
              <div className="space-y-1.5 text-xs text-solea-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex justify-between text-solea-terracota font-medium">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-solea-champagne" />
                    Desconto de 5% no Pix:
                  </span>
                  <span>- {formatCurrency(pixDiscountAmount)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Frete ({selectedShipping ? selectedShipping.carrier : 'selecione'}):</span>
                  <span>
                    {selectedShipping
                      ? selectedShipping.price === 0
                        ? <span className="text-emerald-700 font-bold">Grátis</span>
                        : formatCurrency(selectedShipping.price)
                      : 'A calcular'}
                  </span>
                </div>

                <div className="pt-2 border-t border-solea-border flex justify-between items-baseline text-solea-charcoal">
                  <div>
                    <span className="font-serif text-lg font-bold block">Total no Pix:</span>
                    <span className="text-[11px] text-solea-charcoal/60">
                      ou {formatCurrency(subtotal + (selectedShipping?.price || 0))} em até 6x sem juros
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-solea-terracota">
                    {formatCurrency(totalWithPix)}
                  </span>
                </div>
              </div>

              {/* Botão de Avançar ao Checkout */}
              <button
                onClick={openCheckout}
                className="w-full py-4 bg-solea-terracota hover:bg-solea-terracota-dark text-white rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-solea-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-solea-champagne" />
                <span>Ambiente 100% Seguro com Certificado SSL</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
