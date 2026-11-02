import { AppHeader } from "../components/layout/AppHeader";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Notice } from "../components/ui/Notice";
import { useAuth } from "../hooks/useAuth";
import { useMe } from "../hooks/useMe";
import { useSlowFlag } from "../hooks/useSlowFlag";
import { useLanguage } from "../i18n/LanguageContext";
import { errorMessageKey } from "../lib/errors";
import { localizedName } from "../lib/format";

function HomeSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-label={label} className="flex animate-pulse flex-col gap-4">
      <div className="h-10 w-2/3 rounded-lg bg-slate-200" />
      <div className="h-6 w-1/2 rounded-lg bg-slate-200" />
      <div className="h-32 rounded-2xl bg-slate-200" />
    </div>
  );
}

export function HomePage() {
  const { t, language } = useLanguage();
  const { signOut } = useAuth();
  const me = useMe();
  const slow = useSlowFlag(me.isPending);

  return (
    <div className="min-h-dvh bg-slate-100">
      <AppHeader
        actions={
          <Button variant="secondary" onClick={signOut}>
            {t("home.logout.button")}
          </Button>
        }
      />
      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
        {me.isPending ? (
          <>
            <HomeSkeleton label={t("home.loading.label")} />
            {slow ? <Notice>{t("status.slow.message")}</Notice> : null}
          </>
        ) : me.isError ? (
          <Alert
            action={
              <Button variant="secondary" onClick={() => void me.refetch()}>
                {t("error.retry.button")}
              </Button>
            }
          >
            {t(errorMessageKey(me.error))}
          </Alert>
        ) : (
          <>
            <section className="flex flex-col gap-1">
              <h1 className="font-heading text-3xl font-bold text-slate-900">
                {t("home.welcome.heading")}
              </h1>
              <p className="text-2xl font-semibold text-slate-900">{me.data.user.name}</p>
              <p className="text-lg text-slate-700">
                {t("home.shop.label")}: {localizedName(me.data.shop.name_ur, me.data.shop.name_en, language)}
              </p>
              <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-base font-semibold text-blue-800">
                {me.data.user.role === "owner" ? t("home.role.owner") : t("home.role.cashier")}
              </span>
            </section>

            <section className="flex flex-col gap-2 rounded-2xl bg-white p-6 shadow-sm">
              <Button variant="primary" disabled className="min-h-20 text-2xl">
                🧾 {t("home.newBill.button")}
              </Button>
              <p className="text-center text-slate-600">{t("home.newBill.soon")}</p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
