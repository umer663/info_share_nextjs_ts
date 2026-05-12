import { usersData, customersData } from '@/data/mock';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUsers() {
  await delay(50);
  return usersData;
}

export async function getCustomers() {
  await delay(50);
  return customersData;
}

