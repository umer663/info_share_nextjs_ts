"use client";
import { motion } from 'framer-motion';
import { Target, Users, BookOpen, Shield, Globe } from 'lucide-react';
import { fadeSlideUp, staggerContainer } from '@/utils/animationVariants';

export default function AboutPage() {
  const offerings = [
    { icon: BookOpen, title: "Curated Content", desc: "Expert-reviewed articles and tutorials." },
    { icon: Users, title: "Active Community", desc: "Engage with peers and industry leaders." },
    { icon: Shield, title: "Verified Sources", desc: "Reliable information you can trust." },
    { icon: Globe, title: "Global Reach", desc: "Available anywhere, anytime, on any device." }
  ];

  return (
    <div className="flex flex-col">
      {/* Page Banner */}
      <section className="bg-[var(--surface-primary)] border-b border-[var(--color-neutral-200)] py-16 text-center">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)]">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">About Info Share</h1>
          <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            We believe that high-quality knowledge should be accessible to everyone who wants to learn.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeSlideUp}
              className="rounded-[var(--radius-2xl)] overflow-hidden h-80 bg-[var(--color-primary-100)] relative"
            >
              <img src="https://picsum.photos/seed/mission/800/600" alt="Our Mission" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeSlideUp}
            >
              <div className="inline-flex items-center space-x-2 text-[var(--color-primary-600)] font-semibold mb-4">
                <Target className="w-5 h-5" />
                <span>Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                Democratizing access to premium technical knowledge
              </h2>
              <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                Founded in 2024, Info Share started with a simple idea: the best technical content is often scattered, hard to find, or locked behind exorbitant paywalls.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We're building a centralized hub where professionals can discover, share, and consume high-quality resources. Whether you are a beginner looking for direction or a senior developer seeking advanced patterns, we have something for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-[var(--surface-primary)]">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">What We Offer</h2>
            <p className="mt-4 text-[var(--text-secondary)]">Everything you need to accelerate your learning.</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {offerings.map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeSlideUp}
                className="bg-[var(--surface-secondary)] p-8 rounded-[var(--radius-xl)] border border-[var(--color-neutral-200)] text-center hover:shadow-[var(--shadow-md)] transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-600)] mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
