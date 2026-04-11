import { mkdir, appendFile, access } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

type WaitlistPayload = {
  name?: string;
  email?: string;
  useCase?: string;
  company?: string;
};

type RateEntry = {
  count: number;
  firstRequestAt: number;
};

const rateMap = new Map<string, RateEntry>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_BODY_SIZE = 10_000;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function applyRateLimit(ip: string): boolean {
  const now = Date.now();
  const current = rateMap.get(ip);

  if (!current) {
    rateMap.set(ip, { count: 1, firstRequestAt: now });
    return true;
  }

  if (now - current.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, firstRequestAt: now });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return false;
  }

  current.count += 1;
  rateMap.set(ip, current);
  return true;
}

function sanitizeText(value: string, maxLength: number): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function containsSuspiciousInput(value: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /<\/script>/i,
    /javascript:/i,
    /data:text\/html/i,
    /<iframe/i,
    /onerror=/i,
    /onload=/i,
    /eval\(/i,
    /new Function/i,
    /crypto\.subtle/i,
    /WebAssembly/i,
    /navigator\.hardwareConcurrency/i,
    /xmrig/i,
    /miner/i,
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(value));
}

async function ensureDataFile(filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });

  try {
    await access(filePath);
  } catch {
    await appendFile(filePath, "", "utf8");
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { message: "Неверный Content-Type" },
        { status: 415 }
      );
    }

    const ip = getClientIp(request);
    if (!applyRateLimit(ip)) {
      return NextResponse.json(
        { message: "Слишком много запросов. Попробуйте позже." },
        { status: 429 }
      );
    }

    const rawBody = await request.text();

    if (!rawBody || rawBody.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { message: "Слишком большой или пустой запрос" },
        { status: 400 }
      );
    }

    let body: WaitlistPayload;
    try {
      body = JSON.parse(rawBody) as WaitlistPayload;
    } catch {
      return NextResponse.json(
        { message: "Некорректный JSON" },
        { status: 400 }
      );
    }

    const honeypot = body.company?.trim() || "";
    if (honeypot) {
      return NextResponse.json(
        { message: "Заявка принята" },
        { status: 200 }
      );
    }

    const name = sanitizeText(body.name || "", 80);
    const email = sanitizeText(body.email || "", 120).toLowerCase();
    const useCase = sanitizeText(body.useCase || "", 1000);

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

    if (
      containsSuspiciousInput(name) ||
      containsSuspiciousInput(email) ||
      containsSuspiciousInput(useCase)
    ) {
      return NextResponse.json(
        { message: "Обнаружен недопустимый ввод" },
        { status: 400 }
      );
    }

    const entry = {
      name,
      email,
      useCase,
      ip,
      userAgent: request.headers.get("user-agent") || "",
      createdAt: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), "data", "leads.jsonl");
    await ensureDataFile(filePath);
    await appendFile(filePath, `${JSON.stringify(entry)}\n`, "utf8");

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