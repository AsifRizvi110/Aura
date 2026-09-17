import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { SocialLinks } from '../components/SocialLinks';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
  Building2,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

// This form must ALWAYS notify the admin, regardless of what email the visitor types.
// It reuses the same Admin Notification template as the Quote form.
const EMAILJS_SERVICE_ID = 'service_aw36x0r';
const EMAILJS_ADMIN_TEMPLATE_ID = 'template_dyz19fg';
const EMAILJS_PUBLIC_KEY = 'eWmYD7PcYa6ywdX1O';
const ADMIN_EMAIL = 'auraglobalindustries@gmail.com';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validations
    if (!fullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid Email Address.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Please enter your Phone Number.');
      return;
    }

    if (!message.trim()) {
      setErrorMessage('Please enter your Message.');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          full_name: fullName,
          name: fullName,
          customer_email: email,
          phone: phone,
          message: message,
          original_inquiry: message,
          to_email: ADMIN_EMAIL,     // always the admin, never the visitor's email
          owner_email: ADMIN_EMAIL,
          category: 'General Contact Inquiry',
          customization: '-',
          quantity: '-'
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      setIsSubmitting(false);
      setSubmitted(true);

      showToast({
        title: 'Factory Inquiry Dispatched',
        message: `Thank you ${fullName}! Your message has been sent to our Karachi plant team.`,
        type: 'success',
        duration: 5500,
        meta: {
          email,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      });

    } catch (error) {
      console.error('EmailJS Error:', error);

      setIsSubmitting(false);

      setErrorMessage(
        'Message could not be sent. Please try again or email auraglobalindustries@gmail.com directly.'
      );
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div id="contact-page-root" className="pt-32 sm:pt-36 pb-20 space-y-16">
      {/* SEO: structured data so Google can show this as a business contact
          point (helps "Aura Global Industries contact" searches) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ClothingStore',
            name: 'Aura Global Industries',
            email: 'auraglobalindustries@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Nazimabad, Karachi',
              addressCountry: 'PK'
            },
            openingHours: 'Mo-Sa 09:00-19:00',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'auraglobalindustries@gmail.com',
              contactType: 'customer service',
              areaServed: 'Worldwide'
            }
          })
        }}
      />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Factory Inquiry & Quote Center</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
          Let's Build Your Next Cap
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Have a custom cap design, bulk order or manufacturing requirement? Contact Aura Global Industries and tell us about your project.
        </p>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="dark-industrial-card rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6">

              <div>
                <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-wider">
                  Direct Factory Details
                </span>

                <h3 className="font-heading text-xl font-bold text-white mt-1">
                  Aura Global Industries
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Cap Manufacturer & Exporter in Karachi, Pakistan
                </p>
              </div>

              <div className="space-y-4 pt-2">

                {/* Email */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-white/5 group hover:border-[#D4AF37]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email
                    </p>

                    <a
                      href="mailto:Info@auraglobalindustries.com"
                      className="text-sm font-bold text-white hover:text-[#D4AF37] transition-colors break-all block"
                    >
                      Info@auraglobalindustries.com
                    </a>

                    <p className="text-[11px] text-slate-400">
                      Response within 24 business hours
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-white/5 group hover:border-[#D4AF37]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Location
                    </p>

                    <p className="text-sm font-bold text-white">
                      Nazimabad, Karachi, Pakistan
                    </p>

                    <p className="text-[11px] text-slate-400">
                      Primary Textile & Apparel Manufacturing Zone
                    </p>
                  </div>
                </div>

                {/* Operating Schedule */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Factory Operations
                    </p>

                    <p className="text-sm text-slate-200 font-medium">
                      Monday – Saturday: 9:00 AM – 7:00 PM PKT
                    </p>

                    <p className="text-[11px] text-slate-400">
                      International inquiries processed daily
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct Email */}
              <div className="pt-2">
                <a
                  href="mailto:auraglobalindustries@gmail.com?subject=New%20Manufacturing%20Inquiry%20-%20Aura%20Global%20Industries"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>Launch Direct Email App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Social */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Official Channels & Video Showcases
                </p>

                <SocialLinks variant="expanded" />
              </div>

            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">

            <div className="dark-industrial-card rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl relative">

              <div className="mb-6 space-y-1">
                <span className="text-xs uppercase font-semibold text-[#D4AF37] tracking-wider">
                  Inquiry Submission Form
                </span>

                <h3 className="font-heading text-2xl font-bold text-white">
                  Send Your Project Specifications
                </h3>
              </div>

              {submitted ? (
                <div
                  id="contact-success-container"
                  className="py-10 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300"
                >

                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h4 className="font-heading text-2xl font-bold text-white">
                    Message Sent Successfully
                  </h4>

                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-[#D4AF37]/40 max-w-lg mx-auto">
                    <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                      Thank you for contacting Aura Global Industries. Our team will review your message and get back to you soon.
                    </p>
                  </div>

                  <p className="text-xs text-slate-400">
                    Your request was sent to{' '}
                    <strong className="text-slate-200">
                      auraglobalindustries@gmail.com
                    </strong>
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="gold-btn-gradient px-8 py-3 rounded-full text-xs font-semibold cursor-pointer shadow-lg"
                    >
                      Send Another Inquiry
                    </button>
                  </div>

                </div>
              ) : (

                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                    >
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>

                    <input
                      id="fullName"
                      name="full_name"
                      type="text"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Syed Ali / Procurement Manager"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                      >
                        Email Address <span className="text-[#D4AF37]">*</span>
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@brand.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                      >
                        Phone Number <span className="text-[#D4AF37]">*</span>
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +92 300 1234567"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                      />
                    </div>

                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                    >
                      Message <span className="text-[#D4AF37]">*</span>
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify your cap style (baseball, snapback, trucker, etc.), quantity requirements, fabric preference, custom logo embroidery or printing, and delivery timeframe..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-[#D4AF37] focus:outline-none text-sm text-white placeholder:text-slate-500 resize-none transition-colors"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-xs text-slate-400">
                      Destination:{' '}
                      <span className="text-[#D4AF37] font-semibold">
                        Info@auraglobalindustries.com
                      </span>
                    </p>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto gold-btn-gradient px-8 py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </div>

                </form>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};