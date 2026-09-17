import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Send, Mail, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PRODUCT_CATEGORIES } from '../data/companyData';
import { useToast } from '../context/ToastContext';
import { AuraLogo } from './AuraLogo';

// EmailJS Credentials Configuration
const EMAILJS_SERVICE_ID = 'service_aw36x0r';
const EMAILJS_ADMIN_TEMPLATE_ID = 'template_dyz19fg';    // For Admin Notification
const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_5f71n45'; // For Customer Auto-Reply
const EMAILJS_PUBLIC_KEY = 'eWmYD7PcYa6ywdX1O';
const ADMIN_EMAIL = 'auraglobalindustries@gmail.com';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

// Gemini REST Integration using gemini-3.5-flash (gemini-2.0-flash was retired by Google)
// NOTE: This currently calls the Gemini API directly from the browser using
// VITE_GEMINI_API_KEY, which means the key ships inside the public JS bundle
// and can be read by anyone via View Source / DevTools. For production, move
// this call behind a small backend/serverless endpoint so the key stays
// server-side only.
const generateAiReply = async (userMessage: string, userName: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('VITE_GEMINI_API_KEY is missing in .env file!');
    return `Dear ${userName}, thank you for contacting Aura Global Industries. We have received your query and will get back to you shortly.`;
  }

  const promptText = `You are the Executive Assistant at Aura Global Industries, a custom headwear manufacturer.

STRICT MULTI-LINGUAL INSTRUCTIONS:
1. Detect the exact language AND script used in the Customer Message below.
2. Respond strictly in the EXACT SAME language and script (e.g., Devanagari script for Hindi, Roman Urdu for Roman Urdu, Urdu script for Urdu, English for English).
3. Do NOT reply in English unless the inquiry itself is written in English.
4. Keep the response professional, polite, and brief (2-3 sentences acknowledging receipt and confirming pricing/details will follow).

Customer Name: ${userName}
Customer Message: ${userMessage}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    if (data?.error) {
      console.error('Gemini API Error details:', data.error);
    }

    throw new Error('Invalid response structure from Gemini API');
  } catch (error) {
    console.error('AI Generation Error:', error);
    return `Dear ${userName}, thank you for contacting Aura Global Industries. We have received your query and will get back to you shortly.`;
  }
};

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
  const [customizationType, setCustomizationType] = useState('3D Puff Embroidery');
  const [quantity, setQuantity] = useState('500 - 1,000 pcs');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key, and lock background scroll while the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

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
      // 1. Generate Multi-lingual AI Response using Gemini REST API
      const aiGeneratedReply = await generateAiReply(message.trim(), fullName.trim());

      // 2. Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // 3. Send Admin Notification Email
      // IMPORTANT: In the EmailJS dashboard, the ADMIN template's
      // "To Email" field must be set to {{to_email}} (NOT {{email}}),
      // otherwise this notification will be sent to the customer instead of you.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          full_name: fullName.trim(),
          name: fullName.trim(),
          customer_email: email.trim(),
          phone: phone.trim(),
          category: selectedCategory,
          customization: customizationType,
          quantity: quantity,
          message: message.trim(),
          original_inquiry: message.trim(),
          to_email: ADMIN_EMAIL,
          owner_email: ADMIN_EMAIL
        },
        EMAILJS_PUBLIC_KEY
      );

      // 4. Send Customer Auto-Reply Email
      // IMPORTANT: In the EmailJS dashboard, the AUTO-REPLY template's
      // "From Name" field must be a fixed value like "Aura Global Industries"
      // (NOT {{name}}), otherwise the customer will see their own name as the sender.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        {
          to_name: fullName.trim(),
          full_name: fullName.trim(),
          to_email: email.trim(),
          email: email.trim(),
          category: selectedCategory,
          customization: customizationType,
          quantity: quantity,
          message: message.trim(),
          original_inquiry: message.trim(),
          ai_reply: aiGeneratedReply
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitting(false);
      setSubmitted(true);

      showQuoteSuccessToast({
        name: fullName,
        product: selectedCategory,
        quantity: quantity,
        email: email
      });
    } catch (error: any) {
      console.error('Submission Error:', error);
      setIsSubmitting(false);
      setErrorMsg(
        'Unable to send your quote request right now. Please try again or contact directly.'
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
      onClick={handleResetAndClose}
    >
      <div
        id="quote-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/15 rounded-sm shadow-2xl overflow-hidden text-zinc-200 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
          <div className="flex items-center gap-3 min-w-0">
            <AuraLogo size="sm" showTagline={false} />

            <div className="hidden sm:block border-l border-white/10 pl-3">
              <h3 id="quote-modal-title" className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Manufacturing Quote Desk
              </h3>
              <p className="text-[10px] text-[#D4AF37] font-mono">
                Nazimabad, Karachi, Pakistan
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {submitted ? (
            /* SUCCESS SCREEN */
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-sm bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
              </div>

              <h4 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
                Quote Request Submitted
              </h4>

              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed bg-[#141414] p-4 rounded-sm border border-white/10">
                Thank you for contacting Aura Global Industries.
                Your quote request has been successfully sent to our
                manufacturing team. An automated confirmation email has been sent to <strong className="text-[#D4AF37]">{email}</strong>.
              </p>

              <div className="text-[11px] text-zinc-400 pt-2 space-y-1 font-mono">
                <p className="flex items-center justify-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  Email received at:
                  <strong className="text-zinc-200">
                    {ADMIN_EMAIL}
                  </strong>
                </p>

                <p className="flex items-center justify-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
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
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {errorMsg && (
                <div role="alert" aria-live="assertive" className="p-3 text-xs bg-red-950/60 border border-red-500/40 text-red-300 rounded-sm">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-full-name" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Full Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="quote-full-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe / Brand Manager"
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-phone" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Phone / WhatsApp <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label htmlFor="quote-category" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Cap Category / Style
                  </label>
                  <select
                    id="quote-category"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-customization" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Customization Needed
                  </label>
                  <select
                    id="quote-customization"
                    value={customizationType}
                    onChange={(e) => setCustomizationType(e.target.value)}
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white"
                  >
                    <option value="3D Puff Embroidery">3D Puff Embroidery</option>
                    <option value="Flat Embroidery">Flat Needle Embroidery</option>
                    <option value="Screen Print / Silicone">Screen / 3D Silicone Print</option>
                    <option value="Woven Patch">Woven Merrowed Patch</option>
                    <option value="Laser Perforations">Laser Perforations & Sports</option>
                    <option value="Full Private Label OEM">Full Private Label Package</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quote-quantity" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Estimated Production Quantity
                  </label>
                  <select
                    id="quote-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white"
                  >
                    <option value="Sample / Prototype Run">Sample / Prototype Run (10-50 pcs)</option>
                    <option value="100 - 300 pcs">100 - 300 pcs (Test Order)</option>
                    <option value="500 - 1,000 pcs">500 - 1,000 pcs (Standard Bulk)</option>
                    <option value="2,000 - 5,000 pcs">2,000 - 5,000 pcs (Volume Tier)</option>
                    <option value="10,000+ pcs">10,000+ pcs (Export Container)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quote-message" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  Project Details / Message <span className="text-[#D4AF37]">*</span>
                </label>
                <textarea
                  id="quote-message"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your design, desired fabric (cotton twill, polyester mesh, corduroy), logo placement, closure preference..."
                  className="w-full px-3 py-2 rounded-sm bg-[#141414] border border-white/15 focus:border-[#D4AF37] focus:outline-none text-xs text-white placeholder:text-zinc-600 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <p className="hidden sm:block text-[10px] text-zinc-500 font-mono">
                  DISPATCH:{' '}
                  <span className="text-[#D4AF37]">
                    {ADMIN_EMAIL}
                  </span>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto sleek-btn-primary px-6 py-2.5 rounded-sm text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generating Response & Sending...</span>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
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