import { useLanguage } from "../../i18n/LanguageContext";
import { Button } from "../ui/Button";

export function LanguageToggle() {
  const { t, toggleLanguage } = useLanguage();
  return (
    <Button variant="secondary" onClick={toggleLanguage} aria-label={t("language.toggle.aria")}>
      🌐 {t("language.toggle.label")}
    </Button>
  );
}
