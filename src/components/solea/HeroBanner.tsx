import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Gem, Clock } from 'lucide-react';
import { SoleaSunIcon } from './icons/SoleaSunIcon';

interface HeroBannerProps {
  onExploreClick?: () => void;
  onSolarCollectionClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onSolarCollectionClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-solea-marfim border-b border-solea-border">
      {/* Background Decorativo Sutil de Alta Joalheria */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-solea-champagne/15 blur-3xl" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 rounded-full bg-solea-areia/80 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Lado Esquerdo - Editorial de Joalheria */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Tagline de Lançamento */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-solea-areia border border-solea-border text-solea-terracota text-xs tracking-[0.2em] uppercase font-semibold mx-auto lg:mx-0">
              <SoleaSunIcon className="w-4 h-4 text-solea-champagne" />
              <span>Coleção Solar • Prata de Lei 925</span>
            </div>

            {/* Headline Principal Estritamente Solicitada */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-solea-charcoal leading-[1.08] tracking-tight">
                Atravessa tendências. <br />
                <span className="italic font-normal text-solea-terracota">Acompanha você.</span>
              </h1>
            </div>

            {/* Subtexto Editorial */}
            <p className="text-base sm:text-lg text-solea-charcoal/80 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Joias esculpidas em Prata 925 com polimento espelhado de precisão. Formas orgânicas inspiradas no calor solar e na pureza mineral para durar por gerações.
            </p>

            {/* Botões de Ação Solicitados: Terracota e Outline */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Botão em Terracota */}
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-solea-terracota hover:bg-solea-terracota-dark text-white rounded-full font-medium text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <span>Descobrir Joias</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Botão em Outline */}
              <button
                onClick={onSolarCollectionClick}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-solea-areia text-solea-charcoal border border-solea-charcoal/30 hover:border-solea-terracota rounded-full font-medium text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-solea-champagne group-hover:text-solea-terracota transition-colors" />
                <span>Coleção Solar</span>
              </button>
            </div>

            {/* Selos de Confiança e Nobreza */}
            <div className="pt-6 sm:pt-8 border-t border-solea-border/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
                <div className="flex items-center gap-1.5 text-solea-terracota">
                  <Gem className="w-4 h-4 text-solea-champagne" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-solea-charcoal">925 Legítima</span>
                </div>
                <span className="text-[11px] text-solea-charcoal/70">Prata pura certificada</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
                <div className="flex items-center gap-1.5 text-solea-terracota">
                  <ShieldCheck className="w-4 h-4 text-solea-champagne" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-solea-charcoal">Vitalícia</span>
                </div>
                <span className="text-[11px] text-solea-charcoal/70">Garantia no metal</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-1">
                <div className="flex items-center gap-1.5 text-solea-terracota">
                  <Clock className="w-4 h-4 text-solea-champagne" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-solea-charcoal">Envio Rápido</span>
                </div>
                <span className="text-[11px] text-solea-charcoal/70">Embalagem presenteável</span>
              </div>
            </div>

          </div>

          {/* Lado Direito - Composição Fotográfica Editorial de Luxo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Moldura Principal com Joia */}
              <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-solea-areia group">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop"
                  alt="Anel Solstício Solea em Prata 925"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-solea-charcoal/70 via-transparent to-black/10" />

                {/* Card suspenso dentro da foto */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-solea-marfim/95 backdrop-blur-md border border-white/60 shadow-lg text-solea-charcoal">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-solea-terracota font-bold">Destaque de Curadoria</span>
                      <h4 className="font-serif text-lg font-medium">Anel Solstício Prata 925</h4>
                      <p className="text-xs text-solea-charcoal/70">Curvas solares em alta precisão</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-solea-charcoal/60 line-through">R$ 389</span>
                      <p className="text-sm font-semibold text-solea-terracota">R$ 331,55 <span className="text-[10px] font-normal text-solea-charcoal/80">no Pix</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Flutuante Secundário com Joia em Uso */}
              <div className="hidden sm:block absolute -top-6 -left-6 z-20 w-36 aspect-square rounded-xl overflow-hidden border-2 border-white shadow-xl bg-solea-areia">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop"
                  alt="Colar Raio Solar Solea"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Selo Solar Flutuante */}
              <div className="absolute -bottom-5 -right-5 z-20 w-24 h-24 rounded-full bg-solea-terracota text-white p-3 shadow-xl flex flex-col items-center justify-center text-center border-2 border-solea-areia">
                <SoleaSunIcon className="w-6 h-6 text-solea-champagne mb-0.5" />
                <span className="text-[9px] uppercase tracking-widest font-bold leading-tight">Solea<br />Atelier</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
