'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2, Clock, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { useSoundFX } from '@/hooks/useSoundFX';
import { CustomDarkSelect } from '@/components/ui/CustomDarkSelect';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Please provide your full name (at least 2 characters).' }),
  email: z.string().email({ message: 'Please provide a valid business email address.' }),
  projectType: z.string().min(1, { message: 'Please select a project type.' }),
  budget: z.string().min(1, { message: 'Please select an estimated budget range.' }),
  message: z.string().min(10, { message: 'Please provide brief details about your vision (at least 10 characters).' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { playClick, playHover } = useSoundFX();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    playClick();
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Inquiry submitted:', data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-silver">
              Start A Partnership
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s Build Something{' '}
            <span className="gradient-text-accent">Extraordinary.</span>
          </h2>

          <p className="text-base text-brand-silver/80 font-light leading-relaxed">
            Have an upcoming digital product, web application, or design system that demands exceptional craft? Reach out directly via WhatsApp, email, or LinkedIn.
          </p>

          <div className="space-y-3.5 pt-3">
            {/* Direct Phone / WhatsApp */}
            <a
              href="https://wa.me/923174804970"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 hover:border-emerald-500/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver/50">
                  Phone &amp; WhatsApp
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  +92 317 4804970
                </span>
              </div>
            </a>

            {/* Direct Email */}
            <a
              href="mailto:sawerasaghir30@gmail.com"
              onMouseEnter={playHover}
              className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 hover:border-brand-magenta/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-magenta/10 border border-brand-magenta/20 flex items-center justify-center text-brand-magenta group-hover:scale-105 transition-transform shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver/50">
                  Direct Email
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-brand-magenta transition-colors">
                  sawerasaghir30@gmail.com
                </span>
              </div>
            </a>

            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/sawerasaghir/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 hover:border-brand-violet/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet group-hover:scale-105 transition-transform shrink-0">
                <Linkedin size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver/50">
                  LinkedIn Profile
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-brand-violet transition-colors">
                  linkedin.com/in/sawerasaghir
                </span>
              </div>
            </a>

            {/* Response Time Guarantee */}
            <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
              <Clock className="text-brand-violet shrink-0" size={17} />
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-brand-silver/70">Response Time</span>
                <span className="text-xs font-mono text-emerald-400 font-medium">Within 24 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-sm text-brand-silver/80 max-w-md mx-auto">
                  Thank you for reaching out, Sawera will review your project requirements and respond within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full glass-panel text-xs font-mono text-white hover:bg-white/10"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-silver/70">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      {...register('name')}
                      className="w-full px-4 py-3 rounded-xl glass-pill text-white placeholder-brand-silver/30 border border-white/10 focus:border-brand-violet focus:outline-none focus:ring-1 focus:ring-brand-violet text-sm transition-all"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 font-mono">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-brand-silver/70">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      {...register('email')}
                      className="w-full px-4 py-3 rounded-xl glass-pill text-white placeholder-brand-silver/30 border border-white/10 focus:border-brand-violet focus:outline-none focus:ring-1 focus:ring-brand-violet text-sm transition-all"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 font-mono">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Project Scope Custom Dark Select */}
                  <CustomDarkSelect
                    label="Project Scope"
                    required
                    value={watch('projectType') || ''}
                    placeholder="Select Scope"
                    error={errors.projectType?.message}
                    onChange={(val) => setValue('projectType', val, { shouldValidate: true })}
                    options={[
                      { value: 'Full Product Design & Web Dev', label: 'Full UI/UX & Web Development' },
                      { value: 'EdTech & AI Web Platform', label: 'EdTech / AI Platform Development' },
                      { value: 'Enterprise Design System', label: 'Enterprise Design System' },
                      { value: 'Design & UX Audit', label: 'UX Audit & Conversion Optimization' },
                    ]}
                  />

                  {/* Budget Custom Dark Select */}
                  <CustomDarkSelect
                    label="Estimated Budget"
                    required
                    value={watch('budget') || ''}
                    placeholder="Select Range"
                    error={errors.budget?.message}
                    onChange={(val) => setValue('budget', val, { shouldValidate: true })}
                    options={[
                      { value: '$1,000 - $3,000', label: '$1,000 - $3,000' },
                      { value: '$3,000 - $7,000', label: '$3,000 - $7,000' },
                      { value: '$7,000+', label: '$7,000+ (Comprehensive)' },
                    ]}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-brand-silver/70">
                    Project Goals &amp; Context *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your product, timeline, and primary objectives..."
                    {...register('message')}
                    className="w-full px-4 py-3 rounded-xl glass-pill text-white placeholder-brand-silver/30 border border-white/10 focus:border-brand-violet focus:outline-none focus:ring-1 focus:ring-brand-violet text-sm transition-all resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 font-mono">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHover}
                  className="w-full py-4 rounded-xl gradient-btn-primary text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-purple/30 disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Project Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
