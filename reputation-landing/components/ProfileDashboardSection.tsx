"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type TabKey = "score" | "signals" | "history";

const tabs: { key: TabKey; label: string }[] = [
  { key: "score", label: "Score" },
  { key: "signals", label: "Signals" },
  { key: "history", label: "History" },
];

const signalItems = [
  { title: "Подтверждённый профиль", value: "Да" },
  { title: "Успешные сделки", value: "27" },
  { title: "Положительные отзывы", value: "94%" },
  { title: "Стабильность", value: "88%" },
];

const historyItems = [
  { date: "12 Apr", text: "Подтверждён профиль", delta: "+120" },
  { date: "08 Apr", text: "3 новых положительных отзыва", delta: "+36" },
  { date: "03 Apr", text: "Закрыта сделка без споров", delta: "+24" },
  { date: "29 Mar", text: "Рост стабильности активности", delta: "+18" },
];

export default function ProfileDashboardSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("score");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
          Мини-дашборд профиля
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Как может выглядеть интерфейс внутри продукта
        </h2>
        <p className="mt-4 text-white/60">
          Не просто карточка, а полноценный профиль с объяснимой оценкой,
          сигналами доверия и историей изменений. Такой блок делает лендинг
          заметно более продуктовым.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl border border-white/8 bg-[#0c172a] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-base font-semibold text-white">
              AV
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-white">
                  Алексей Воронов
                </h3>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Verified
                </span>
              </div>

              <p className="mt-1 text-sm text-white/45">
                Предприниматель · Надёжный партнёр
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-[#08101d] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm text-white/45">Trust score</div>
                <div className="mt-1 text-3xl font-semibold text-white">
                  842
                </div>
              </div>
              <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                высокий уровень
              </div>
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
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full bg-[#3b82f6]"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <StatMini title="Сделки" value="27" />
            <StatMini title="Отзывы" value="94%" />
            <StatMini title="Жалобы" value="1" />
            <StatMini title="Стабильность" value="88%" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-3xl border border-[#3b82f6]/15 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(59,130,246,0.04))] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:p-6"
        >
          <div className="rounded-2xl border border-white/8 bg-[#08101d] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm text-white/45">Profile dashboard</div>
                <div className="mt-1 text-xl font-semibold text-white">
                  Внутренний интерфейс профиля
                </div>
              </div>

              <div className="flex rounded-xl border border-white/8 bg-white/[0.04] p-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? "bg-[#3b82f6] text-white"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 min-h-[320px]">
              <AnimatePresence mode="wait">
                {activeTab === "score" ? (
                  <motion.div
                    key="score"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-4"
                  >
                    <DashboardCard title="Структура оценки">
                      <ScoreRow label="Подтверждённые действия" value="35%" />
                      <ScoreRow label="История взаимодействий" value="40%" />
                      <ScoreRow label="Отзывы" value="15%" />
                      <ScoreRow label="Стабильность" value="10%" />
                    </DashboardCard>

                    <DashboardCard title="Динамика">
                      <div className="flex h-28 items-end gap-2">
                        <MiniBar height="28%" />
                        <MiniBar height="34%" />
                        <MiniBar height="41%" />
                        <MiniBar height="53%" />
                        <MiniBar height="62%" />
                        <MiniBar height="71%" />
                        <MiniBar height="84%" highlight />
                      </div>
                    </DashboardCard>
                  </motion.div>
                ) : null}

                {activeTab === "signals" ? (
                  <motion.div
                    key="signals"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.22 }}
                    className="grid gap-3"
                  >
                    {signalItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4"
                      >
                        <div className="text-sm text-white/72">{item.title}</div>
                        <div className="text-sm font-semibold text-white">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}

                {activeTab === "history" ? (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-3"
                  >
                    {historyItems.map((item, index) => (
                      <motion.div
                        key={`${item.date}-${item.text}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4"
                      >
                        <div className="min-w-0">
                          <div className="text-xs uppercase tracking-[0.18em] text-white/35">
                            {item.date}
                          </div>
                          <div className="mt-1 text-sm text-white/78">
                            {item.text}
                          </div>
                        </div>
                        <div className="shrink-0 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                          {item.delta}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatMini({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <div className="text-xs text-white/45">{title}</div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ScoreRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm text-white/65">
        <span>{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: value }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full rounded-full bg-[#3b82f6]"
        />
      </div>
    </div>
  );
}

function MiniBar({
  height,
  highlight = false,
}: {
  height: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`w-full rounded-t-md ${
        highlight ? "bg-[#3b82f6]" : "bg-white/20"
      }`}
    />
  );
}