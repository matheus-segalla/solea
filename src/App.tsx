import { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/solea/Navbar';
import { HeroBanner } from './components/solea/HeroBanner';
import { CategoryPills } from './components/solea/CategoryPills';
import { ProductCard } from './components/solea/ProductCard';
import { QuickViewModal } from './components/solea/QuickViewModal';
import { CartDrawer } from './components/solea/CartDrawer';
import { CheckoutModal } from './components/solea/CheckoutModal';
import { BottomNavigation } from './components/solea/BottomNavigation';
import { mockProducts } from './data/mockProducts';
import { SoleaSunIcon } from './components/solea/icons/SoleaSunIcon';
import { Sparkles, ShieldCheck, Gem, Gift, ArrowUpRight, Mail, Phone } from 'lucide-react';

function SoleaStoreContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { favorites } = useCart();

  // Filtragem dinâmica de produtos
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Filtro de Favoritos
      if (selectedCategory === 'favoritos') {
        if (!favorites.includes(product.id)) return false;
      } else if (selectedCategory === 'mais-vendidos') {
        if (!product.badges.some((b) => b.includes('Mais Vendido'))) return false;
      } else if (selectedCategory !== 'todos') {
        if (selectedCategory === 'solar') {
          if (!product.badges.some((b) => b.includes('Solar'))) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Filtro de Busca
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSub = product.subtitle.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, favorites]);

  const scrollToProducts = () => {
    const el = document.getElementById('catalogo-joias');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const selectSolarCollection = () => {
    setSelectedCategory('solar');
    scrollToProducts();
  };

  return (
    <div className="min-h-screen bg-solea-marfim text-solea-charcoal flex flex-col font-sans selection:bg-solea-champagne/30 selection:text-solea-terracota pb-16 sm:pb-0">
      {/* 1. Navbar Compacta com Drawer Lateral */}
      <Navbar
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat !== 'todos') scrollToProducts();
        }}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      <main className="flex-1">
        {/* 2. HeroBanner Editorial */}
        <HeroBanner
          onExploreClick={scrollToProducts}
          onSolarCollectionClick={selectSolarCollection}
        />

        {/* 3. Carrossel Horizontal de Categorias (Pills com rolagem suave no-scrollbar) */}
        <CategoryPills
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToProducts();
          }}
        />

        {/* 4. Destaque Editorial & Manifesto de Joalheria */}
        <section className="py-8 sm:py-12 bg-solea-areia/40 border-b border-solea-border">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 border border-solea-border/80 shadow-2xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-solea-areia flex items-center justify-center text-solea-terracota flex-shrink-0">
                  <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-solea-champagne" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-solea-charcoal">Prata de Lei 925</h4>
                  <p className="text-[10px] sm:text-[11px] text-solea-charcoal/70 hidden sm:block">Pureza e nobreza garantida</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 border border-solea-border/80 shadow-2xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-solea-areia flex items-center justify-center text-solea-terracota flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-solea-champagne" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-solea-charcoal">5% OFF no Pix</h4>
                  <p className="text-[10px] sm:text-[11px] text-solea-charcoal/70 hidden sm:block">Desconto imediato à vista</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 border border-solea-border/80 shadow-2xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-solea-areia flex items-center justify-center text-solea-terracota flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-solea-champagne" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-solea-charcoal">Garantia Vitalícia</h4>
                  <p className="text-[10px] sm:text-[11px] text-solea-charcoal/70 hidden sm:block">Certificado oficial de metal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 border border-solea-border/80 shadow-2xs">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-solea-areia flex items-center justify-center text-solea-terracota flex-shrink-0">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-solea-champagne" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-solea-charcoal">Caixa Presenteável</h4>
                  <p className="text-[10px] sm:text-[11px] text-solea-charcoal/70 hidden sm:block">Embalagem nobre inclusa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Catálogo de Produtos: Layout de 2 Colunas Mobile-First (grid grid-cols-2 gap-3 p-3) */}
        <section id="catalogo-joias" className="py-10 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Header da Seção */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-solea-border/80 gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-solea-terracota text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
                <SoleaSunIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-solea-champagne" />
                <span>Curadoria Solea</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium text-solea-charcoal mt-1">
                {selectedCategory === 'todos' && 'Joias em Prata de Lei 925'}
                {selectedCategory === 'aneis' && 'Anéis em Prata 925'}
                {selectedCategory === 'colares' && 'Colares e Pendentes'}
                {selectedCategory === 'brincos' && 'Brincos e Argolas'}
                {selectedCategory === 'pulseiras' && 'Pulseiras e Braceletes'}
                {selectedCategory === 'solar' && 'Coleção Solar Exclusiva'}
                {selectedCategory === 'mais-vendidos' && 'Joias Mais Desejadas'}
                {selectedCategory === 'favoritos' && 'Suas Joias Salvas'}
              </h2>
              <p className="text-xs sm:text-sm text-solea-charcoal/70 mt-1 max-w-lg font-light">
                {filteredProducts.length} peça(s) exclusiva(s) esculpida(s) com proporções nobres.
              </p>
            </div>

            {/* Badges de filtro rápido em desktop */}
            <div className="hidden sm:flex flex-wrap gap-2">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'aneis', label: 'Anéis' },
                { id: 'colares', label: 'Colares' },
                { id: 'brincos', label: 'Brincos' },
                { id: 'pulseiras', label: 'Pulseiras' },
                { id: 'solar', label: 'Coleção Solar' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border ${
                    selectedCategory === filter.id
                      ? 'bg-solea-terracota text-white border-solea-terracota shadow-sm'
                      : 'bg-white text-solea-charcoal border-solea-border hover:border-solea-champagne hover:bg-solea-areia/40'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de 2 Colunas Mobile (`grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3`) */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4 bg-white/50 rounded-2xl border border-solea-border p-6">
              <SoleaSunIcon className="w-12 h-12 text-solea-champagne/60 mx-auto" />
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-solea-charcoal">Nenhuma joia encontrada</h3>
              <p className="text-xs text-solea-charcoal/60 max-w-sm mx-auto">
                {selectedCategory === 'favoritos'
                  ? 'Você ainda não salvou nenhuma joia nos seus favoritos. Toque no coração de qualquer joia para salvá-la aqui.'
                  : 'Tente alterar os termos da busca ou selecionar outra categoria.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-solea-terracota text-white rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-solea-terracota-dark transition-colors"
              >
                Ver Todas as Joias
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* 6. Seção Coleção Solar - Banner Imersivo */}
        <section className="bg-solea-areia border-y border-solea-border py-12 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-solea-charcoal rounded-2xl sm:rounded-3xl p-6 sm:p-14 lg:p-16 text-white relative overflow-hidden shadow-2xl">
              
              <div className="absolute top-0 right-0 w-80 h-80 bg-solea-champagne/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-solea-terracota/30 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-solea-champagne text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Edição Limitada de Atelier
                  </div>

                  <h3 className="font-serif text-2xl sm:text-5xl font-light leading-tight">
                    A radiancia do Sol <br />
                    <span className="italic font-normal text-solea-champagne">eternizada na Prata 925.</span>
                  </h3>

                  <p className="text-white/80 text-xs sm:text-base max-w-xl font-light leading-relaxed">
                    Cada peça da Coleção Solar é forjada com proporção áurea e polimento diamantado, refletindo feixes de luz que dançam com os seus movimentos.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={selectSolarCollection}
                      className="min-h-[46px] px-6 sm:px-8 py-3 bg-solea-terracota hover:bg-solea-terracota-dark active:scale-95 text-white rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg flex items-center gap-2"
                    >
                      <span>Ver Peças Solares</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] text-solea-champagne/90 tracking-wider">
                      * Embalagem de veludo inclusa
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center pt-4 lg:pt-0">
                  <div className="relative w-36 h-36 sm:w-56 sm:h-56 rounded-full border border-solea-champagne/40 p-3 sm:p-4 flex items-center justify-center animate-spin-slow">
                    <SoleaSunIcon className="w-24 h-24 sm:w-36 sm:h-36 text-solea-champagne" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 7. Footer Editorial Solea */}
      <footer className="bg-solea-marfim border-t border-solea-border pt-12 sm:pt-16 pb-12 text-xs text-solea-charcoal/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 border-b border-solea-border">
            
            {/* Coluna 1: Marca Solea */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <SoleaSunIcon className="w-6 h-6 sm:w-7 sm:h-7 text-solea-terracota" />
                <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] uppercase font-semibold text-solea-charcoal">
                  SOLEA
                </span>
              </div>
              <p className="text-xs text-solea-charcoal/70 max-w-sm leading-relaxed">
                Alta joalheria em Prata de Lei 925 com garantia vitalícia. Criamos joias que transcendem o efêmero e celebram momentos eternos com autenticidade solar.
              </p>
              <div className="flex items-center space-x-3 pt-1">
                <a href="#" className="w-11 h-11 rounded-full bg-solea-areia hover:bg-solea-terracota hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-solea-areia hover:bg-solea-terracota hover:text-white flex items-center justify-center transition-colors" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-solea-areia hover:bg-solea-terracota hover:text-white flex items-center justify-center transition-colors" aria-label="Telefone">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Coluna 2: Categorias */}
            <div className="space-y-2.5">
              <h5 className="font-serif text-sm font-semibold tracking-wider uppercase text-solea-charcoal">
                Categorias
              </h5>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedCategory('aneis'); scrollToProducts(); }} className="hover:text-solea-terracota transition-colors">Anéis de Prata</button></li>
                <li><button onClick={() => { setSelectedCategory('colares'); scrollToProducts(); }} className="hover:text-solea-terracota transition-colors">Colares & Gargantilhas</button></li>
                <li><button onClick={() => { setSelectedCategory('brincos'); scrollToProducts(); }} className="hover:text-solea-terracota transition-colors">Brincos & Argolas</button></li>
                <li><button onClick={() => { setSelectedCategory('pulseiras'); scrollToProducts(); }} className="hover:text-solea-terracota transition-colors">Pulseiras & Elos</button></li>
                <li><button onClick={() => { setSelectedCategory('solar'); scrollToProducts(); }} className="hover:text-solea-terracota transition-colors">Coleção Solar</button></li>
              </ul>
            </div>

            {/* Coluna 3: Atendimento */}
            <div className="space-y-2.5">
              <h5 className="font-serif text-sm font-semibold tracking-wider uppercase text-solea-charcoal">
                Atendimento
              </h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-solea-terracota transition-colors">Cuidados com a Prata 925</a></li>
                <li><a href="#" className="hover:text-solea-terracota transition-colors">Guia de Tamanhos de Aro</a></li>
                <li><a href="#" className="hover:text-solea-terracota transition-colors">Certificado de Garantia</a></li>
                <li><a href="#" className="hover:text-solea-terracota transition-colors">Política de Frete & Trocas</a></li>
                <li><a href="#" className="hover:text-solea-terracota transition-colors">Rastreamento de Encomenda</a></li>
              </ul>
            </div>

            {/* Coluna 4: Newsletter */}
            <div className="space-y-2.5">
              <h5 className="font-serif text-sm font-semibold tracking-wider uppercase text-solea-charcoal">
                Clube Solar
              </h5>
              <p className="text-[11px] text-solea-charcoal/70">
                Receba lançamentos exclusivos e 10% off na primeira joia.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full min-h-[44px] px-3.5 py-2 bg-solea-areia/60 border border-solea-border rounded-xl text-xs text-solea-charcoal focus:outline-none focus:border-solea-terracota"
                />
                <button
                  type="button"
                  className="w-full min-h-[44px] py-2 bg-solea-terracota hover:bg-solea-terracota-dark active:scale-95 text-white rounded-xl text-xs font-semibold tracking-widest uppercase transition-all"
                >
                  Inscrever-se
                </button>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-solea-charcoal/60 gap-3 text-center sm:text-left">
            <p>© 2026 Solea Joalheria. Prata de Lei 925 Certificada.</p>
            <div className="flex items-center gap-3">
              <span>Pix, Cartão de Crédito e Mercado Pago</span>
              <span>•</span>
              <span>CNPJ 48.912.403/0001-82</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 8. Barra de Navegação Inferior Fixa Mobile (Bottom Navigation Bar) */}
      <BottomNavigation
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onFavoritesClick={() => {
          setSelectedCategory('favoritos');
          scrollToProducts();
        }}
      />

      {/* 9. Gavetas e Modais Globais (Bottom Sheets) */}
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <SoleaStoreContent />
    </CartProvider>
  );
}

export default App;
