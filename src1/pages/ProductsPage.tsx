import React, { useState } from 'react';
import { ProductItem } from '../types';
import { PRODUCTS_CATALOG } from '../data/companyData';
import {
  Search,
  Check,
  ArrowUpRight,
  Eye,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface ProductsPageProps {
  initialCategoryFilter?: string;
  onOpenQuoteModal: (productName?: string) => void;
  onSelectProductModal: (product: ProductItem) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategoryFilter = 'all',
  onOpenQuoteModal,
  onSelectProductModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { label: 'All', value: 'all' },
    { label: 'Baseball', value: 'baseball' },
    { label: 'Snapback', value: 'snapback' },
    { label: 'Trucker', value: 'trucker' },
    { label: '5-Panel', value: '5-panel' },
    { label: '6-Panel', value: '6-panel' },
    { label: 'Dad Cap', value: 'dad-cap' },
    { label: 'Sports', value: 'sports' },
    { label: 'Mesh', value: 'mesh' },
    { label: 'Custom', value: 'custom' }
  ];

  const filteredProducts = PRODUCTS_CATALOG.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.categorySlug === selectedCategory ||
      (selectedCategory === 'custom' && (item.categorySlug === 'custom' || item.categorySlug === 'embroidered' || item.categorySlug === 'printed'));

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="products-page-root" className="pt-28 sm:pt-36 pb-20 space-y-10">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold rounded-sm bg-[#0F0F0F]">
          <Layers className="w-3.5 h-3.5" />
          <span>B2B Production Catalog</span>
        </div>

        {/* Required Heading */}
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
          Our Products
        </h1>

        {/* Required Subtitle */}
        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Explore our range of professionally manufactured caps and customized headwear.
        </p>

        {/* OEM Customization Notice */}
        <div className="max-w-xl mx-auto p-3 rounded-sm bg-[#0F0F0F] border border-white/10 text-xs text-zinc-400 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>Every style is fully customizable with your brand's embroidery, printing, custom fabrics, and labels.</span>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-3 sm:p-4 rounded-sm bg-[#0F0F0F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.value
                    ? 'bg-[#D4AF37] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model or fabric..."
              className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#0A0A0A] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-500 px-2 font-mono">
          <span>SHOWING <strong className="text-white">{filteredProducts.length}</strong> CAP MODELS</span>
          <span className="text-[#D4AF37]">DIRECT FACTORY PRICING UPON REQUEST</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-[#0F0F0F] rounded-sm border border-white/10 space-y-3">
            <p className="text-zinc-400">No cap models found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#D4AF37] hover:underline uppercase font-bold tracking-wider cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="sleek-card rounded-sm overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Cap Photography with Quick View button */}
                  <div className="relative aspect-[4/3] bg-black overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.altText}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    {/* Category Pill */}
                    <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-semibold text-[#D4AF37] bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-sm border border-white/10">
                      {product.category}
                    </span>

                    {/* Quick View Button */}
                    <button
                      onClick={() => onSelectProductModal(product)}
                      className="absolute bottom-2.5 right-2.5 p-2 rounded-sm bg-black/90 text-white hover:text-[#D4AF37] border border-white/10 backdrop-blur-md text-[11px] flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer uppercase font-semibold"
                      title="View Cap Specifications"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Specs</span>
                    </button>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Material & Closure Specs */}
                    <div className="space-y-1 text-xs bg-[#141414] p-2.5 rounded-sm border border-white/5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 text-[11px]">FABRIC:</span>
                        <span className="text-zinc-300 font-sans text-xs truncate max-w-[65%]">
                          {product.material}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 text-[11px]">CLOSURE:</span>
                        <span className="text-zinc-300 font-sans text-xs truncate">
                          {product.closure}
                        </span>
                      </div>
                    </div>

                    {/* Customization Chips */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                        Customization:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.customization.slice(0, 3).map((cust, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-sm bg-white/5 text-zinc-300 border border-white/10"
                          >
                            <Check className="w-2.5 h-2.5 text-[#D4AF37]" />
                            {cust}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onOpenQuoteModal(product.name)}
                    className="w-full sleek-btn-primary py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bulk Order / Customization Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-sm bg-[#0F0F0F] border border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
              Need a Custom Silhouette or Tech Pack Development?
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We manufacture customized caps based on quantity, fabric, logo, 3D embroidery, printing, customized sweatbands, and custom private label packaging.
            </p>
          </div>

          <button
            onClick={() => onOpenQuoteModal('Custom Tech Pack OEM')}
            className="sleek-btn-primary px-7 py-3 rounded-sm flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
          >
            <span>Start Custom OEM Project</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
