import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion";
import {
  enterTransition,
  exitTransition,
  panelTransition,
} from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type Step = "product" | "volume" | "contact" | "review" | "done";
const stepOrder: Step[] = ["product", "volume", "contact", "review", "done"];
const totalSteps = 4;

const productKeys = [
  "ci",
  "aluminum",
  "pressureDie",
  "motor",
  "pump",
  "automotive",
  "other",
] as const;

const volumeKeys = ["prototype", "small", "medium", "large"] as const;

type FormState = {
  product: string;
  volume: string;
  material: string;
  name: string;
  company: string;
  email: string;
  phone: string;
};

const emptyState: FormState = {
  product: "",
  volume: "",
  material: "",
  name: "",
  company: "",
  email: "",
  phone: "",
};

type QuoteSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function QuoteSheet({ open, onClose }: QuoteSheetProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [step, setStep] = useState<Step>("product");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [form, setForm] = useState<FormState>(emptyState);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep("product");
      setForm(emptyState);
      setDirection(1);
    }
  }, [open]);

  const stepIndex = stepOrder.indexOf(step);
  const visibleStepNum = Math.min(stepIndex + 1, totalSteps);

  const goNext = () => {
    setDirection(1);
    const next = stepOrder[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    setDirection(-1);
    const prev = stepOrder[stepIndex - 1];
    if (prev) setStep(prev);
  };

  const canContinue = (): boolean => {
    if (step === "product") return form.product !== "";
    if (step === "volume") return form.volume !== "";
    if (step === "contact") return form.name !== "" && form.email !== "" && form.company !== "";
    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDirection(1);
    setStep("done");
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: exitTransition(reduced) }}
            transition={enterTransition(reduced, "normal")}
            className="fixed inset-0 z-50 bg-canvas-dark/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-sheet-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: panelTransition(reduced, false) }}
            transition={panelTransition(reduced, true)}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-surface-card-light shadow-card-hover md:border-l md:border-border-light"
          >
            <div className="flex items-center justify-between border-b border-border-light px-6 py-5 md:px-8">
              <div>
                <p className="text-eyebrow text-text-muted">
                  {t("contact.eyebrow")}
                </p>
                <h2
                  id="quote-sheet-title"
                  className="mt-1 text-h3 text-text-heading-light"
                >
                  {t("contact.headlineLine1")}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("contact.close")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-text-muted interactive-press interactive-colors hover:bg-surface-muted hover:text-text-heading-light"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M3 3L15 15M15 3L3 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {step !== "done" && (
              <div className="border-b border-border-light px-6 py-4 md:px-8">
                <p className="text-eyebrow text-text-muted">
                  {t("contact.stepLabel", {
                    current: visibleStepNum,
                    total: totalSteps,
                  })}
                </p>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1 flex-1 rounded-full interactive-colors",
                        i < visibleStepNum ? "bg-accent-primary" : "bg-border-light",
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={onSubmit}
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div className="relative flex-1 overflow-y-auto px-6 py-8 md:px-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 20, scale: 0.99 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: direction * -20,
                      scale: 0.99,
                      transition: exitTransition(reduced),
                    }}
                    transition={enterTransition(reduced)}
                    className="space-y-6"
                  >
                    {step === "product" && (
                      <>
                        <header>
                          <h3 className="text-h3 text-text-heading-light">
                            {t("contact.steps.product.title")}
                          </h3>
                          <p className="mt-2 text-sm text-text-muted">
                            {t("contact.steps.product.subtitle")}
                          </p>
                        </header>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {productKeys.map((key) => {
                            const selected = form.product === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => update("product", key)}
                                className={cn(
                                  "choice-chip",
                                  selected
                                    ? "choice-chip-selected"
                                    : "choice-chip-default",
                                )}
                              >
                                {t(`contact.steps.product.options.${key}`)}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {step === "volume" && (
                      <>
                        <header>
                          <h3 className="text-h3 text-text-heading-light">
                            {t("contact.steps.volume.title")}
                          </h3>
                          <p className="mt-2 text-sm text-text-muted">
                            {t("contact.steps.volume.subtitle")}
                          </p>
                        </header>
                        <div>
                          <p className="mb-3 text-eyebrow text-text-muted">
                            {t("contact.steps.volume.volumeLabel")}
                          </p>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {volumeKeys.map((key) => {
                              const selected = form.volume === key;
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => update("volume", key)}
                                  className={cn(
                                    "choice-chip",
                                    selected
                                      ? "choice-chip-selected"
                                      : "choice-chip-default",
                                  )}
                                >
                                  {t(`contact.steps.volume.volumeOptions.${key}`)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="material"
                            className="mb-2 block text-eyebrow text-text-muted"
                          >
                            {t("contact.steps.volume.materialLabel")}
                          </label>
                          <input
                            id="material"
                            type="text"
                            value={form.material}
                            onChange={(e) => update("material", e.target.value)}
                            placeholder={t("contact.steps.volume.materialPlaceholder")}
                            className="field-input"
                          />
                        </div>
                      </>
                    )}

                    {step === "contact" && (
                      <>
                        <header>
                          <h3 className="text-h3 text-text-heading-light">
                            {t("contact.steps.contact.title")}
                          </h3>
                          <p className="mt-2 text-sm text-text-muted">
                            {t("contact.steps.contact.subtitle")}
                          </p>
                        </header>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field
                            id="name"
                            label={t("contact.steps.contact.nameLabel")}
                            placeholder={t("contact.steps.contact.namePlaceholder")}
                            value={form.name}
                            onChange={(v) => update("name", v)}
                            required
                          />
                          <Field
                            id="company"
                            label={t("contact.steps.contact.companyLabel")}
                            placeholder={t("contact.steps.contact.companyPlaceholder")}
                            value={form.company}
                            onChange={(v) => update("company", v)}
                            required
                          />
                          <Field
                            id="email"
                            type="email"
                            label={t("contact.steps.contact.emailLabel")}
                            placeholder={t("contact.steps.contact.emailPlaceholder")}
                            value={form.email}
                            onChange={(v) => update("email", v)}
                            required
                          />
                          <Field
                            id="phone"
                            type="tel"
                            label={t("contact.steps.contact.phoneLabel")}
                            placeholder={t("contact.steps.contact.phonePlaceholder")}
                            value={form.phone}
                            onChange={(v) => update("phone", v)}
                          />
                        </div>
                      </>
                    )}

                    {step === "review" && (
                      <>
                        <header>
                          <h3 className="text-h3 text-text-heading-light">
                            {t("contact.steps.review.title")}
                          </h3>
                          <p className="mt-2 text-sm text-text-muted">
                            {t("contact.steps.review.subtitle")}
                          </p>
                        </header>
                        <div className="rounded-md border border-border-light bg-surface-muted p-5">
                          <p className="text-eyebrow text-text-muted">
                            {t("contact.steps.review.summaryHeading")}
                          </p>
                          <dl className="mt-4 space-y-3 text-sm">
                            <SummaryRow
                              label={t("contact.steps.product.title")}
                              value={t(`contact.steps.product.options.${form.product}`)}
                            />
                            <SummaryRow
                              label={t("contact.steps.volume.volumeLabel")}
                              value={t(`contact.steps.volume.volumeOptions.${form.volume}`)}
                            />
                            {form.material && (
                              <SummaryRow
                                label={t("contact.steps.volume.materialLabel")}
                                value={form.material}
                              />
                            )}
                            <SummaryRow label={t("contact.steps.contact.nameLabel")} value={form.name} />
                            <SummaryRow label={t("contact.steps.contact.companyLabel")} value={form.company} />
                            <SummaryRow label={t("contact.steps.contact.emailLabel")} value={form.email} />
                            {form.phone && (
                              <SummaryRow label={t("contact.steps.contact.phoneLabel")} value={form.phone} />
                            )}
                          </dl>
                        </div>
                      </>
                    )}

                    {step === "done" && (
                      <div className="flex flex-col items-center py-8 text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
                          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                            <path
                              d="M6 14L11 19L22 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <h3 className="mt-6 text-section-title text-text-heading-light">
                          {t("contact.steps.done.title")}
                        </h3>
                        <p className="mt-3 max-w-sm text-body-lg text-text-primary-light">
                          {t("contact.steps.done.subtitle")}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-border-light px-6 py-4 md:px-8">
                {step === "done" ? (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full btn-primary"
                  >
                    {t("contact.steps.done.cta")}
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={stepIndex === 0}
                      className="btn-secondary disabled:opacity-40"
                    >
                      {t("contact.back")}
                    </button>
                    {step === "review" ? (
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        {t("contact.submit")}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={!canContinue()}
                        className="btn-primary disabled:opacity-40"
                      >
                        {t("contact.next")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

type FieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
};

function Field({ id, label, placeholder, value, onChange, type = "text", required }: FieldProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 text-eyebrow text-text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-eyebrow text-text-muted">{label}</dt>
      <dd className="text-right text-sm text-text-heading-light">{value}</dd>
    </div>
  );
}
