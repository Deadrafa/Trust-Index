import dns from "node:dns";
import { NextResponse } from "next/server";

dns.setDefaultResultOrder("ipv4first");

type WaitlistPayload = {
  name?: string;
  email?: string;
  useCase?: string;
  company?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistPayload;

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const useCase = body.useCase?.trim() || "";
    const company = body.company?.trim() || "";

    if (company) {
      return NextResponse.json({ message: "Заявка отправлена." });
    }

    if (!name || !email || !useCase) {
      return NextResponse.json(
        { message: "Заполните имя, email и сценарий применения." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Введите корректный email." },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { message: "Не настроена отправка заявок." },
        { status: 500 }
      );
    }

    const text = [
      "🔥 <b>Новая заявка с лендинга</b>",
      "",
      `👤 <b>Имя:</b> ${escapeHtml(name)}`,
      `📧 <b>Email:</b> ${escapeHtml(email)}`,
      "",
      `🧩 <b>Сценарий:</b>`,
      escapeHtml(useCase),
    ].join("\n");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    let response: Response;

    try {
      response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
          cache: "no-store",
          signal: controller.signal,
        }
      );
    } finally {
      clearTimeout(timeout);
    }

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error("Telegram error:", data);
      return NextResponse.json(
        { message: data.description || "Не удалось отправить заявку." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Заявка отправлена. Спасибо!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist route error:", error);

    return NextResponse.json(
      { message: "Произошла ошибка при отправке заявки." },
      { status: 500 }
    );
  }
}
