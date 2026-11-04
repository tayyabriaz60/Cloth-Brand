import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useMe } from "../../hooks/useMe";
import { useLanguage } from "../../i18n/LanguageContext";
import { PAGE_BG } from "../../lib/constants";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell() {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const me = useMe();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (me.isPending) {
    return <div className="min-h-dvh" style={{ backgroundColor: PAGE_BG }} />;
  }

  if (me.isError) {
    return (
      <div className="min-h-dvh p-6" style={{ backgroundColor: PAGE_BG }}>
        <Alert
          action={
            <Button variant="secondary" onClick={() => void me.refetch()}>
              {t("error.retry.button")}
            </Button>
          }
        >
          {t("error.server.message")}
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-dvh" style={{ backgroundColor: PAGE_BG }}>
      <TopBar
        me={me.data}
        pathname={location.pathname}
        collapsed={collapsed}
        onToggle={() => {
          setCollapsed((open) => !open);
        }}
        onLogout={signOut}
      />
      <div className="flex">
        <Sidebar role={me.data.user.role} collapsed={collapsed} />
        <main className="min-w-0 flex-1 px-4 py-5 pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>
      <BottomNav role={me.data.user.role} />
    </div>
  );
}
