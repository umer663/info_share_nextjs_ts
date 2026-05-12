"use client";
import { useState, useMemo } from 'react';
import { Search, Lock, BookOpen, Star, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button/Button';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { fadeSlideUp, staggerContainer } from '@/utils/animationVariants';

export const ContentPageClient = ({ contentData }: { contentData: any[] }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'premium'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const viewsCount = 6; // Mock data to show premium lock banner

  // Filter the content based on activeTab and searchQuery
  const filteredContent = useMemo(() => {
    return contentData.filter(item => {
      const matchesTab = activeTab === 'all' 
        ? true 
        : activeTab === 'free' ? !item.isPremium : item.isPremium;
        
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
  }, [contentData, activeTab, searchQuery]);

  // Simple pagination logic for demonstration
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredContent.length / itemsPerPage));
  const paginatedContent = filteredContent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col bg-[var(--surface-secondary)] min-h-screen pb-20">
      {/* Page Banner */}
      <section className="bg-[var(--surface-primary)] border-b border-[var(--color-neutral-200)] py-12">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Explore Our Content</h1>
          <p className="mt-2 text-[var(--text-secondary)] text-lg">
            Browse our library of tutorials, guides, and premium resources.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--max-content-width)] w-full px-[var(--space-4)] md:px-[var(--space-8)] mt-8">
        
        {/* Free Limit Banner */}
        {viewsCount >= 5 && (
          <div className="mb-8 rounded-xl bg-[var(--color-warning-light)] border border-[var(--color-warning)] p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="p-3 bg-white rounded-full text-[var(--color-warning-dark)] shadow-sm">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-warning-dark)] text-lg">Free Content Limit Reached</h3>
                <p className="text-[var(--color-warning-dark)] opacity-90">You've viewed your 5 free premium items. Subscribe to unlock everything.</p>
              </div>
            </div>
            <Button className="bg-[var(--color-warning-dark)] text-white hover:bg-[#78350f] border-none whitespace-nowrap">
              Subscribe Now - $9.99/mo
            </Button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--color-neutral-200)] shadow-sm mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/3">
            <Input 
              placeholder="Search content..." 
              leftIcon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex w-full md:w-auto bg-[var(--surface-secondary)] p-1 rounded-lg">
            <button 
              onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
              className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'all' ? 'bg-white shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              All
            </button>
            <button 
              onClick={() => { setActiveTab('free'); setCurrentPage(1); }}
              className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'free' ? 'bg-white shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              Free
            </button>
            <button 
              onClick={() => { setActiveTab('premium'); setCurrentPage(1); }}
              className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'premium' ? 'bg-white shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              Premium
            </button>
          </div>
          <div className="w-full md:w-48 md:ml-auto flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[var(--text-muted)]" />
            <Select 
              options={[
                { value: 'newest', label: 'Newest First' },
                { value: 'popular', label: 'Most Popular' },
                { value: 'oldest', label: 'Oldest First' },
              ]}
            />
          </div>
        </div>

        {/* Content Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {paginatedContent.map((item, index) => (
            <motion.div key={item.id} variants={fadeSlideUp}>
              <Card interactive padding="none" className="overflow-hidden h-full flex flex-col group relative">
                {item.isPremium && viewsCount >= 5 && (
                  <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-4">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Premium Content</h4>
                    <p className="text-white/80 text-sm mb-4">Subscribe to unlock this resource</p>
                    <Button size="sm" variant="primary">Unlock Access</Button>
                  </div>
                )}
                <div className="h-48 bg-[var(--color-neutral-200)] relative">
                  <img src={`https://picsum.photos/seed/${parseInt(item.id) + 10}/800/600`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {item.isPremium && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="warning" className="shadow-sm">Premium</Badge>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1 bg-[var(--surface-primary)]">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4 flex-1 line-clamp-3">
                    Learn how to leverage this technology to build faster, more interactive applications with modern architecture patterns.
                  </p>
                  <div className="flex items-center justify-between text-sm text-[var(--text-muted)] mt-auto pt-4 border-t border-[var(--color-neutral-100)]">
                    <div className="flex items-center font-medium"><BookOpen className="w-4 h-4 mr-1.5" /> 12 min</div>
                    <div className="flex items-center font-medium">👁 {item.views || '1.2K'}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {paginatedContent.length === 0 && (
            <div className="col-span-full py-12 text-center text-[var(--text-secondary)]">
              No content found matching your filters.
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
