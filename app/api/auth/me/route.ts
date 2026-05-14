import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAllowedRoutes } from "@/lib/permissions";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const allowedRoutes = await getAllowedRoutes(session.role);

  if (session.type === "admin") {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        avatarUrl: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: { ...user, allowedRoutes }, type: "admin" });
  }

  const customer = await prisma.customer.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      subscriptionStatus: true,
      freeContentRemaining: true,
      memberSince: true,
      lastActive: true,
      contentViewedCount: true,
      isEmailVerified: true,
      createdAt: true,
    },
  });
  if (!customer) {
    return NextResponse.json(
      { error: "Customer not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ user: { ...customer, allowedRoutes }, type: "customer" });
}
