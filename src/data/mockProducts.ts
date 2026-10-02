export interface ProductDetails {
  material: string;
  guarantee: string;
  finish: string;
  dimensions?: string;
  weightApprox?: string;
  stone?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'aneis' | 'colares' | 'brincos' | 'pulseiras' | 'solar';
  price: number;
  originalPrice?: number;
  installmentsCount: number;
  badges: string[];
  images: string[];
  description: string;
  details: ProductDetails;
  availableSizes?: string[];
  sizeType?: 'aro' | 'comprimento';
  rating: number;
  reviewsCount: number;
}

export const mockProducts: Product[] = [
  {
    id: "anel-solsticio",
    name: "Anel Solstício",
    subtitle: "Design fluido com curvas solares polidas",
    category: "aneis",
    price: 349.00,
    originalPrice: 389.00,
    installmentsCount: 6,
    badges: ["Prata 925", "Mais Vendido"],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Inspirado na luz máxima do solstício de verão, o Anel Solstício captura a luz através de linhas orgânicas e polimento espelhado de alta joalheria. Forjado artesanalmente para envolver o dedo com leveza escultural.",
    details: {
      material: "Prata de Lei 925 maciça e certificada",
      guarantee: "Garantia vitalícia na autenticidade da Prata 925",
      finish: "Polimento espelhado manual de alto brilho",
      dimensions: "Espessura de 2.8mm com perfil anatômico",
      weightApprox: "4.2g"
    },
    availableSizes: ["14", "16", "18", "20", "22"],
    sizeType: "aro",
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: "colar-raio-solar",
    name: "Colar Raio Solar",
    subtitle: "Pingente solar com raios facetados e corrente veneziana",
    category: "colares",
    price: 429.00,
    originalPrice: 479.00,
    installmentsCount: 6,
    badges: ["Prata 925", "Coleção Solar"],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475152-4735492167c1?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "O Colar Raio Solar simboliza o amanhecer e a renovação de ciclos. Com medalha esculpida em Prata 925 com raios lineares em relevo, acompanha corrente veneziana delicada e fecho lagosta seguro.",
    details: {
      material: "Prata de Lei 925 maciça e hipoalergênica",
      guarantee: "Garantia vitalícia no teor do metal nobre",
      finish: "Banho de ródio protetor e brilho intenso",
      dimensions: "Medalha de 18mm com corrente regulável",
      weightApprox: "5.8g"
    },
    availableSizes: ["40cm", "45cm + 5cm extensor", "50cm"],
    sizeType: "comprimento",
    rating: 5.0,
    reviewsCount: 47
  },
  {
    id: "brinco-eclipse",
    name: "Brinco Eclipse",
    subtitle: "Argola escultural de sobreposição geométrica",
    category: "brincos",
    price: 289.00,
    installmentsCount: 6,
    badges: ["Prata 925", "Mais Vendido"],
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Uma reinterpretação artística das clássicas argolas. A peça brinca com a dualidade de luz e sombra de um eclipse celestial através de curvas assimétricas e acabamento sem emendas visíveis.",
    details: {
      material: "Prata 925 com tratamento antialérgico",
      guarantee: "Garantia vitalícia na pureza da prata",
      finish: "Polimento diamantado de alta precisão",
      dimensions: "Diâmetro de 22mm e largura de 4mm",
      weightApprox: "3.9g o par"
    },
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: "pulseira-aurora",
    name: "Pulseira Aurora",
    subtitle: "Elos refinados com fecho joia e brilho sutil",
    category: "pulseiras",
    price: 389.00,
    originalPrice: 420.00,
    installmentsCount: 6,
    badges: ["Prata 925", "Coleção Solar"],
    images: [
      "https://images.unsplash.com/photo-1611591475152-4735492167c1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Suave como o despertar do dia, a Pulseira Aurora combina elos planos entrelaçados que repousam com perfeição sobre o pulso. Uma joia versátil criada para acompanhar você do cotidiano a momentos especiais.",
    details: {
      material: "Prata 925 maciça certificada",
      guarantee: "Garantia vitalícia para polimento e autenticidade",
      finish: "Acabamento sedoso escovado e espelhado",
      dimensions: "Largura dos elos: 3.5mm",
      weightApprox: "6.1g"
    },
    availableSizes: ["16cm", "18cm", "20cm"],
    sizeType: "comprimento",
    rating: 4.9,
    reviewsCount: 52
  },
  {
    id: "anel-helios-solitario",
    name: "Anel Hélios Solitário",
    subtitle: "Zircônia cúbica lapidação brilhante em garras solares",
    category: "aneis",
    price: 319.00,
    installmentsCount: 6,
    badges: ["Prata 925", "Mais Vendido"],
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "O clássico anel solitário reimaginado sob a ótica solar de Solea. As quatro garras que sustentam a gema facetada formam uma coroa radiante que projeta brilho máximo a cada movimento.",
    details: {
      material: "Prata 925 com zircônia cúbica 5A premium",
      guarantee: "Garantia vitalícia no metal nobre",
      finish: "Banho de ródio branco protetor",
      stone: "Zircônia qualidade diamante 6mm",
      weightApprox: "3.4g"
    },
    availableSizes: ["14", "16", "18", "20", "22"],
    sizeType: "aro",
    rating: 4.9,
    reviewsCount: 41
  },
  {
    id: "colar-gota-celeste",
    name: "Colar Gota Celeste",
    subtitle: "Gota de prata líquida com pendente contínuo",
    category: "colares",
    price: 369.00,
    installmentsCount: 6,
    badges: ["Prata 925", "Lançamento"],
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Design moderno em formato de gota em fusão, traduzindo a beleza pura da prata derretida em uma joia atemporal que alonga o colo feminino com sobriedade e sofisticação.",
    details: {
      material: "Prata 925 maciça com selo de garantia",
      guarantee: "Garantia vitalícia na composição do metal",
      finish: "Polimento espelhado ultrabrilhante",
      dimensions: "Pendente de 24mm x 9mm, corrente de 45cm",
      weightApprox: "5.1g"
    },
    availableSizes: ["45cm", "50cm"],
    sizeType: "comprimento",
    rating: 4.7,
    reviewsCount: 19
  }
];
