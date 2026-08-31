/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, ProductItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ParticlesBackground } from './components/ParticlesBackground';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastContainer } from './components/Toast';
import { WhatsAppButton } from './components/WhatsAppButton';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<string>('all');

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePreselectedProduct, setQuotePreselectedProduct] =
    useState<string>('');

  const [selectedProductForModal, setSelectedProductForModal] =
    useState<ProductItem | null>(null);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleOpenQuoteModal = (productName?: string) => {
    setQuotePreselectedProduct(productName || '');
    setQuoteModalOpen(true);
  };

  const handleCategorySelectFromHome = (categorySlug: string) => {
    setSelectedCategoryFilter(categorySlug);
    setCurrentPage('products');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleOpenProductDetail = (product: ProductItem) => {
    setSelectedProductForModal(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#E5E5E5] font-sans antialiased selection:bg-[#F27D26] selection:text-white relative">

      {/* Background Particles */}
      <ParticlesBackground id="particles-js" />

      {/* =========================================================
          TOP NAVBAR
      ========================================================= */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* =========================================================
          MAIN PAGE
      ========================================================= */}
      <main className="flex-grow relative z-10">

        {/* ===================== HOME PAGE ===================== */}
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSelectCategoryFilter={handleCategorySelectFromHome}
            onSelectProductModal={handleOpenProductDetail}
          />
        )}

        {/* ===================== PRODUCTS PAGE ===================== */}
        {currentPage === 'products' && (
          <ProductsPage
            initialCategoryFilter={selectedCategoryFilter}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSelectProductModal={handleOpenProductDetail}
          />
        )}

        {/* ===================== MANUFACTURING PAGE ===================== */}
        {currentPage === 'manufacturing' && (
          <ManufacturingPage
            onOpenQuoteModal={() =>
              handleOpenQuoteModal('Custom Production Batch')
            }
          />
        )}

        {/* ===================== ABOUT PAGE ===================== */}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {/* ===================== CONTACT PAGE ===================== */}
        {currentPage === 'contact' && (
          <ContactPage />
        )}

      </main>

      {/* =========================================================
          CORPORATE FOOTER
      ========================================================= */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* =========================================================
          QUOTE MODAL
      ========================================================= */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={quotePreselectedProduct}
      />

      {/* =========================================================
          PRODUCT DETAIL MODAL
      ========================================================= */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onRequestQuote={(prodName) =>
          handleOpenQuoteModal(prodName)
        }
      />

      {/* =========================================================
          TOAST
      ========================================================= */}
      <ToastContainer />

      {/* =========================================================
          WHATSAPP
      ========================================================= */}
      <WhatsAppButton phoneNumber="923421509973" />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </LanguageProvider>
  );
}