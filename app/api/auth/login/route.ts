import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password, loginType } = await request.json();

    if (!email || !password || !loginType) {
      return NextResponse.json(
        { error: "Email, password, and login type are required" },
        { status: 400 }
      );
    }

    if (loginType === "admin") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.isActive) {
        return NextResponse.json(
          { error: "Invalid email or password" },
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
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
        },
      });
    }

    if (loginType === "customer") {
      const customer = await prisma.customer.findUnique({ where: { email } });
      if (!customer) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

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
        user: {
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,
          role: "CUSTOMER",
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid login type. Use 'admin' or 'customer'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
