"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "sp-pwa-install-dismissed";

type PwaInstallContextValue = {
  canInstall: boolean;
  showBanner: boolean;
  showIosHelp: boolean;
  setShowIosHelp: (open: boolean) => void;
  install: () => Promise<void>;
  dismissBanner: () => void;
};

const PwaInstallContext = createContext<PwaInstallContextValue | null>(null);

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function usePwaInstallLogic(): PwaInstallContextValue {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(true);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setBannerDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");

    const onInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setInstalled(false);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    if (!isStandalone()) setInstalled(false);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const canInstall = !installed && (Boolean(deferredPrompt) || isIosDevice());
  const showBanner = canInstall && !bannerDismissed;

  const install = useCallback(async () => {
    if (installed) return;

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return;
    }

    if (isIosDevice()) setShowIosHelp(true);
  }, [deferredPrompt, installed]);

  const dismissBanner = useCallback(() => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setBannerDismissed(true);
  }, []);

  return {
    canInstall,
    showBanner,
    showIosHelp,
    setShowIosHelp,
    install,
    dismissBanner,
  };
}

function usePwaInstall() {
  const ctx = useContext(PwaInstallContext);
  if (!ctx) throw new Error("usePwaInstall must be used within PwaInstallProvider");
  return ctx;
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const value = usePwaInstallLogic();
  return <PwaInstallContext.Provider value={value}>{children}</PwaInstallContext.Provider>;
}

/** Slim banner below navbar — primary placement */
export function InstallPWABanner() {
  const { showBanner, install, dismissBanner, showIosHelp, setShowIosHelp } = usePwaInstall();

  return (
    <>
      {showBanner && (
        <div className="sp-install-banner" role="region" aria-label="Install app">
          <div className="sp-install-banner-inner">
            <div className="sp-install-banner-text">
              <strong>Install Spice Palace</strong>
              <span>Quick access from your home screen</span>
            </div>
            <div className="sp-install-banner-actions">
              <button type="button" className="sp-install-btn" onClick={install}>
                Install
              </button>
              <button type="button" className="sp-install-dismiss" onClick={dismissBanner} aria-label="Dismiss">
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {showIosHelp && (
        <div className="sp-install-modal-overlay" onClick={() => setShowIosHelp(false)} role="presentation">
          <div className="sp-install-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="install-ios-title">
            <button type="button" className="sp-install-modal-close" onClick={() => setShowIosHelp(false)} aria-label="Close">
              ✕
            </button>
            <h3 id="install-ios-title">Install on iPhone</h3>
            <ol className="sp-install-ios-steps">
              <li>Tap the <strong>Share</strong> button in Safari</li>
              <li>Scroll down and tap <strong>Add to Home Screen</strong></li>
              <li>Tap <strong>Add</strong> in the top right</li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer list item fallback */
export function InstallPWAFooterItem() {
  const { canInstall, install } = usePwaInstall();

  if (!canInstall) return null;

  return (
    <li>
      <button type="button" className="sp-install-link sp-install-link-footer" onClick={install}>
        Install App
      </button>
    </li>
  );
}

/** Footer / mobile menu fallback */
export function InstallPWALink({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const { canInstall, install } = usePwaInstall();

  if (!canInstall) return null;

  return (
    <button
      type="button"
      className={className ?? "sp-install-link"}
      onClick={() => {
        install();
        onNavigate?.();
      }}
    >
      Install App
    </button>
  );
}
