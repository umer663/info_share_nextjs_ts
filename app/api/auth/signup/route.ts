import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const customer = await prisma.customer.create({
      data: {
        fullName,
        email,
        passwordHash,
        subscriptionStatus: "FREE",
        freeContentRemaining: 5,
        memberSince: new Date(),
      },
    });

    await prisma.activityLog.create({
      data: {
        type: "new_customer",
        description: `New customer registered: ${fullName} (${email})`,
        customerId: customer.id,
      },
    });

    const token = await createSession({
      id: customer.id,
      email: customer.email,
      role: "CUSTOMER",
      type: "customer",
    });

    await setSessionCookie(token);

    return NextResponse.json(
      {
        user: {
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,
          role: "CUSTOMER",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
