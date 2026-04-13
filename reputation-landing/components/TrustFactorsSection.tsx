"use client";

import { motion } from "framer-motion";

const factors = [
  {
    title: "Подтверждённые действия",
    value: "35%",
    text: "Сделки, завершённые задачи и реальные взаимодействия.",
  },
  {
    title: "Отзывы и обратная связь",
    value: "25%",
    text: "Качество отзывов и повторные взаимодействия.",
  },
  {
    title: "Стабильность поведения",
    value: "20%",
    text: "Предсказуемость и отсутствие резких негативных событий.",
  },
  {
    title: "История взаимодействий",
    value: "20%",
    text: "Долгосрочная активность и контекст доверия.",
  },
];

export default function TrustFactorsSection() {
  return (
    <section className="border-y border-white/8 bg-[#0b1628]/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
            Как считается индекс
          </div>

          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Что влияет на trust score
          </h2>

          <p className="mt-4 text-white/60">
            Итоговая оценка формируется из набора прозрачных сигналов,
            каждый из которых влияет на общий индекс доверия.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/8 bg-[#0c172a] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/45">вклад</span>
                <span className="text-lg font-semibold text-blue-300">
                  {factor.value}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-white">
                {factor.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/58">
                {factor.text}
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: factor.value }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full bg-[#3b82f6]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}