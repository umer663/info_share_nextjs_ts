import { getCustomers } from '@/services/userService';
import { getPaymentHistory } from '@/services/paymentService';
import { CustomersPageClient } from './CustomersPageClient';

export default async function CustomersPage() {
  const customersData = await getCustomers();
  const paymentHistory = await getPaymentHistory();

  return (
    <CustomersPageClient 
      customersData={customersData} 
      paymentHistory={paymentHistory} 
    />
  );
}
