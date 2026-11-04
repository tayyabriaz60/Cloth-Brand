import { useLanguage } from "../i18n/LanguageContext";

export function ComingSoonPage() {
  const { t } = useLanguage();
  return (
    <section className="rounded-xl bg-white p-8 text-center shadow-sm">
      <h2 className="font-heading text-3xl font-bold text-slate-900">{t("soon.title.heading")}</h2>
      <p className="mt-3 text-lg text-slate-600">{t("soon.body.text")}</p>
    </section>
  );
}
