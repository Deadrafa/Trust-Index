    "use client";

import { motion } from "framer-motion";

const points = [
  "Ранний доступ к платформе",
  "Приоритет для первых сценариев запуска",
  "Возможность повлиять на продукт на старте",
];

export default function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(59,130,246,0.16),rgba(12,23,42,0.88))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8 md:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-blue-200/80">
              Ранний доступ
            </div>

            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Начните использовать прозрачную репутацию как дополнительное
              преимущество при выборе и сотрудничестве
            </h2>

            <p className="mt-4 max-w-2xl text-white/65">
              Оставьте заявку и получите доступ к платформе одним из первых.
              Ранние пользователи помогают определить, где Trust Index принесёт
              наибольшую практическую пользу.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-300/20 bg-blue-300/10 text-sm text-blue-200">
                      ✓
                    </div>
                    <div className="text-sm leading-6 text-white/82">{point}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center rounded-2xl bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
            >
              Получить ранний доступ
            </a>

            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Ещё раз посмотреть механику
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}