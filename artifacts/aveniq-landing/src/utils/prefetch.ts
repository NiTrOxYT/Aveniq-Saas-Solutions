/**
 * Page prefetch utility — dynamically imports page chunks in the background
 * to remove loading latency when user clicks nav items or buttons.
 */
export const prefetchRoute = (path: string) => {
  if (typeof window === "undefined") return;

  switch (path) {
    case "/about":
      import("@/pages/about").catch(() => {});
      break;
    case "/start-project":
      import("@/pages/start-project").catch(() => {});
      break;
    case "/contact":
      import("@/pages/contact").catch(() => {});
      break;
    case "/portfolio":
      import("@/pages/portfolio").catch(() => {});
      break;
    case "/qr-menu":
      import("@/pages/qr-menu").catch(() => {});
      break;
    case "/ai-automation-development":
      import("@/pages/services/ai-automation-development").catch(() => {});
      break;
    case "/saas-development":
      import("@/pages/services/saas-development").catch(() => {});
      break;
    case "/mobile-app-development":
      import("@/pages/services/mobile-app-development").catch(() => {});
      break;
    case "/custom-software-development":
      import("@/pages/services/custom-software-development").catch(() => {});
      break;
    case "/web-development-company":
      import("@/pages/services/web-development-company").catch(() => {});
      break;
    case "/mvp-development":
      import("@/pages/services/mvp-development").catch(() => {});
      break;
    case "/startup-software-development":
      import("@/pages/services/startup-software-development").catch(() => {});
      break;
    case "/ui-ux-design":
      import("@/pages/services/ui-ux-design").catch(() => {});
      break;
    default:
      break;
  }
};

/**
 * Prefetch high-priority pages gently after idle settlement
 */
export const prefetchAllCoreRoutes = () => {
  if (typeof window === "undefined") return;

  const runPrefetch = () => {
    // Only prefetch primary user destinations after initial page load is fully finished
    const primaryPages = [
      () => import("@/pages/about"),
      () => import("@/pages/start-project"),
      () => import("@/pages/contact"),
    ];
    primaryPages.forEach((importer, index) => {
      setTimeout(() => {
        importer().catch(() => {});
      }, 3000 + index * 500);
    });
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => runPrefetch(), { timeout: 4000 });
  } else {
    setTimeout(runPrefetch, 4000);
  }
};
