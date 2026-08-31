import React from 'react';
import { ProductItem } from '../types';
import { X, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote
}) => {
  if (!product) return null;

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="product-detail-modal-container"
        className="relative w-full max-w-3xl bg-[#0F0F0F] border border-white/15 rounded-sm shadow-2xl overflow-hidden text-zinc-200 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2.5 py-1 rounded-sm border border-[#D4AF37]/20 font-mono">
              {product.category}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono uppercase">• OEM SPECIFICATION</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close product modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image Preview with overlay */}
            <div className="relative rounded-sm overflow-hidden border border-white/10 bg-black aspect-square group">
              <img
                src={product.imageUrl}
                alt={product.altText}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-zinc-300 bg-black/80 backdrop-blur-sm p-2.5 rounded-sm border border-white/10">
                <span className="text-[#D4AF37] font-bold uppercase text-[10px] block">Factory Specification:</span>
                <span className="text-[11px] text-zinc-400">Available in custom Pantone colors & client trims.</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider mb-2">
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical Attributes Table */}
              <div className="bg-[#141414] rounded-sm p-3.5 border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500 text-[11px]">FABRIC:</span>
                  <span className="text-zinc-200 font-sans text-xs text-right max-w-[55%]">{product.material}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500 text-[11px]">PANELS:</span>
                  <span className="text-zinc-200 font-sans text-xs text-right">{product.panels}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500 text-[11px]">CLOSURE:</span>
                  <span className="text-zinc-200 font-sans text-xs text-right">{product.closure}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500 text-[11px]">SIZING:</span>
                  <span className="text-zinc-200 font-sans text-xs text-right">Adult 58cm (54-62cm adjustable)</span>
                </div>
              </div>

              {/* Customization Options */}
              <div>
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Supported Customizations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.customization.map((opt, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-sm bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 font-medium"
                    >
                      <Check className="w-3 h-3" /> {opt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Factory Assurance */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Manufactured in Nazimabad, Karachi, Pakistan with full QA inspection.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0A0A0A]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestQuote(product.name);
            }}
            className="sleek-btn-primary px-5 py-2 rounded-sm text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Request Quote for this Model</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
