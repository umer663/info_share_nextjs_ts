import { paymentsData, paymentHistory, expiringData } from '@/data/mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPayments() {
  await delay(50);
  return paymentsData;
}

export async function getPaymentHistory() {
  await delay(50);
  return paymentHistory;
}

export async function getExpiringData() {
  await delay(50);
  return expiringData;
}

