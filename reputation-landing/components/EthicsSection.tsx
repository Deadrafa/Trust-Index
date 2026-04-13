"use client";

import { motion } from "framer-motion";

const principles = [
  {
    title: "Оценка не заменяет решение",
    text: "Trust score — это дополнительный сигнал, который помогает принять более обоснованное решение, а не выносит окончательный вердикт за человека.",
  },
  {
    title: "Логика должна быть объяснима",
    text: "Пользователь должен понимать, какие факторы повлияли на индекс, почему он изменился и какие сигналы считаются подтверждёнными.",
  },
  {
    title: "Контекст важнее одной цифры",
    text: "Итоговая оценка работает только вместе с историей, динамикой, отзывами и объяснением того, что стоит за изменениями профиля.",
  },
  {
    title: "Прозрачность снижает риск ошибок",
    text: "Когда основания оценки видны, людям проще замечать спорные места, задавать вопросы и использовать систему осторожно и осознанно.",
  },
];

const safeguards = [
  "Понятные основания рейтинга",
  "История изменений профиля",
  "Опора на подтверждённые сигналы",
  "Фокус на доверии, а не на клейме",
];

export default function EthicsSection() {
  return (
    <section className="border-y border-white/8 bg-[#0b1628]/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mb-10 max-w-3xl"
        >
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
            Этика и прозрачность
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Система должна помогать принимать решения, а не навешивать ярлыки
          </h2>
          <p className="mt-4 text-white/60">
            Для продукта, который работает с доверием и репутацией, важно не
            только показать сильный интерфейс, но и обозначить принципы:
            объяснимость, прозрачность и уважение к контексту.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {principles.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/8 bg-[#0c172a] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-200">
                  <ShieldIcon />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-[#3b82f6]/15 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(59,130,246,0.04))] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:p-8"
          >
            <div className="rounded-2xl border border-white/8 bg-[#08101d] p-5">
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-blue-300">
                Принципы подачи
              </div>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                Надёжный продукт выглядит не как приговор, а как понятный
                инструмент
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/60">
                Чем прозрачнее объясняется логика оценки, тем выше доверие к
                продукту. Важно показывать не только итоговый индекс, но и
                контекст, динамику и реальные основания оценки.
              </p>

              <div className="mt-6 space-y-3">
                {safeguards.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-sm text-emerald-300">
                      ✓
                    </div>
                    <div className="text-sm text-white/78">{item}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="text-sm font-medium text-white">
                  Ключевая идея
                </div>
                <p className="mt-2 text-sm leading-7 text-white/58">
                  Репутационный профиль должен усиливать качество выбора, а не
                  подменять его. Поэтому прозрачность, объяснимость и история
                  изменений важнее, чем просто “высокий” или “низкий” score.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-current"
    >
      <path
        d="M12 3L19 7V12C19 16.2 16.3 19.8 12 21C7.7 19.8 5 16.2 5 12V7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12L11.2 13.7L14.8 10.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}