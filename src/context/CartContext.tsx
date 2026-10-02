import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/mockProducts';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  deadline: string;
  carrier: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  pixDiscountAmount: number;
  totalWithPix: number;
  
  // Free Shipping
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  freeShippingProgress: number;
  isFreeShipping: boolean;

  // Drawer & Modals state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Shipping Calculator
  shippingCep: string;
  setShippingCep: (cep: string) => void;
  shippingOptions: ShippingOption[];
  selectedShipping: ShippingOption | null;
  setSelectedShipping: (option: ShippingOption | null) => void;
  isCalculatingShipping: boolean;
  calculateShipping: (cep: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 299;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializamos o carrinho com o Anel Solstício e Colar Raio Solar para demonstrar o visual rico imediatamente
  const [cartItems, setCartItems] = useState<CartItem[]>(() => [
    {
      product: {
        id: "anel-solsticio",
        name: "Anel Solstício",
        subtitle: "Design fluido com curvas solares polidas",
        category: "aneis",
        price: 349.00,
        originalPrice: 389.00,
        installmentsCount: 6,
        badges: ["Prata 925", "Mais Vendido"],
        images: [
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop"
        ],
        description: "Inspirado na luz máxima do solstício de verão.",
        details: {
          material: "Prata de Lei 925 maciça e certificada",
          guarantee: "Garantia vitalícia na autenticidade da Prata 925",
          finish: "Polimento espelhado manual de alto brilho"
        },
        availableSizes: ["14", "16", "18", "20", "22"],
        sizeType: "aro",
        rating: 4.9,
        reviewsCount: 38
      },
      quantity: 1,
      selectedSize: "16"
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["anel-solsticio", "brinco-eclipse"]);

  // CEP & Frete
  const [shippingCep, setShippingCep] = useState("01310-100");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  // Cálculos financeiros
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const pixDiscountAmount = subtotal * 0.05;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const totalWithPix = Math.max(0, subtotal - pixDiscountAmount + (selectedShipping ? selectedShipping.price : 0));

  // Recalcular fretes disponíveis
  const calculateShipping = (cep: string) => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length < 8) return;
    setIsCalculatingShipping(true);
    setTimeout(() => {
      const options: ShippingOption[] = [
        {
          id: 'pac',
          name: 'PAC Correios',
          carrier: 'Correios',
          price: isFreeShipping ? 0 : 18.90,
          originalPrice: isFreeShipping ? 18.90 : undefined,
          deadline: '4 a 6 dias úteis'
        },
        {
          id: 'jadlog',
          name: 'Jadlog .Package',
          carrier: 'Jadlog',
          price: isFreeShipping ? 0 : 21.50,
          originalPrice: isFreeShipping ? 21.50 : undefined,
          deadline: '3 a 4 dias úteis'
        },
        {
          id: 'sedex',
          name: 'Sedex Expresso',
          carrier: 'Correios',
          price: isFreeShipping ? 12.00 : 29.90,
          originalPrice: isFreeShipping ? 29.90 : undefined,
          deadline: '1 a 2 dias úteis'
        }
      ];
      setShippingOptions(options);
      setSelectedShipping(options[0]);
      setIsCalculatingShipping(false);
    }, 450);
  };

  // Atualizar valores do frete se atingir frete grátis
  useEffect(() => {
    if (shippingOptions.length > 0) {
      setShippingOptions(prev =>
        prev.map(opt => ({
          ...opt,
          price: opt.id === 'sedex' ? (isFreeShipping ? 12.00 : 29.90) : (isFreeShipping ? 0 : (opt.originalPrice || opt.price)),
          originalPrice: isFreeShipping ? (opt.originalPrice || opt.price || 18.90) : undefined
        }))
      );
    }
  }, [isFreeShipping]);

  // Inicializa cotação de frete mock
  useEffect(() => {
    calculateShipping(shippingCep);
  }, []);

  const addToCart = (product: Product, selectedSize?: string, quantity = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedSize: selectedSize || (product.availableSizes ? product.availableSizes[0] : undefined) }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === selectedSize)));
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCartItems(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCartItems([]);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        pixDiscountAmount,
        totalWithPix,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        remainingForFreeShipping,
        freeShippingProgress,
        isFreeShipping,
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        favorites,
        toggleFavorite,
        isFavorite,
        shippingCep,
        setShippingCep,
        shippingOptions,
        selectedShipping,
        setSelectedShipping,
        isCalculatingShipping,
        calculateShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
