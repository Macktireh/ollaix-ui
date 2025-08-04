import { useTranslation } from "react-i18next";
import { useRegisterSW } from "virtual:pwa-register/react";

export function PWAReloadPrompt() {
  const { t } = useTranslation();

  // check for updates every hour
  const period = 60 * 60 * 1000;

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  return (
    <>
      {needRefresh && (
        <div className="fixed top-[50%] left-[50%] translate-[-50%] z-1 card bg-base-200 w-[90%] sm:w-96 card-sm shadow-2xl border rounded-2xl">
          <div className="card-body">
            <h2 className="card-title">{t("promt.title")}</h2>
            <p>{t("promt.offline.update")}</p>
            <div className="justify-end card-actions">
              {needRefresh && (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => updateServiceWorker(true)}
                >
                  {t("promt.offline.reload")}
                </button>
              )}
              <button className="btn btn-sm btn-ghost" onClick={() => close()}>
                {t("dialog.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration
) {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: "no-store",
      headers: {
        cache: "no-store",
        "cache-control": "no-cache",
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
