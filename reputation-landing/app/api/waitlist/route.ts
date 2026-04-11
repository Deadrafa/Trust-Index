import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type WaitlistPayload = {
  name?: string;
  email?: string;
  useCase?: string;
  company?: string; 
};

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { message: "Неверный Content-Type" },
        { status: 415 }
      );
    }

    const rawBody = await request.text();

    if (!rawBody) {
      return NextResponse.json(
        { message: "Пустой запрос" },
        { status: 400 }
      );
    }


    let body: WaitlistPayload;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { message: "Некорректный JSON" },
        { status: 400 }
      );
    }

  
    if (body.company?.trim()) {
      return NextResponse.json(
        { message: "Заявка принята" },
        { status: 200 }
      );
    }


    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const useCase = body.useCase?.trim();

    if (!name || !email || !useCase) {
      return NextResponse.json(
        { message: "Заполните все поля" },
        { status: 400 }
      );
    }

 
    const emailIsValid =
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);

    if (!emailIsValid) {
      return NextResponse.json(
        { message: "Введите корректный email" },
        { status: 400 }
      );
    }


    const entry = {
      name,
      email,
      useCase,
      ip:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown",
      userAgent: request.headers.get("user-agent") || "",
      createdAt: new Date().toISOString(),
    };


    console.log("=== NEW WAITLIST LEAD ===");
    console.log(JSON.stringify(entry, null, 2));
    console.log("=== END ===");

    return NextResponse.json(
      { message: "Заявка принята" },
      { status: 200 }
    );
  } catch (error) {
    console.error("WAITLIST ERROR:", error);

    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    );
  }
}