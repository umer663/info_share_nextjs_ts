import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Admin account ──────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@infoshare.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        fullName: "Super Admin",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
        isActive: true,
        isProtected: true,
      },
    });
    console.log(`Protected super admin created:`);
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
  } else {
    console.log(`Admin account already exists: ${adminEmail}`);
  }

  // ── App Settings ───────────────────────────────────
  const defaultSettings = [
    { key: "site_name", value: '"InfoShare"', type: "string", description: "Site display name" },
    { key: "max_free_content", value: "5", type: "number", description: "Free preview limit per customer" },
    { key: "subscription_price", value: "9.99", type: "number", description: "Monthly subscription price (USD)" },
  ];

  for (const setting of defaultSettings) {
    await prisma.appSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, type: setting.type, description: setting.description },
      create: setting,
    });
  }
  console.log(`App settings seeded (${defaultSettings.length} entries).`);

  // ── Role Permissions ───────────────────────────────
  const defaultPermissions = [
    // ADMIN — full access
    { role: "ADMIN", resource: "/dashboard" },
    { role: "ADMIN", resource: "/dashboard/content-hub" },
    { role: "ADMIN", resource: "/dashboard/users" },
    { role: "ADMIN", resource: "/dashboard/customers" },
    { role: "ADMIN", resource: "/dashboard/payments" },
    // MANAGER — limited access
    { role: "MANAGER", resource: "/dashboard" },
    { role: "MANAGER", resource: "/dashboard/content-hub" },
    { role: "MANAGER", resource: "/dashboard/customers" },
    // CUSTOMER — customer-facing pages only
    { role: "CUSTOMER", resource: "/account" },
    { role: "CUSTOMER", resource: "/content" },
  ];

  for (const perm of defaultPermissions) {
    await prisma.rolePermission.upsert({
      where: { role_resource: { role: perm.role, resource: perm.resource } },
      update: { canAccess: true },
      create: { ...perm, canAccess: true },
    });
  }
  console.log(`Role permissions seeded (${defaultPermissions.length} entries).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
