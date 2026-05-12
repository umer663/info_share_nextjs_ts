"use client";
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Power } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { Table } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { Avatar } from '@/components/common/Avatar/Avatar';

export const UsersManagementClient = ({ usersData }: { usersData: any[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { 
      key: 'avatar', 
      header: 'User',
      render: (item: any) => (
        <div className="flex items-center space-x-3">
          <Avatar fallback={item.name} size="sm" />
          <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
        </div>
      )
    },
    { key: 'email', header: 'Email', render: (item: any) => <span className="text-[var(--text-secondary)]">{item.email}</span> },
    { 
      key: 'role', 
      header: 'Role',
      render: (item: any) => (
        <Badge variant={item.role === 'Admin' ? 'primary' : 'secondary'}>
          {item.role}
        </Badge>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: any) => (
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${item.status === 'Active' ? 'bg-[var(--color-success)]' : 'bg-[var(--color-error)]'}`}></div>
          <span>{item.status}</span>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: any) => (
        <div className="flex space-x-2">
          <button className="text-[var(--text-secondary)] hover:text-[var(--color-primary-600)] transition-colors p-1" title="Edit User">
            <Edit className="h-4 w-4" />
          </button>
          <button className="text-[var(--text-secondary)] hover:text-[var(--color-warning)] transition-colors p-1" title="Toggle Active">
            <Power className="h-4 w-4" />
          </button>
          <button className="text-[var(--text-secondary)] hover:text-[var(--color-error)] transition-colors p-1" title="Delete User">
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
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Users Management</h1>
          <p className="text-[var(--text-secondary)]">Manage admin and manager accounts.</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--color-neutral-200)] flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-96">
          <Input 
            placeholder="Search users..." 
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </div>
        <div className="w-full md:w-48">
          <Select 
            options={[
              { value: '', label: 'All Roles' },
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
            ]}
          />
        </div>
        <div className="w-full md:w-48">
          <Select 
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <Table 
        columns={columns}
        data={usersData}
        keyExtractor={(item) => item.id}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New User"
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <Input label="Full Name" required placeholder="Jane Doe" />
          <Input label="Email Address" type="email" required placeholder="jane@example.com" />
          <Input label="Password" type="password" required placeholder="••••••••" />
          
          <Select 
            label="Role"
            required
            options={[
              { value: 'ADMIN', label: 'Admin' },
              { value: 'MANAGER', label: 'Manager' },
            ]}
          />

          <div className="flex justify-end space-x-3 pt-4 border-t border-[var(--color-neutral-200)]">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Save User
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
