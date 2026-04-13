"use client";

import { motion } from "framer-motion";

const improvements = [
  {
    label: "Подтверждён профиль",
    delta: "+120",
  },
  {
    label: "12 успешных сделок",
    delta: "+180",
  },
  {
    label: "Положительные отзывы",
    delta: "+90",
  },
  {
    label: "Стабильная активность",
    delta: "+48",
  },
];

export default function BeforeAfterSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
          Динамика доверия
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Как профиль меняется со временем
        </h2>
        <p className="mt-4 text-white/60">
          Trust score — это не статичная цифра. Он отражает действия,
          подтверждения и качество взаимодействий, которые постепенно усиливают
          доверие к профилю.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/8 bg-[#0c172a] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white/45">До</div>
              <div className="mt-2 text-4xl font-semibold text-white">404</div>
            </div>

            <div className="rounded-full border border-amber-400/15 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
              средний уровень
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-white/45">
              <span>Индекс доверия</span>
              <span>40.4%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "40.4%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-white/30"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="text-sm font-medium text-white">
              Что видно в профиле
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-[#08101d] px-3 py-3 text-sm">
                <span className="text-white/58">Подтверждённые сделки</span>
                <span className="font-medium text-white/82">3</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#08101d] px-3 py-3 text-sm">
                <span className="text-white/58">Отзывы</span>
                <span className="font-medium text-white/82">67%</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#08101d] px-3 py-3 text-sm">
                <span className="text-white/58">Стабильность</span>
                <span className="font-medium text-white/82">52%</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#08101d] px-3 py-3 text-sm">
                <span className="text-white/58">Статус</span>
                <span className="font-medium text-white/82">
                  базовый профиль
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-[#3b82f6]/15 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(59,130,246,0.04))] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white/45">После</div>
              <div className="mt-2 text-4xl font-semibold text-white">842</div>
            </div>

            <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              высокий уровень
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-white/45">
              <span>Индекс доверия</span>
              <span>84.2%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "84.2%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-[#3b82f6]"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {improvements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index }}
                className="rounded-2xl border border-white/8 bg-[#08101d] p-4"
              >
                <div className="text-sm text-white/55">{item.label}</div>
                <div className="mt-2 text-xl font-semibold text-emerald-300">
                  {item.delta}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-[#08101d] p-4">
            <div className="text-sm font-medium text-white">
              Что усилило доверие
            </div>
            <p className="mt-3 text-sm leading-7 text-white/58">
              После подтверждения профиля, роста числа успешных взаимодействий и
              накопления положительной обратной связи пользователь получает не
              просто более высокий score, а более убедительный и прозрачный
              профиль.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}