import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, MessageSquare, Facebook, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { config, selectedServiceForInquiry } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Logo Design',
    budget: 'Standard ($200 - $500)',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedServiceForInquiry) {
      setFormData((prev) => ({
        ...prev,
        service: selectedServiceForInquiry,
        message: prev.message || `Hi, I would like to inquire about your ${selectedServiceForInquiry} service for my brand.`,
      }));
    }
  }, [selectedServiceForInquiry]);

  const handleCopyEmail = () => {
    if (config.contactEmail) {
      navigator.clipboard.writeText(config.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyPhone = () => {
    const numToCopy = config.contactPhone || '01623911123';
    navigator.clipboard.writeText(numToCopy);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const getCleanPhone = (phoneStr: string) => {
    return phoneStr.replace(/[^\d+]/g, '');
  };

  const getDialNumber = (phoneStr: string) => {
    const cleaned = (phoneStr || '01623911123').replace(/[^\d+]/g, '');
    if (cleaned.startsWith('01') && cleaned.length === 11) {
      return `+88${cleaned}`;
    }
    return cleaned;
  };

  const getWhatsAppLink = () => {
    const raw = config.whatsappNumber || config.contactPhone || '01623911123';
    let cleanNum = raw.replace(/[^\d]/g, '');
    if (cleanNum.startsWith('01') && cleanNum.length === 11) {
      cleanNum = '88' + cleanNum;
    }
    const text = encodeURIComponent(
      `Hello ${config.brandName || 'VIVID PIXELS'}, I saw your portfolio and would like to discuss a design project.`
    );
    return `https://wa.me/${cleanNum}?text=${text}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Logo Design',
        budget: 'Standard ($200 - $500)',
        message: '',
      });
    }, 6000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#F4F4F4] text-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#FF5A1F] font-heading font-bold text-xs sm:text-sm tracking-widest uppercase block mb-2">
            CONTACT
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#0A0A0A] tracking-tight leading-none mb-4">
            LET’S WORK TOGETHER
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans font-medium">
            “Have a project in mind? Let’s turn your idea into a powerful visual experience.”
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card */}
            <div className="light-card p-6 flex items-start justify-between gap-4 bg-white shadow-sm hover:border-[#FF5A1F] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 flex items-center justify-center text-[#FF5A1F] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="font-heading font-bold text-base text-[#0A0A0A] hover:text-[#FF5A1F] transition-colors break-all inline-block"
                  >
                    {config.contactEmail}
                  </a>
                  <p className="text-[11px] text-gray-400 mt-0.5">Inquiries & project briefs</p>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition-colors shrink-0 cursor-pointer"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp & Call Card */}
            <div className="light-card p-6 flex flex-col gap-4 bg-white shadow-sm hover:border-emerald-500 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Phone & WhatsApp
                    </span>
                    <a
                      href={`tel:${getDialNumber(config.contactPhone)}`}
                      className="font-heading font-bold text-lg text-[#0A0A0A] hover:text-emerald-600 transition-colors inline-block tracking-tight"
                    >
                      {config.contactPhone}
                    </a>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Direct Voice Call & WhatsApp ({config.contactPhone?.startsWith('01') ? `+880 ${config.contactPhone.slice(1, 5)}-${config.contactPhone.slice(5)}` : config.contactPhone})
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition-colors shrink-0 cursor-pointer"
                  title="Copy phone number to clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                <a
                  href={`tel:${getDialNumber(config.contactPhone)}`}
                  className="flex-1 min-w-[130px] px-3.5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call {config.contactPhone}</span>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[130px] px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="light-card p-6 flex items-start gap-4 bg-white shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/25 flex items-center justify-center text-[#FF5A1F] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Location & Availability
                </span>
                <p className="font-heading font-bold text-base text-[#0A0A0A]">{config.location}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Worldwide Remote Collaboration</p>
              </div>
            </div>

            {/* Official Facebook Page Card */}
            {config.socials?.facebook && (
              <div className="light-card p-5 flex items-center justify-between gap-4 bg-white shadow-sm hover:border-[#1877F2] transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/25 flex items-center justify-center text-[#1877F2] shrink-0">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      Facebook Page
                    </span>
                    <span className="font-heading font-bold text-sm text-[#0A0A0A]">
                      {config.brandName || 'VIVID PIXELS'}
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">Official Page & Updates</p>
                  </div>
                </div>
                <a
                  href={config.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <span>Visit Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Response Guarantee Box */}
            <div className="p-5 rounded-2xl bg-[#0A0A0A] text-white flex items-center gap-3 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-[#FF5A1F] shrink-0" />
              <p className="text-xs text-white/80 leading-relaxed">
                <strong className="text-white">Fast Response:</strong> Messages are typically reviewed and answered within 2 to 6 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="light-card p-6 sm:p-8 bg-white shadow-xl shadow-black/5">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-gray-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to <strong>{config.brandName || 'VIVID PIXELS'}</strong>. I will review your project requirements and respond promptly.
                  </p>
                  <div className="pt-4">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                    >
                      <span>Also Send Via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Project / Service Category *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                      >
                        <option value="Logo Design">Logo Design</option>
                        <option value="Brand Identity">Brand Identity System</option>
                        <option value="Packaging Design">Packaging & Label Design</option>
                        <option value="Social Media Design">Social Media & Ad Creatives</option>
                        <option value="Poster Design">Poster / Key Visual Design</option>
                        <option value="Brochure Design">Brochure & Editorial Catalog</option>
                        <option value="Print Design">Commercial Print Collateral</option>
                        <option value="Other Design Inquiry">Other Custom Design Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                      >
                        <option value="Starter ($100 - $300)">Starter ($100 - $300)</option>
                        <option value="Standard ($300 - $800)">Standard ($300 - $800)</option>
                        <option value="Premium ($800 - $2,500)">Premium ($800 - $2,500)</option>
                        <option value="Enterprise / Retainer ($2,500+)">Enterprise / Retainer ($2,500+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone or WhatsApp Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 01623911123 or +880 1623-911123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A1F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Project Details & Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your business, the goals of this design, desired deliverables, and any deadlines..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F4F4] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FF5A1F] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#FF5A1F] hover:bg-[#ff703a] text-black font-heading font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-[#FF5A1F]/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};