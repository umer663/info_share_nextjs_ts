"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit, Trash2, Power, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { Table } from '@/components/common/Table/Table';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { Avatar } from '@/components/common/Avatar/Avatar';

export const UsersManagementClient = ({ usersData }: { usersData: any[] }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MANAGER');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
        <form className="space-y-6" onSubmit={async (e) => {
          e.preventDefault();
          setError('');

          if (!fullName || !email || !password) {
            setError('All fields are required');
            return;
          }

          if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
          }

          setIsSubmitting(true);

          try {
            const res = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fullName, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
              setError(data.error || 'Failed to create user');
              return;
            }

            setFullName('');
            setEmail('');
            setPassword('');
            setRole('MANAGER');
            setIsModalOpen(false);
            router.refresh();
          } catch {
            setError('Network error. Please try again.');
          } finally {
            setIsSubmitting(false);
          }
        }}>
          <Input label="Full Name" required placeholder="Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input label="Email Address" type="email" required placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
          
          <Select 
            label="Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={[
              { value: 'ADMIN', label: 'Admin' },
              { value: 'MANAGER', label: 'Manager' },
            ]}
          />

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-[var(--color-neutral-200)]">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Save User
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
