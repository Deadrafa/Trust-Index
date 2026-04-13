"use client";

import { motion } from "framer-motion";

const trustSignals = [
  "Профиль подтверждён",
  "27 успешных взаимодействий",
  "94% положительной обратной связи",
  "Высокая стабильность активности",
];

export default function ProfileLookupSection() {
  return (
    <section className="border-y border-white/8 bg-[#0b1628]/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
              Быстрый просмотр профиля
            </div>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Найти профиль и сразу увидеть уровень доверия
            </h2>

            <p className="mt-4 max-w-2xl text-white/60">
              В реальном сценарии пользователь или компания могут быстро открыть
              профиль, посмотреть итоговый trust score, ключевые сигналы и
              понять, насколько надёжен человек для сделки, найма или
              сотрудничества.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Быстрый доступ к профилю",
                "Понятные основания оценки",
                "Ключевые сигналы видны сразу",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10 text-sm text-blue-200">
                    ✓
                  </div>
                  <span className="text-sm text-white/78">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/8 bg-[#0c172a] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.24)] sm:p-6"
          >
            <div className="rounded-2xl border border-white/8 bg-[#08101d] p-4 sm:p-5">
              <div className="text-sm text-white/45">Поиск профиля</div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/40">
                  trust-id / email / username
                </div>
                <button
                  type="button"
                  className="rounded-xl bg-[#3b82f6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
                >
                  Найти
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-5 rounded-2xl border border-[#3b82f6]/15 bg-[linear-gradient(180deg,rgba(59,130,246,0.10),rgba(59,130,246,0.03))] p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
                      AV
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white">
                        Алексей Воронов
                      </div>
                      <div className="mt-1 text-sm text-white/45">
                        verified profile
                      </div>
                    </div>
                  </div>

                  <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    высокий уровень
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <MetricTile title="Trust score" value="842" />
                  <MetricTile title="Отзывы" value="94%" />
                  <MetricTile title="Сделки" value="27" />
                </div>

                <div className="mt-5">
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
                        delay: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-[#3b82f6]"
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/8 bg-[#08101d] p-4">
                  <div className="text-sm font-medium text-white">
                    Ключевые сигналы
                  </div>

                  <div className="mt-4 space-y-3">
                    {trustSignals.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 * index }}
                        className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-3 text-sm"
                      >
                        <span className="text-white/68">{item}</span>
                        <span className="text-emerald-300">+</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MetricTile({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="rounded-xl border border-white/8 bg-[#08101d] p-4"
    >
      <div className="text-xs text-white/45">{title}</div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
    </motion.div>
  );
}