"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { fadeSlideUp, staggerContainer, fadeIn, scaleIn } from '@/utils/animationVariants';
import { useEffect, useState } from 'react';

// Simple counter component
const Counter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
};

export const HomePageClient = ({ stats, featuredContent }: { stats: any[], featuredContent: any[] }) => {
  // Parse numeric values from stats
  const parseNum = (val: string) => parseInt(val.replace(/[^0-9]/g, '')) || 0;
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-primary-50)] to-[var(--surface-primary)] pt-24 pb-32">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--color-primary-300)] blur-3xl animate-pulse"></div>
          <div className="absolute top-48 -right-24 h-96 w-96 rounded-full bg-[var(--color-info-light)] blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)] relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.h1 
              variants={fadeSlideUp}
              className="max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl"
            >
              Share Knowledge, <span className="text-[var(--color-primary-600)]">Empower Everyone</span>
            </motion.h1>
            <motion.p 
              variants={fadeSlideUp}
              className="mt-6 max-w-2xl text-lg text-[var(--text-secondary)]"
            >
              Discover premium articles, video tutorials, and in-depth guides curated by industry experts. Join our community to elevate your skills today.
            </motion.p>
            <motion.div 
              variants={fadeSlideUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/content">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Browse Content
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-[var(--color-neutral-200)] bg-[var(--surface-primary)] py-12">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-4xl font-bold text-[var(--color-primary-600)]">
                  {stat.value.includes('$') ? '$' : ''}
                  <Counter end={parseNum(stat.value)} />
                  {stat.value.includes('K') ? 'K+' : '+'}
                </span>
                <span className="mt-2 text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-24 bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">Featured Content</h2>
              <p className="mt-2 text-[var(--text-secondary)]">Hand-picked resources for you</p>
            </div>
            <Link href="/content" className="hidden sm:block">
              <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>View all</Button>
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredContent.map((item, index) => (
              <motion.div key={item.id} variants={fadeSlideUp}>
                <Card interactive padding="none" className="overflow-hidden h-full flex flex-col relative group">
                  <div className="h-48 bg-[var(--color-neutral-200)] relative">
                    <img src={`https://picsum.photos/seed/${index + 1}/800/600`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {item.isPremium && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="warning" className="shadow-sm">Premium</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1 bg-[var(--surface-primary)]">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4 flex-1">Deep dive into modern software architecture and design patterns to build scalable applications.</p>
                    <div className="flex items-center justify-between text-sm text-[var(--text-muted)] mt-auto pt-4 border-t border-[var(--color-neutral-100)]">
                      <div className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> 5 min read</div>
                      <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-[var(--color-warning)]" /> 4.9</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[var(--surface-primary)]">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)] text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-0.5 bg-[var(--color-neutral-200)] -z-10"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center text-[var(--color-primary-600)] mb-6 shadow-sm border border-[var(--color-primary-100)]">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Browse Content</h3>
              <p className="text-[var(--text-secondary)]">Explore our vast library of free articles and resources available to everyone.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[var(--color-info-light)] flex items-center justify-center text-[var(--color-info-dark)] mb-6 shadow-sm border border-[var(--color-info)]">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Join Community</h3>
              <p className="text-[var(--text-secondary)]">Create a free account to track your progress and interact with other learners.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[var(--color-warning-light)] flex items-center justify-center text-[var(--color-warning-dark)] mb-6 shadow-sm border border-[var(--color-warning)]">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Go Premium</h3>
              <p className="text-[var(--text-secondary)]">Unlock unlimited access to all premium courses, videos, and advanced tutorials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-primary-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="mx-auto max-w-4xl px-[var(--space-4)] md:px-[var(--space-8)] text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to unlock premium content?</h2>
            <p className="text-[var(--color-primary-200)] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join hundreds of professionals who are advancing their careers with our premium resources.
            </p>
            <Button size="lg" className="bg-white text-[var(--color-primary-900)] hover:bg-[var(--color-primary-50)]">
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
