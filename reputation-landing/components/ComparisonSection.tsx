"use client";

import { motion } from "framer-motion";

const withoutSystem = [
  "Отзывы и сигналы разбросаны по разным источникам",
  "Сложно быстро понять, насколько человек надёжен",
  "Нет прозрачной истории изменений",
  "Решение принимается почти вслепую",
];

const withSystem = [
  "Единый профиль доверия с понятной структурой",
  "Trust score и ключевые сигналы видны сразу",
  "Есть история изменений и контекст оценки",
  "Больше оснований для уверенного решения",
];

export default function ComparisonSection() {
  return (
    <section className="border-y border-white/8 bg-[#0b1628]/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-2xl"
        >
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
            Разница в подходе
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Без структуры доверия и с прозрачным профилем
          </h2>
          <p className="mt-4 text-white/60">
            Один из самых важных эффектов продукта — убрать хаос из сигналов
            доверия и превратить их в понятный инструмент для выбора,
            сотрудничества и оценки риска.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ComparisonCard
            title="Без Trust Index"
            badge="разрозненно"
            tone="muted"
            items={withoutSystem}
          />

          <ComparisonCard
            title="С Trust Index"
            badge="прозрачно"
            tone="accent"
            items={withSystem}
          />
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  badge,
  items,
  tone,
}: {
  title: string;
  badge: string;
  items: string[];
  tone: "muted" | "accent";
}) {
  const isAccent = tone === "accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4 }}
      className={`rounded-3xl border p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] sm:p-8 ${
        isAccent
          ? "border-[#3b82f6]/15 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(12,23,42,0.88))]"
          : "border-white/8 bg-[#0c172a]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isAccent
              ? "border border-emerald-400/15 bg-emerald-400/10 text-emerald-300"
              : "border border-white/10 bg-white/[0.04] text-white/55"
          }`}
        >
          {badge}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: isAccent ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#08101d] px-4 py-4"
          >
            <div
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                isAccent
                  ? "border border-blue-400/20 bg-blue-400/10 text-blue-200"
                  : "border border-white/10 bg-white/[0.05] text-white/55"
              }`}
            >
              {isAccent ? "✓" : "–"}
            </div>

            <div className="text-sm leading-6 text-white/78">{item}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
        <div className="text-sm font-medium text-white">
          {isAccent ? "Результат" : "Проблема"}
        </div>
        <p className="mt-2 text-sm leading-7 text-white/58">
          {isAccent
            ? "Профиль становится понятным: видно, на чём основана оценка, как она менялась и какие сигналы подтверждают надёжность."
            : "Человеку приходится собирать картину вручную, сравнивать разрозненные сигналы и принимать решение без единой логики."}
        </p>
      </div>
    </motion.div>
  );
}