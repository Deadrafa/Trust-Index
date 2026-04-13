"use client";

import { motion } from "framer-motion";

type ReputationEvent = {
  label: string;
  impact: number;
};

type UserCard = {
  id: number;
  name: string;
  role: string;
  score: number;
  status: string;
  verified?: boolean;
  top?: boolean;
  avatar: string;
  tags: string[];
  history: ReputationEvent[];
};

const users: UserCard[] = [
  {
    id: 1,
    name: "Алексей Воронов",
    role: "Предприниматель",
    score: 842,
    status: "Надёжный партнёр",
    verified: true,
    top: true,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    tags: ["сделки", "стартапы", "финансы"],
    history: [
      { label: "Успешная сделка", impact: 24 },
      { label: "Подтверждение партнёра", impact: 12 },
      { label: "Спор с клиентом", impact: -5 },
    ],
  },
  {
    id: 2,
    name: "София Миронова",
    role: "HR-консультант",
    score: 764,
    status: "Высокий уровень доверия",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    tags: ["рекрутинг", "команда", "оценка"],
    history: [
      { label: "Положительный отзыв", impact: 18 },
      { label: "Успешный найм", impact: 15 },
      { label: "Задержка ответа", impact: -4 },
    ],
  },
  {
    id: 3,
    name: "Илья Романов",
    role: "Продуктовый менеджер",
    score: 689,
    status: "Стабильная репутация",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    tags: ["product", "b2b", "growth"],
    history: [
      { label: "Закрыт проект", impact: 16 },
      { label: "Рекомендация команды", impact: 10 },
      { label: "Замечание по срокам", impact: -7 },
    ],
  },
];

function getScoreColor(score: number) {
  if (score >= 800) {
    return {
      ring: "stroke-emerald-400",
      glow: "from-emerald-500/20 to-cyan-500/20",
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
    };
  }

  if (score >= 650) {
    return {
      ring: "stroke-amber-400",
      glow: "from-amber-500/20 to-orange-500/20",
      badge: "bg-amber-500/15 text-amber-300 border-amber-400/20",
    };
  }

  return {
    ring: "stroke-rose-400",
    glow: "from-rose-500/20 to-pink-500/20",
    badge: "bg-rose-500/15 text-rose-300 border-rose-400/20",
  };
}

function ScoreRing({ score }: { score: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, (score / 1000) * 100));
  const offset = circumference - (progress / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      <svg className="-rotate-90 h-28 w-28" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-white/10"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          className={color.ring}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{score}</span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">
          рейтинг
        </span>
      </div>
    </div>
  );
}

function ReputationDelta({ impact }: { impact: number }) {
  const positive = impact >= 0;

  return (
    <span
      className={`inline-flex min-w-[58px] justify-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        positive
          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
          : "border-rose-400/20 bg-rose-500/10 text-rose-300"
      }`}
    >
      {positive ? "+" : ""}
      {impact}
    </span>
  );
}

export default function UserReputationCards() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_35%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.12),transparent_30%),linear-gradient(to_bottom,rgba(8,15,30,1),rgba(3,7,18,1))]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
            Профили доверия
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Репутация становится
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
              {" "}
              наглядной
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-white/65 sm:text-lg">
            Покажите, как выглядит цифровой профиль пользователя: рейтинг,
            подтверждённый статус, история действий и факторы доверия — в одном
            интерфейсе.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {users.map((user, index) => {
            const color = getScoreColor(user.score);

            return (
              <motion.article
                key={user.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${color.glow} opacity-0 blur-2xl transition duration-500 group-hover:opacity-100`}
                />

                <div className="relative h-full rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10"
                      />

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">
                            {user.name}
                          </h3>

                          {user.verified && (
                            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                              Verified
                            </span>
                          )}

                          {user.top && (
                            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                              Top 5%
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-white/60">{user.role}</p>
                        <p className="mt-2 text-sm font-medium text-white/85">
                          {user.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid items-center gap-6 sm:grid-cols-[auto,1fr]">
                    <div className="mx-auto sm:mx-0">
                      <ScoreRing score={user.score} />
                    </div>

                    <div>
                      <div
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${color.badge}`}
                      >
                        Индекс доверия
                      </div>

                      <p className="mt-3 text-sm leading-6 text-white/65">
                        Профиль сформирован на основе подтверждённых действий,
                        отзывов, истории взаимодействий и устойчивости поведения
                        в системе.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {user.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">
                        Последние изменения
                      </p>
                      <span className="text-xs text-white/40">за 30 дней</span>
                    </div>

                    <div className="space-y-3">
                      {user.history.map((event) => (
                        <div
                          key={event.label}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-2.5 w-2.5 rounded-full bg-white/40" />
                            <span className="truncate text-sm text-white/75">
                              {event.label}
                            </span>
                          </div>

                          <ReputationDelta impact={event.impact} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                        Прогноз
                      </p>
                      <p className="mt-1 text-sm font-medium text-emerald-300">
                        Потенциал роста доверия высокий
                      </p>
                    </div>

                    <button className="rounded-2xl border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/14">
                      Открыть профиль
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}