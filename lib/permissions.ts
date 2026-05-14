import { prisma } from "@/lib/prisma";

export async function getAllowedRoutes(role: string): Promise<string[]> {
  const permissions = await prisma.rolePermission.findMany({
    where: { role, canAccess: true },
    select: { resource: true },
  });
  return permissions.map((p) => p.resource);
}
