import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Lock, CreditCard, QrCode, Smartphone, Sparkles, Award, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SoleaSunIcon } from './icons/SoleaSunIcon';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cartItems,
    subtotal,
    pixDiscountAmount,
    selectedShipping,
    totalWithPix,
    clearCart
  } = useCart();

  const [activeTab, setActiveTab] = useState<'pix' | 'cartao' | 'mercadopago'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Dados simulados do formulário
  const [formData, setFormData] = useState({
    name: 'Sofia Albuquerque',
    email: 'sofia.albuquerque@email.com',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1578 - Apto 121',
    city: 'São Paulo - SP',
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'SOFIA ALBUQUERQUE',
    cardExpiry: '11/29',
    cardCvv: '789',
    installments: '6'
  });

  if (!isCheckoutOpen) return null;

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const finalTotalCard = subtotal + (selectedShipping ? selectedShipping.price : 0);
  const pixCopyCode = "00020126580014br.gov.bcb.pix0136solea-joias-financeiro@solea.com.br5204000053039865405" + totalWithPix.toFixed(2) + "5802BR5916SOLEA JOALHERIA6009SAO PAULO62070503***6304E8A2";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopyCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleFinishOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-solea-charcoal/65 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCheckout}
      />

      {/* Toast flutuante de confirmação de cópia do Pix */}
      {copiedPix && (
        <div className="fixed top-6 inset-x-4 sm:inset-x-auto sm:right-6 z-50 p-4 rounded-2xl bg-solea-charcoal text-white shadow-2xl border border-solea-champagne flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-solea-champagne">Código Pix Copiado!</h5>
            <p className="text-[11px] text-white/80">Cole no app do seu banco para concluir o pagamento.</p>
          </div>
        </div>
      )}

      <div className="relative w-full sm:max-w-4xl bg-solea-marfim rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-solea-border overflow-hidden z-10 max-h-[94vh] sm:max-h-[88vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Puxador visual para Mobile */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-white cursor-pointer" onClick={closeCheckout}>
          <div className="w-12 h-1.5 bg-solea-charcoal/25 rounded-full" />
        </div>

        {/* Header do Checkout */}
        <div className="p-4 sm:p-6 bg-white border-b border-solea-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SoleaSunIcon className="w-7 h-7 text-solea-champagne" />
            <div>
              <h2 className="font-serif text-2xl font-medium text-solea-charcoal">
                Finalizar Pedido Solea
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-solea-charcoal/70">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Checkout Criptografado de Alta Segurança</span>
              </div>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="p-2 rounded-full hover:bg-solea-areia text-solea-charcoal hover:text-solea-terracota transition-colors"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderPlaced ? (
          /* Tela de Confirmação de Pedido */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <Check className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-solea-terracota">
                Pedido Sol-84920 Confirmado
              </span>
              <h3 className="font-serif text-3xl font-medium text-solea-charcoal">
                Agradecemos a sua preferência pela Solea
              </h3>
              <p className="text-sm text-solea-charcoal/70 max-w-md mx-auto">
                Sua joia em Prata de Lei 925 está sendo preparada com embalagem presenteável e certificado de autenticidade vitalícia.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-solea-border max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-solea-charcoal/60">Destinatário:</span>
                <span className="font-semibold text-solea-charcoal">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-solea-charcoal/60">Endereço de Entrega:</span>
                <span className="font-medium text-solea-charcoal">{formData.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-solea-charcoal/60">Método de Envio:</span>
                <span className="font-medium text-solea-charcoal">{selectedShipping ? selectedShipping.name : 'PAC'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-solea-border text-sm">
                <span className="font-bold text-solea-charcoal">Valor Total:</span>
                <span className="font-bold text-solea-terracota">
                  {activeTab === 'pix' ? formatCurrency(totalWithPix) : formatCurrency(finalTotalCard)}
                </span>
              </div>
            </div>

            <button
              onClick={closeCheckout}
              className="px-8 py-3.5 bg-solea-terracota text-white rounded-full text-xs font-semibold tracking-[0.2em] uppercase hover:bg-solea-terracota-dark transition-colors"
            >
              Voltar à Loja
            </button>
          </div>
        ) : (
          /* Formulário de Pagamento e Abas */
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-solea-border max-h-[82vh] overflow-y-auto">
            
            {/* Coluna Esquerda: Abas de Pagamento e Formulários */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Abas Solicitadas: Pix dinâmico, Cartão de Crédito e Mercado Pago */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-solea-charcoal">
                  Forma de Pagamento
                </label>

                <div className="grid grid-cols-3 gap-2 p-1.5 bg-solea-areia/80 rounded-2xl border border-solea-border">
                  {/* Aba Pix */}
                  <button
                    onClick={() => setActiveTab('pix')}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                      activeTab === 'pix'
                        ? 'bg-white text-solea-terracota shadow-sm border border-solea-terracota/20'
                        : 'text-solea-charcoal/70 hover:text-solea-charcoal'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-solea-champagne" />
                    <span>Pix (5% OFF)</span>
                  </button>

                  {/* Aba Cartão de Crédito */}
                  <button
                    onClick={() => setActiveTab('cartao')}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                      activeTab === 'cartao'
                        ? 'bg-white text-solea-terracota shadow-sm border border-solea-terracota/20'
                        : 'text-solea-charcoal/70 hover:text-solea-charcoal'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-solea-champagne" />
                    <span>Cartão 6x</span>
                  </button>

                  {/* Aba Mercado Pago */}
                  <button
                    onClick={() => setActiveTab('mercadopago')}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                      activeTab === 'mercadopago'
                        ? 'bg-white text-solea-terracota shadow-sm border border-solea-terracota/20'
                        : 'text-solea-charcoal/70 hover:text-solea-charcoal'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-sky-600" />
                    <span>Mercado Pago</span>
                  </button>
                </div>
              </div>

              {/* Conteúdo da Aba Pix Dinâmico */}
              {activeTab === 'pix' && (
                <div className="p-5 rounded-2xl bg-white border border-solea-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-solea-champagne" />
                      <span className="text-xs font-bold uppercase tracking-wider text-solea-terracota">
                        Aprovação Instantânea com 5% de Desconto
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      Economize {formatCurrency(pixDiscountAmount)}
                    </span>
                  </div>

                  {/* Simulação de QR Code Dinâmico com Visual Nobre */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-solea-areia/40 border border-solea-border">
                    {/* QR Code SVG Vetorial estilizado */}
                    <div className="w-36 h-36 bg-white p-2.5 rounded-xl border border-solea-border shadow-sm flex-shrink-0 flex items-center justify-center relative">
                      <svg className="w-full h-full text-solea-charcoal" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                        <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                        <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                        <rect x="38" y="10" width="8" height="8" />
                        <rect x="52" y="14" width="8" height="18" />
                        <rect x="38" y="38" width="24" height="24" rx="4" fill="#7B4321" />
                        <rect x="15" y="45" width="12" height="12" />
                        <rect x="70" y="45" width="20" height="8" />
                        <rect x="45" y="70" width="10" height="25" />
                        <rect x="65" y="75" width="25" height="15" />
                      </svg>
                      {/* Centro com Ícone Solar Solea */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-solea-champagne">
                          <SoleaSunIcon className="w-5 h-5 text-solea-champagne" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <p className="text-xs text-solea-charcoal/80 leading-relaxed">
                        Abra o app do seu banco, escolha <strong>Pix &gt; Ler QR Code</strong> ou utilize o código Copia e Cola abaixo.
                      </p>
                      <div className="text-[11px] text-solea-charcoal/60">
                        Tempo de expiração: <span className="font-semibold text-solea-terracota">14:59 minutos</span>
                      </div>
                    </div>
                  </div>

                  {/* Botão Copia e Cola */}
                  {/* Botão Copia e Cola Otimizado para Mobile Thumb Zone */}
                  <div className="space-y-2 pt-1">
                    <label className="text-[11px] uppercase font-bold text-solea-charcoal/80 tracking-wider">
                      Código Pix Copia e Cola:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixCopyCode}
                        className="flex-1 min-h-[44px] px-3.5 py-2.5 bg-solea-areia/40 border border-solea-border rounded-xl text-xs text-solea-charcoal font-mono truncate select-all"
                      />
                      <button
                        onClick={handleCopyPix}
                        className="min-h-[48px] px-6 py-3 bg-solea-terracota hover:bg-solea-terracota-dark active:bg-solea-terracota-dark text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md flex-shrink-0"
                      >
                        {copiedPix ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Código Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-solea-champagne" />
                            <span>Copiar Código Pix</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo da Aba Cartão de Crédito */}
              {activeTab === 'cartao' && (
                <div className="p-5 rounded-2xl bg-white border border-solea-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-solea-charcoal">
                      Dados do Cartão de Crédito
                    </span>
                    <span className="text-[11px] text-solea-charcoal/60">Até 6x sem juros</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-solea-charcoal/70 mb-1">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-solea-areia/30 border border-solea-border rounded-xl focus:outline-none focus:border-solea-terracota text-solea-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-solea-charcoal/70 mb-1">
                        Nome Impresso no Cartão
                      </label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-solea-areia/30 border border-solea-border rounded-xl focus:outline-none focus:border-solea-terracota text-solea-charcoal uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-solea-charcoal/70 mb-1">
                          Validade (MM/AA)
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full min-h-[44px] px-3.5 py-2.5 bg-solea-areia/30 border border-solea-border rounded-xl focus:outline-none focus:border-solea-terracota text-solea-charcoal"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-semibold text-solea-charcoal/70 mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          inputMode="numeric"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                          className="w-full min-h-[44px] px-3.5 py-2.5 bg-solea-areia/30 border border-solea-border rounded-xl focus:outline-none focus:border-solea-terracota text-solea-charcoal"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-semibold text-solea-charcoal/70 mb-1">
                        Parcelamento
                      </label>
                      <select
                        value={formData.installments}
                        onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-solea-areia/30 border border-solea-border rounded-xl focus:outline-none focus:border-solea-terracota text-solea-charcoal"
                      >
                        <option value="1">1x de {formatCurrency(finalTotalCard)} (à vista)</option>
                        <option value="2">2x de {formatCurrency(finalTotalCard / 2)} sem juros</option>
                        <option value="3">3x de {formatCurrency(finalTotalCard / 3)} sem juros</option>
                        <option value="4">4x de {formatCurrency(finalTotalCard / 4)} sem juros</option>
                        <option value="5">5x de {formatCurrency(finalTotalCard / 5)} sem juros</option>
                        <option value="6">6x de {formatCurrency(finalTotalCard / 6)} sem juros</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Conteúdo da Aba Mercado Pago */}
              {activeTab === 'mercadopago' && (
                <div className="p-5 rounded-2xl bg-white border border-solea-border space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
                    <span className="text-xs font-bold uppercase tracking-wider text-solea-charcoal">
                      Checkout Integrado Mercado Pago
                    </span>
                  </div>
                  <p className="text-xs text-solea-charcoal/75 leading-relaxed">
                    Você poderá pagar com saldo em conta Mercado Pago, parcelamento no boleto Mercado Crédito ou até 2 cartões de crédito simultâneos.
                  </p>
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-[11px] text-sky-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Transação 100% garantida pela plataforma oficial Mercado Pago.</span>
                  </div>
                </div>
              )}

              {/* Botão de Finalização da Compra */}
              <button
                onClick={handleFinishOrder}
                className="w-full py-4 bg-solea-terracota hover:bg-solea-terracota-dark text-white rounded-2xl text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>
                  Confirmar e Pagar{' '}
                  {activeTab === 'pix' ? formatCurrency(totalWithPix) : formatCurrency(finalTotalCard)}
                </span>
              </button>

            </div>

            {/* Coluna Direita: Resumo do Pedido, Itens e Selos de Segurança */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-solea-areia/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-medium text-solea-charcoal">
                  Resumo do Pedido ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})
                </h3>

                {/* Lista compacta de joias */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1 divide-y divide-solea-border/60">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-solea-border bg-white"
                      />
                      <div className="flex-1 text-xs">
                        <h4 className="font-serif font-medium text-solea-charcoal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-solea-charcoal/60">
                          Qtd: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-solea-charcoal">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotais */}
                <div className="p-4 rounded-xl bg-white border border-solea-border space-y-2 text-xs">
                  <div className="flex justify-between text-solea-charcoal/70">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>

                  {activeTab === 'pix' && (
                    <div className="flex justify-between text-solea-terracota font-medium">
                      <span>Desconto Pix (5%):</span>
                      <span>- {formatCurrency(pixDiscountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-solea-charcoal/70">
                    <span>Frete:</span>
                    <span>
                      {selectedShipping
                        ? selectedShipping.price === 0
                          ? <strong className="text-emerald-700">Grátis</strong>
                          : formatCurrency(selectedShipping.price)
                        : 'Grátis'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-solea-border flex justify-between items-baseline text-sm font-bold text-solea-charcoal">
                    <span>Total a pagar:</span>
                    <span className="font-serif text-xl text-solea-terracota">
                      {activeTab === 'pix' ? formatCurrency(totalWithPix) : formatCurrency(finalTotalCard)}
                    </span>
                  </div>
                </div>

                {/* Selos de Segurança e Garantia de Entrega Solicitados */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-solea-terracota block">
                    Garantias Oficiais Solea
                  </span>

                  <div className="space-y-2 text-xs text-solea-charcoal/80">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-solea-border">
                      <Award className="w-4 h-4 text-solea-champagne flex-shrink-0" />
                      <div>
                        <strong className="block text-solea-charcoal text-[11px]">Prata de Lei 925 Certificada</strong>
                        <span className="text-[10px] text-solea-charcoal/60">Garantia vitalícia na composição do metal</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-solea-border">
                      <Truck className="w-4 h-4 text-solea-champagne flex-shrink-0" />
                      <div>
                        <strong className="block text-solea-charcoal text-[11px]">Garantia de Entrega com Seguro</strong>
                        <span className="text-[10px] text-solea-charcoal/60">Rastreamento minuto a minuto com seguro total</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-solea-border">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div>
                        <strong className="block text-solea-charcoal text-[11px]">Compra Segura & Sigilo</strong>
                        <span className="text-[10px] text-solea-charcoal/60">Dados protegidos por criptografia de ponta a ponta</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Rodapé editorial */}
              <div className="text-center pt-2 text-[10px] text-solea-charcoal/50">
                Solea Atelier • Joias em Prata 925 • CNPJ 48.912.403/0001-82
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
