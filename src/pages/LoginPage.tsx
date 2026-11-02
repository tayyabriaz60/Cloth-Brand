import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { AppHeader } from "../components/layout/AppHeader";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Notice } from "../components/ui/Notice";
import { TextField } from "../components/ui/TextField";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useMe";
import { useSlowFlag } from "../hooks/useSlowFlag";
import { useLanguage } from "../i18n/LanguageContext";
import { isTranslationKey } from "../i18n/translate";
import { errorMessageKey } from "../lib/errors";
import { loginFormSchema, type LoginForm } from "../types/auth";

export function LoginPage() {
  const { t } = useLanguage();
  const { token } = useAuth();
  const loginMutation = useLogin();
  const slow = useSlowFlag(loginMutation.isPending);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { username: "", password: "" },
  });

  if (token) return <Navigate to="/" replace />;

  const fieldError = (message: string | undefined) =>
    isTranslationKey(message) ? t(message) : undefined;

  const onSubmit = handleSubmit((form) => {
    if (!loginMutation.isPending) loginMutation.mutate(form);
  });

  return (
    <div className="min-h-dvh bg-slate-100">
      <AppHeader />
      <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-8">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-slate-900">{t("login.title.heading")}</h1>
          <p className="text-slate-600">{t("login.subtitle.text")}</p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm"
        >
          <TextField
            label={t("login.username.label")}
            autoFocus
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            dir="ltr"
            error={fieldError(errors.username?.message)}
            {...register("username")}
          />
          <TextField
            label={t("login.password.label")}
            type="password"
            autoComplete="current-password"
            dir="ltr"
            error={fieldError(errors.password?.message)}
            {...register("password")}
          />

          {loginMutation.isError ? <Alert>{t(errorMessageKey(loginMutation.error))}</Alert> : null}
          {slow ? <Notice>{t("status.slow.message")}</Notice> : null}

          <Button type="submit" variant="confirm" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? t("login.submit.loading") : t("login.submit.button")}
          </Button>
        </form>
      </main>
    </div>
  );
}
