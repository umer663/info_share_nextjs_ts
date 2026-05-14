import { getCustomers } from '@/services/userService';
import { CustomersPageClient } from './CustomersPageClient';

export default async function CustomersPage() {
  const customersData = await getCustomers();

  return (
    <CustomersPageClient customersData={customersData} />
  );
}
