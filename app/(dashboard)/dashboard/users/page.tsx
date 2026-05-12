import { getUsers } from '@/services/userService';
import { UsersManagementClient } from './UsersManagementClient';

export default async function UsersManagementPage() {
  const usersData = await getUsers();

  return <UsersManagementClient usersData={usersData} />;
}
