import React, { useState } from 'react';
import { X, CheckCircle2, Send, Mail, MapPin } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/companyData';
import { useToast } from '../context/ToastContext';
import { AuraLogo } from './AuraLogo';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct = ''
}) => {
  const { showQuoteSuccessToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    preselectedProduct || 'Baseball Caps'
  );
  const [customizationType, setCustomizationType] =
    useState('3D Puff Embroidery');
  const [quantity, setQuantity] = useState('500 - 1,000 pcs');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      setErrorMsg(
        'Please fill in all required fields (Full Name, Email, Phone, Message).'
      );
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send request to Vercel Serverless Function (/api/chat) for Gemini AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          phone: phone,
          product: selectedCategory,
          customization: customizationType,
          quantity: quantity,
          message: message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send request');
      }

      // Success state
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger toast notification
      showQuoteSuccessToast({
        name: fullName,
        product: selectedCategory,
        quantity: quantity,
        email: email
      });

    } catch (error: any) {
      console.error('API Route Error:', error);
      setIsSubmitting(false);
      setErrorMsg(
        error.message || 'Unable to send your quote request right now. Please try again.'
      );
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');

    setFullName('');
    setEmail('');
    setPhone('');
    setSelectedCategory(preselectedProduct || 'Baseball Caps');
    setCustomizationType('3D Puff Embroidery');
    setQuantity('500 - 1,000 pcs');
    setMessage('');

    onClose();
  };

  return (
    <div
      id="quote-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="quote-modal-container"
        className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/15 rounded-sm shadow-2xl overflow-hidden text-zinc-200 max-h-[92vh] flex flex-col"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <AuraLogo size="sm" showTagline={false} />

            <div className="hidden sm:block border-l border-white/10 pl-3">
              <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Manufacturing Quote Desk
              </h3>

              <p className="text-[10px] text-[#D4AF37] font-mono">
                Nazimabad, Karachi, Pakistan
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5">

          {submitted ? (

            /* SUCCESS SCREEN */
            <div className="py-6 text-center space-y-4">

              <div className="w-14 h-14 rounded-sm bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h4 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
                Quote Request Submitted
              </h4>

              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed bg-[#141414] p-4 rounded-sm border border-white/10">
                Thank you for contacting Aura Global Industries.
                Your quote request has been successfully sent to our
                manufacturing team. An automated AI response has been sent to your email.
              </p>

              <div className="text-[11px] text-zinc-400 pt-2 space-y-1 font-mono">

                <p className="flex items-center justify-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />

                  Email received at:

                  <strong className="text-zinc-200">
                    auraglobalindustries@gmail.com
                  </strong>
                </p>

                <p className="flex items-center justify-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />

                  Factory: Nazimabad, Karachi, Pakistan
                </p>

              </div>

              <div className="pt-3">

                <button
                  onClick={handleResetAndClose}
                  className="sleek-btn-primary px-6 py-2.5 rounded-sm text-xs cursor-pointer"
                >
                  Done
                </button>

              </div>

            </div>

          ) : (

            /* FORM */
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 text-xs bg-red-950/60 border border-red-500/40 text-red-300 rounded-sm">
                  {errorMsg}
                </div>
              )}

              {/* Full Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Full Name{' '}
                    <span className="text-[#D4AF37]">*</span>
                  </label>

                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe / Brand Manager"
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Email Address{' '}
                    <span className="text-[#D4AF37]">*</span>
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600"
                  />
                </div>

              </div>

              {/* Phone + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Phone / WhatsApp{' '}
                    <span className="text-[#D4AF37]">*</span>
                  </label>

                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Cap Category / Style
                  </label>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white"
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.name}
                        className="bg-[#141414] text-white"
                      >
                        {cat.name}
                      </option>
                    ))}

                    <option
                      value="Bespoke OEM Development"
                      className="bg-[#141414] text-white"
                    >
                      Bespoke OEM Custom Design
                    </option>
                  </select>
                </div>

              </div>

              {/* Customization + Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Customization Needed
                  </label>

                  <select
                    value={customizationType}
                    onChange={(e) =>
                      setCustomizationType(e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white"
                  >
                    <option value="3D Puff Embroidery">
                      3D Puff Embroidery
                    </option>

                    <option value="Flat Embroidery">
                      Flat Needle Embroidery
                    </option>

                    <option value="Screen Print / Silicone">
                      Screen / 3D Silicone Print
                    </option>

                    <option value="Woven Patch">
                      Woven Merrowed Patch
                    </option>

                    <option value="Laser Perforations">
                      Laser Perforations & Sports
                    </option>

                    <option value="Full Private Label OEM">
                      Full Private Label Package
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Estimated Production Quantity
                  </label>

                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white"
                  >
                    <option value="Sample / Prototype Run">
                      Sample / Prototype Run (10-50 pcs)
                    </option>

                    <option value="100 - 300 pcs">
                      100 - 300 pcs (Test Order)
                    </option>

                    <option value="500 - 1,000 pcs">
                      500 - 1,000 pcs (Standard Bulk)
                    </option>

                    <option value="2,000 - 5,000 pcs">
                      2,000 - 5,000 pcs (Volume Tier)
                    </option>

                    <option value="10,000+ pcs">
                      10,000+ pcs (Export Container)
                    </option>
                  </select>
                </div>

              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  Project Details / Message{' '}
                  <span className="text-[#D4AF37]">*</span>
                </label>

                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your design, desired fabric (cotton twill, polyester mesh, corduroy), logo placement, closure preference..."
                  className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 flex items-center justify-between">

                <p className="text-[10px] text-zinc-500 font-mono">
                  DISPATCH:{' '}
                  <span className="text-[#D4AF37]">
                    auraglobalindustries@gmail.com
                  </span>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sleek-btn-primary px-6 py-2.5 rounded-sm text-xs flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >

                  {isSubmitting ? (
                    <span>Processing AI Reply...</span>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}

                </button>

              </div>

            </form>

          )}

        </div>
      </div>
    </div>
  );
};