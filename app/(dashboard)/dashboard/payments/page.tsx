import { getPayments, getExpiringData } from '@/services/paymentService';
import { PaymentsPageClient } from './PaymentsPageClient';

export default async function PaymentsPage() {
  const paymentsData = await getPayments();
  const expiringData = await getExpiringData();

  return <PaymentsPageClient paymentsData={paymentsData} expiringData={expiringData} />;
}
