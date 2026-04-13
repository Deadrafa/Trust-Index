"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import UserReputationCards from "@/components/UserReputationCards";
import TrustFactorsSection from "@/components/TrustFactorsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ProfileLookupSection from "@/components/ProfileLookupSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import ComparisonSection from "@/components/ComparisonSection";
import ProfileDashboardSection from "@/components/ProfileDashboardSection";
import EthicsSection from "@/components/EthicsSection";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";

type FormState = {
  name: string;
  email: string;
  useCase: string;
  company: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initialForm: FormState = {
  name: "",
  email: "",
  useCase: "",
  company: "",
};

const painPoints = [
  {
    title: "Слишком мало прозрачности",
    text: "Во многих сценариях решение о доверии принимается без структуры, без понятной логики и без единой картины надёжности.",
    icon: "◐",
  },
  {
    title: "Сигналы качества разрознены",
    text: "Отзывы, рекомендации и история взаимодействий часто существуют отдельно друг от друга и не помогают быстро оценить ситуацию.",
    icon: "◎",
  },
  {
    title: "Ошибка обходится дорого",
    text: "Неверное решение в найме, сделке, аренде или сообществе может стоить времени, денег, репутации и доверия.",
    icon: "◈",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Профиль",
    text: "Пользователь создаёт профиль и проходит базовое подтверждение ключевых данных.",
  },
  {
    number: "02",
    title: "Сигналы доверия",
    text: "Система учитывает подтверждённые действия, отзывы, стабильность и историю взаимодействий.",
  },
  {
    number: "03",
    title: "Индекс",
    text: "Формируется итоговая оценка с прозрачными основаниями и понятной динамикой изменений.",
  },
  {
    number: "04",
    title: "Решение",
    text: "Люди и организации используют профиль как дополнительный сигнал при выборе и сотрудничестве.",
  },
] as const;

const useCases = [
  {
    title: "Найм и подрядчики",
    text: "Дополнительный сигнал для оценки кандидатов, фрилансеров, исполнителей и партнёров до начала сотрудничества.",
  },
  {
    title: "Сделки и аренда",
    text: "Более понятная картина надёжности при выборе человека для частного сотрудничества, сделки или аренды.",
  },
  {
    title: "Сообщества и платформы",
    text: "Прозрачная среда, где репутация помогает усиливать качество взаимодействия и снижать уровень риска.",
  },
] as const;

const principles = [
  "Понятная логика оценки",
  "Прозрачные основания рейтинга",
  "История изменений профиля",
  "Фокус на доверии и надёжности",
] as const;

const trustSignals = [
  {
    title: "Подтверждённые действия",
    text: "Сделки, завершённые задачи и другие верифицируемые события усиливают доверие к профилю.",
  },
  {
    title: "Репутационные сигналы",
    text: "Отзывы, повторные взаимодействия и качество обратной связи помогают увидеть контекст, а не только цифру.",
  },
  {
    title: "Стабильность профиля",
    text: "Предсказуемость поведения и история активности позволяют оценивать надёжность в динамике.",
  },
] as const;

const faq = [
  {
    q: "Это система контроля над людьми?",
    a: "Нет. Продукт задуман как инструмент прозрачности и дополнительной оценки надёжности, который помогает принимать более обоснованные решения.",
  },
  {
    q: "Откуда берётся рейтинг?",
    a: "Оценка складывается из понятных сигналов: подтверждённых действий, отзывов, истории взаимодействий, стабильности и других факторов, которые можно объяснить пользователю.",
  },
  {
    q: "Это заменяет личное решение?",
    a: "Нет. Индекс доверия не заменяет выбор человека или компании, а даёт дополнительный структурированный сигнал для более уверенного решения.",
  },
] as const;

const navItems = [
  { id: "problem", label: "Проблема" },
  { id: "how", label: "Как работает" },
  { id: "cases", label: "Сценарии" },
  { id: "waitlist", label: "Доступ" },
  { id: "profiles", label: "Профили" },
  { id: "faq", label: "FAQ" },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerWrap: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Home() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState<string>("problem");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const heroYLeft = useTransform(scrollY, [0, 500], [0, -10]);
  const heroYRight = useTransform(scrollY, [0, 500], [0, 6]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isDisabled =
    !mounted ||
    status === "loading" ||
    !form.name.trim() ||
    !form.email.trim() ||
    !form.useCase.trim();



  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get("content-type") || "";
      const raw = await response.text();

      let data: { message?: string } = {};
      if (contentType.includes("application/json")) {
        data = JSON.parse(raw) as { message?: string };
      } else {
        throw new Error(
          "Сервер вернул не JSON. Проверь app/api/waitlist/route.ts"
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Не удалось отправить заявку");
      }

      setStatus("success");
      setMessage(data.message || "Заявка отправлена.");
      setForm(initialForm);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Произошла ошибка";
      setStatus("error");
      setMessage(errorMessage);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <GridGlow />
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-[#3b82f6]"
      />

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07111f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
              <BrandGlyph />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
                Trust Index
              </div>
              <div className="truncate text-xs text-white/45">
                Платформа оценки доверия и репутации
              </div>
            </div>
          </motion.div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`rounded-lg px-3 py-2 text-sm transition cursor-pointer ${
                    isActive
                      ? "bg-white/8 text-white"
                      : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#waitlist"
              className="hidden rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb] sm:block"
            >
              Ранний доступ
            </motion.a>
          </div>
        </div>
      </header>

      <section className="relative border-b border-white/8">
        <motion.div
          className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerWrap}
        >
          <motion.div
            style={{ y: heroYLeft }}
            variants={fadeUp}
            className="order-1"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200"
            >
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              Прозрачная оценка надёжности
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-[30px] font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl md:text-6xl"
            >
              Индекс доверия
              <br />
              <span className="text-[#60a5fa]">
                для более уверенных решений
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base md:text-lg"
            >
              Сервис, который помогает оценивать надёжность человека,
              исполнителя или участника сообщества на основе подтверждённых
              действий, истории взаимодействий и репутационных сигналов.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                href="#waitlist"
                className="rounded-xl bg-[#3b82f6] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#2563eb]"
              >
                Получить ранний доступ
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                href="#how"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/8"
              >
                Как это работает
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              <QuickSignal icon="✓" title="Проверяемые сигналы" />
              <QuickSignal icon="↗" title="История изменений" />
              <QuickSignal icon="◌" title="Понятная логика оценки" />
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3">
              <AnimatedStatCard
                target={120}
                suffix="+"
                label="ранних заявок"
              />
              <AnimatedStatCard
                target={94}
                suffix="%"
                label="позитивной оценки идеи"
              />
              <AnimatedStatCard target={842} label="пример trust score" />
            </div>
          </motion.div>

          <motion.div
            style={{ y: heroYRight }}
            variants={fadeUp}
            className="order-2 mx-auto w-full max-w-[520px] lg:max-w-none"
          >
            <HeroAnalyticsPanel mobileFriendly />
          </motion.div>
        </motion.div>
      </section>

      <Section
        id="problem"
        eyebrow="Почему это важно"
        title="Когда не хватает прозрачности, цена ошибки становится выше"
        description="Во многих сценариях люди принимают решения почти вслепую. Цель продукта — сделать оценку надёжности более понятной, структурированной и полезной в реальных ситуациях."
      >
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {painPoints.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <DarkCard>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-lg text-blue-200">
                    {item.icon}
                  </div>
                  <div className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-white/45">
                    риск
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/58">
                  {item.text}
                </p>
              </DarkCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <DarkCard className="p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-200">
                <DecisionIcon />
              </div>
              <div>
                <div className="text-sm font-medium text-white/88">
                  Типичная ситуация
                </div>
                <div className="text-xs text-white/45">
                  Решение принимается без единой картины
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MiniScenario
                title="Найм"
                text="Есть резюме и пара отзывов, но нет структуры доверия."
              />
              <MiniScenario
                title="Сделка"
                text="Нужно быстро понять, насколько человек надёжен."
              />
              <MiniScenario
                title="Сообщество"
                text="Важно видеть историю взаимодействий и стабильность."
              />
            </div>
          </DarkCard>

          <DarkCard className="p-6 sm:p-7">
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
              Что меняется
            </div>
            <div className="mt-3 text-2xl font-semibold text-white">
              Вместо разрозненных сигналов — единый профиль доверия
            </div>
            <p className="mt-4 text-sm leading-7 text-white/58">
              Пользователь видит не только число, но и контекст: что повлияло на
              индекс, какие сигналы подтверждены и как менялась оценка со
              временем.
            </p>
          </DarkCard>
        </motion.div>
      </Section>

      <section id="how" className="border-y border-white/8 bg-[#0b1628]/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <motion.div
            className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={staggerWrap}
          >
            <motion.div variants={fadeUp} className="max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
                Как формируется индекс доверия
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Профиль, сигналы доверия и прозрачная итоговая оценка
              </h2>
              <p className="mt-4 text-white/60">
                Индекс строится не на одной цифре, а на наборе понятных
                сигналов, которые можно показать и объяснить пользователю.
              </p>
            </motion.div>

            <motion.div
              variants={staggerWrap}
              className="grid gap-3 sm:grid-cols-2"
            >
              {principles.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/75"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {processSteps.map((step) => (
              <motion.div key={step.number} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-blue-300">
                      {step.number}
                    </div>
                    <div className="h-2 w-2 rounded-full bg-blue-300/80" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">
                    {step.text}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerWrap}
            className="mt-8 grid gap-4 lg:grid-cols-3"
          >
            {trustSignals.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <SignalCard title={item.title} text={item.text} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]"
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp}>
            <DarkCard className="p-8">
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
                Почему профилю можно доверять
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Прозрачная логика, понятные сигналы и объяснимые метрики
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Доверие возникает тогда, когда пользователь понимает, откуда
                берётся оценка, какие сигналы на неё влияют и как она меняется
                со временем.
              </p>

              <div className="mt-6 space-y-4">
                <TrustRow title="Понятный язык оценки" value="92%" width="92%" />
                <TrustRow
                  title="Прозрачность логики"
                  value="88%"
                  width="88%"
                />
                <TrustRow
                  title="Ощущение надёжности"
                  value="94%"
                  width="94%"
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SmallTrustCard
                  title="Не только цифра"
                  text="Профиль показывает основания оценки, а не только итоговый показатель."
                />
                <SmallTrustCard
                  title="История изменений"
                  text="Пользователь видит динамику, а не получает статичную репутацию."
                />
              </div>
            </DarkCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-[#3b82f6]/15 bg-[linear-gradient(180deg,rgba(59,130,246,0.12),rgba(59,130,246,0.04))] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)] sm:p-8"
            >
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-blue-300">
                Как выглядит профиль доверия
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Профиль показывает итоговую оценку, ключевые сигналы и динамику
                доверия
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
                Пользователь видит не только итоговый индекс, но и факторы,
                которые влияют на него: подтверждённые действия, отзывы,
                стабильность и историю взаимодействий.
              </p>

              <motion.div
                variants={staggerWrap}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-6 grid gap-4 sm:grid-cols-3"
              >
                <motion.div variants={fadeUp}>
                  <MetricCard title="Подтверждённые сделки" value="27" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <MetricCard title="Положительные отзывы" value="94%" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <MetricCard title="Стабильность" value="88%" />
                </motion.div>
              </motion.div>

              <div className="mt-6 rounded-2xl border border-white/8 bg-[#08101d] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-white/45">
                      Общий trust score
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 }}
                      className="mt-1 text-2xl font-semibold text-white sm:text-3xl"
                    >
                      842 / 1000
                    </motion.div>
                  </div>
                  <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300 sm:px-3 sm:text-sm">
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
                      whileInView={{ width: "84%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full bg-[#3b82f6]"
                    />
                  </div>
                </div>

                <div className="mt-6 flex h-24 items-end gap-2 sm:gap-3">
                  <Bar height="28%" delay={0.05} />
                  <Bar height="36%" delay={0.1} />
                  <Bar height="44%" delay={0.15} />
                  <Bar height="53%" delay={0.2} />
                  <Bar height="66%" delay={0.25} />
                  <Bar height="74%" delay={0.3} />
                  <Bar height="84%" highlight delay={0.35} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <InsightChip text="Основания оценки видны пользователю" />
                  <InsightChip text="Динамика понятнее статичного рейтинга" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <TrustFactorsSection />

      <section id="profiles">
        <UserReputationCards />
      </section>

      <BeforeAfterSection />

      <ProfileLookupSection />

      <ComparisonSection />

      <ProfileDashboardSection />

      <EthicsSection />

      <section id="cases" className="border-y border-white/8 bg-[#0b1628]/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerWrap}
          >
            <motion.div variants={fadeUp} className="mb-10 max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
                Сценарии применения
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Там, где надёжность влияет на итоговое решение
              </h2>
            </motion.div>

            <motion.div
              variants={staggerWrap}
              className="grid gap-6 lg:grid-cols-3"
            >
              {useCases.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="overflow-hidden rounded-2xl border border-white/8 bg-[#0c172a] shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition hover:border-white/12"
                  >
                    <div className="border-b border-white/8 bg-white/[0.03] p-5">
                      <CaseVisual title={item.title} />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 inline-flex rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-white/50">
                        сценарий
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/58">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-6 sm:p-8 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
                Подход к продукту
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Продукт помогает принимать более обоснованные решения, а не
                навешивать ярлыки
              </h2>
              <p className="mt-4 text-white/60">
                Мы делаем акцент на прозрачности, объяснимости и практической
                пользе. Оценка должна помогать в выборе, а не заменять его.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <ApproachPill
                  title="Прозрачность"
                  text="Понятно, откуда берётся оценка"
                />
                <ApproachPill
                  title="Объяснимость"
                  text="Каждый сигнал можно показать"
                />
                <ApproachPill
                  title="Практичность"
                  text="Фокус на реальных сценариях"
                />
              </div>
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/8 bg-[#08101d] p-6"
            >
              <div className="text-sm text-white/45">
                Ключевые формулировки
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  "Индекс доверия",
                  "Рейтинг надёжности",
                  "Trust Score",
                  "Проверенный профиль",
                  "Прозрачная репутация",
                ].map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * index }}
                    whileHover={{ y: -2 }}
                    className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-sm text-white/90"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              {/*<div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="text-sm font-medium text-white">
                  Принцип подачи
                </div>
                <p className="mt-2 text-sm leading-7 text-white/58">
                  Спокойный деловой язык, понятные метрики и минимум лишнего
                  футуризма. Продукт должен выглядеть надёжно, а не
                  декоративно.
                </p>
              </div>*/}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        id="waitlist"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20"
      >
        <motion.div
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerWrap}
        >
          <motion.div variants={fadeUp}>
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
              Ранний доступ
            </div>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Оставьте заявку, чтобы получить ранний доступ к платформе
            </h2>
            <p className="mt-4 max-w-2xl text-white/60">
              Оставьте контакт и коротко опишите, где такой сервис был бы
              полезен именно вам. Это поможет определить первые сценарии
              запуска.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <ScoreCard
                value="01"
                label="первые приглашения"
                text="по мере формирования раннего доступа"
              />
              <ScoreCard
                value="02"
                label="приоритетные кейсы"
                text="найм, сделки, аренда и платформы"
              />
              <ScoreCard
                value="03"
                label="обратная связь"
                text="ранние пользователи влияют на продукт"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-white/8 bg-[#0c172a] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-200">
                  <MailSparkIcon />
                </div>
                <div>
                  <div className="text-base font-semibold text-white">
                    Что даёт заявка
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/58">
                    Оставляя заявку, вы не просто получаете ранний доступ — вы помогаете определить, где такой сервис действительно нужен в первую очередь.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/8 bg-[#0b1628] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-6"
            >
              <div className="text-xl font-semibold text-white">
                Ранний доступ
              </div>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Оставьте контакт и коротко опишите, где вам был бы полезен такой
                сервис.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, company: e.target.value }))
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-white/72"
                  >
                    Имя
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="name"
                    type="text"
                    maxLength={80}
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Ваше имя"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#3b82f6]"
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white/72"
                  >
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="email"
                    type="email"
                    maxLength={120}
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#3b82f6]"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="useCase"
                    className="mb-2 block text-sm font-medium text-white/72"
                  >
                    Где это было бы полезно?
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="useCase"
                    rows={4}
                    maxLength={1000}
                    value={form.useCase}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        useCase: e.target.value,
                      }))
                    }
                    placeholder="Например: найм, аренда, сделки, платформа, сообщество"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#3b82f6]"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  disabled={isDisabled}
                  className="w-full rounded-xl bg-[#3b82f6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Отправка..." : "Получить доступ"}
                </motion.button>

                {message ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm ${
                      status === "success"
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                  >
                    {message}
                  </motion.p>
                ) : null}
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <FinalCtaSection />

      <section id="faq" className="border-t border-white/8 bg-[#0b1628]/70">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerWrap}
          >
            <motion.div variants={fadeUp} className="mb-10 max-w-2xl">
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-white/40">
                FAQ
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Частые вопросы
              </h2>
            </motion.div>

            <motion.div variants={staggerWrap} className="space-y-4">
              {faq.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={item.q}
                    variants={fadeUp}
                    className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="text-base font-semibold text-white sm:text-lg">
                        {item.q}
                      </span>

                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-white/80"
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 text-sm leading-7 text-white/58 sm:px-6">
                            {item.a}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </main>
  );
}

function AnimatedStatCard({
  target,
  label,
  suffix = "",
}: {
  target: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.floor(eased * target);
      if (next !== start) {
        start = next;
        setValue(next);
      }
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref}>
      <TopStat value={`${value}${suffix}`} label={label} />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <motion.div
        className="mb-10 max-w-2xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerWrap}
      >
        <motion.div
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-[0.22em] text-white/40"
        >
          {eyebrow}
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl"
        >
          {title}
        </motion.h2>
        {description ? (
          <motion.p variants={fadeUp} className="mt-4 text-white/60">
            {description}
          </motion.p>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
}

function DarkCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className={`rounded-2xl border border-white/8 bg-[#0c172a] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function TopStat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="rounded-2xl border border-white/8 bg-[#0c172a] px-5 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
    >
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/45">{label}</div>
    </motion.div>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="rounded-xl border border-white/8 bg-[#08101d] p-4"
    >
      <div className="text-sm text-white/45">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </motion.div>
  );
}

function ScoreCard({
  value,
  label,
  text,
}: {
  value: string;
  label: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="rounded-2xl border border-white/8 bg-[#0c172a] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
    >
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/72">{label}</div>
      <div className="mt-2 text-xs leading-5 text-white/40">{text}</div>
    </motion.div>
  );
}

function TrustRow({
  title,
  value,
  width,
}: {
  title: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-white/58">
        <span>{title}</span>
        <span className="font-medium text-white/85">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-[#3b82f6]"
        />
      </div>
    </div>
  );
}

function Bar({
  height,
  highlight = false,
  delay = 0,
}: {
  height: string;
  highlight?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`w-5 rounded-t-md sm:w-6 lg:w-8 ${
        highlight ? "bg-[#3b82f6]" : "bg-white/20"
      }`}
    />
  );
}

function HeroAnalyticsPanel({
  mobileFriendly = false,
}: {
  mobileFriendly?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-white/8 bg-[#0c172a] shadow-[0_24px_80px_rgba(0,0,0,0.28)] ${
        mobileFriendly ? "p-2.5 sm:p-4" : "p-3 sm:p-4"
      }`}
    >
      <div className="absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%)] sm:rounded-[28px]" />
      <div className="relative rounded-[18px] border border-white/8 bg-[#08101d] p-3.5 sm:rounded-[22px] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-white/45">Trust profile overview</div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-1 text-2xl font-semibold text-white sm:text-3xl"
            >
              842 / 1000
            </motion.div>
          </div>
          <div className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 sm:px-3 sm:text-sm">
            высокий уровень
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/8 bg-[#0c172a] p-4 sm:mt-6 sm:p-5">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 2, scale: 1.02 }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-sm font-semibold text-white/90 sm:h-14 sm:w-14"
            >
              VM
            </motion.div>
            <div>
              <div className="text-sm text-white/45">Профиль</div>
              <div className="text-base font-semibold text-white sm:text-lg">
                Verified Member
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3">
            <InfoBox title="Отзывы" value="94%" />
            <InfoBox title="Сделки" value="27" />
            <InfoBox title="Жалобы" value="1" />
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-white/45">
              <span>Индекс доверия</span>
              <span>84.2%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "84%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, delay: 0.15 }}
                className="h-full rounded-full bg-[#3b82f6]"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-[#0c172a] p-4">
            <div className="text-sm text-white/45">Динамика репутации</div>
            <div className="mt-4 flex h-24 items-end gap-2">
              <Bar height="30%" delay={0.02} />
              <Bar height="40%" delay={0.08} />
              <Bar height="48%" delay={0.14} />
              <Bar height="58%" delay={0.2} />
              <Bar height="66%" delay={0.26} />
              <Bar height="74%" delay={0.32} />
              <Bar height="84%" highlight delay={0.38} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#0c172a] p-4">
            <div className="text-sm text-white/45">Факторы оценки</div>
            <div className="mt-4 space-y-2">
              {[
                ["Подтверждённые отзывы", "35%"],
                ["Стабильность действий", "25%"],
                ["История взаимодействий", "40%"],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-2 text-xs"
                >
                  <span className="text-white/58">{label}</span>
                  <span className="shrink-0 font-medium text-white/85">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="rounded-xl border border-white/8 bg-white/[0.04] p-3"
    >
      <div className="text-xs text-white/45">{title}</div>
      <div className="mt-1 text-base font-semibold text-white sm:text-lg">
        {value}
      </div>
    </motion.div>
  );
}

function SignalCard({ title, text }: { title: string; text: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="rounded-2xl border border-white/8 bg-[#0c172a] p-5"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-200">
        <SignalIcon />
      </div>
      <div className="text-lg font-semibold text-white">{title}</div>
      <p className="mt-3 text-sm leading-7 text-white/58">{text}</p>
    </motion.div>
  );
}

function SmallTrustCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <div className="text-sm font-medium text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
    </div>
  );
}

function InsightChip({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
      {text}
    </div>
  );
}

function ApproachPill({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/55">{text}</div>
    </div>
  );
}

function QuickSignal({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-blue-200">
        {icon}
      </div>
      <div className="text-sm text-white/78">{title}</div>
    </motion.div>
  );
}

function MiniScenario({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm leading-6 text-white/55">{text}</div>
    </div>
  );
}

function CaseVisual({ title }: { title: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="relative h-36 w-full overflow-hidden rounded-xl border border-white/8 bg-[#08101d]"
    >
      <div className="absolute left-4 top-4 h-10 w-10 rounded-xl bg-white/10" />
      <div className="absolute right-4 top-4 h-8 w-24 rounded-full bg-blue-400/10" />
      <div className="absolute left-4 top-16 text-xs uppercase tracking-[0.2em] text-white/30">
        {title}
      </div>
      <div className="absolute left-4 right-4 top-20 h-12 rounded-xl bg-white/[0.05]" />
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
        <div className="h-10 rounded-xl bg-blue-400/10" />
        <div className="h-10 rounded-xl bg-white/[0.05]" />
        <div className="h-10 rounded-xl bg-white/[0.08]" />
      </div>
    </motion.div>
  );
}

function GridGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.08),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0c172a] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:border-white/20 sm:bottom-6 sm:right-6"
        >
          <ArrowUpIcon />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-white"
    >
      <path
        d="M12 19V5M12 5L5 12M12 5L19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
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

function DecisionIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-current"
    >
      <path
        d="M4 7H20M4 12H14M4 17H10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SignalIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-current"
    >
      <path
        d="M6 12L10 16L18 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailSparkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-current"
    >
      <path
        d="M4 7L12 13L20 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7H19V17H5V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}