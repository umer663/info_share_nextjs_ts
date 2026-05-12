"use client";
import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { Table } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { Toggle } from '@/components/common/Toggle/Toggle';

export const ContentHubClient = ({ contentData }: { contentData: any[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { key: 'id', header: '#' },
    { key: 'title', header: 'Title', render: (item: any) => <span className="font-medium">{item.title}</span> },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: any) => (
        <Badge 
          variant={item.status === 'Published' ? 'success' : item.status === 'Draft' ? 'warning' : 'secondary'}
        >
          {item.status}
        </Badge>
      )
    },
    { 
      key: 'isPremium', 
      header: 'Premium',
      render: (item: any) => item.isPremium ? '✅' : '❌'
    },
    { key: 'views', header: 'Views' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: any) => (
        <div className="flex space-x-2">
          <button className="text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors">
            <Edit className="h-4 w-4" />
          </button>
          <button className="text-[var(--text-secondary)] hover:text-[var(--color-error)] transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Content Hub</h1>
          <p className="text-[var(--text-secondary)]">Manage your articles, videos, and resources.</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
          Add Content
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--color-neutral-200)] flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-96">
          <Input 
            placeholder="Search content..." 
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </div>
        <div className="w-full md:w-48">
          <Select 
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
              { value: 'archived', label: 'Archived' },
            ]}
          />
        </div>
        <div className="w-full md:w-48">
          <Select 
            options={[
              { value: '', label: 'All Types' },
              { value: 'premium', label: 'Premium Only' },
              { value: 'free', label: 'Free Only' },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <Table 
        columns={columns}
        data={contentData}
        keyExtractor={(item) => item.id}
      />

      {/* Add Content Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Content"
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <Input label="Content Title" required placeholder="Enter title" />
          
          <div className="flex flex-col space-y-[var(--space-1)]">
            <label className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">
              Content Description
            </label>
            <textarea 
              className="flex min-h-[120px] w-full rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] bg-[var(--surface-primary)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] placeholder:text-[var(--text-muted)] resize-y"
              placeholder="Write a brief description..."
              required
            />
          </div>

          <div className="space-y-[var(--space-1)]">
            <label className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">
              Content Image (Optional)
            </label>
            <div className="mt-1 flex justify-center rounded-lg border border-dashed border-[var(--color-neutral-300)] px-6 py-8 hover:bg-[var(--color-neutral-50)] transition-colors cursor-pointer">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-[var(--text-muted)]">
                  <span className="relative cursor-pointer rounded-md bg-transparent font-semibold text-[var(--color-primary-600)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-primary-600)] focus-within:ring-offset-2 hover:text-[var(--color-primary-500)]">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-[var(--text-muted)]">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <Toggle label="Is Premium Content" description="Only subscribers can view this content" />

          <div className="flex justify-end space-x-3 pt-4 border-t border-[var(--color-neutral-200)]">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Save Content
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
