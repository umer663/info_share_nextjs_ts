import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Try admin login first
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      if (!user.isActive) {
        return NextResponse.json(
          { error: "Account is deactivated" },
          { status: 401 }
        );
      }

      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      const token = await createSession({
        id: user.id,
        email: user.email,
        role: user.role,
        type: "admin",
      });

      await setSessionCookie(token);

      return NextResponse.json({
        type: "admin",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
        },
      });
    }

    // Try customer login
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (customer) {
      const valid = await comparePassword(password, customer.passwordHash);
      if (!valid) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      await prisma.customer.update({
        where: { id: customer.id },
        data: { lastActive: new Date() },
      });

      const token = await createSession({
        id: customer.id,
        email: customer.email,
        role: "CUSTOMER",
        type: "customer",
      });

      await setSessionCookie(token);

      return NextResponse.json({
        type: "customer",
        user: {
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,
          role: "CUSTOMER",
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
