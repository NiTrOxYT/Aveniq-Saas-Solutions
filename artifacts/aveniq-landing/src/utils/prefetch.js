/**
 * Page prefetch utility — dynamically imports page chunks in the background
 * to remove loading latency when user clicks nav items or buttons.
 */
export const prefetchRoute = (path) => {
    if (typeof window === "undefined")
        return;
    switch (path) {
        case "/about":
            import("@/pages/about").catch(() => { });
            break;
        case "/start-project":
            import("@/pages/start-project").catch(() => { });
            break;
        case "/contact":
            import("@/pages/contact").catch(() => { });
            break;
        case "/ai-automation-development":
            import("@/pages/services/ai-automation-development").catch(() => { });
            break;
        case "/saas-development":
            import("@/pages/services/saas-development").catch(() => { });
            break;
        case "/mobile-app-development":
            import("@/pages/services/mobile-app-development").catch(() => { });
            break;
        case "/custom-software-development":
            import("@/pages/services/custom-software-development").catch(() => { });
            break;
        case "/web-development-company":
            import("@/pages/services/web-development-company").catch(() => { });
            break;
        case "/mvp-development":
            import("@/pages/services/mvp-development").catch(() => { });
            break;
        case "/startup-software-development":
            import("@/pages/services/startup-software-development").catch(() => { });
            break;
        case "/ui-ux-design":
            import("@/pages/services/ui-ux-design").catch(() => { });
            break;
        default:
            break;
    }
};
/**
 * Prefetch all high-priority marketing/service pages asynchronously
 */
export const prefetchAllCoreRoutes = () => {
    if (typeof window === "undefined")
        return;
    const prefetchers = [
        () => import("@/pages/about"),
        () => import("@/pages/start-project"),
        () => import("@/pages/contact"),
        () => import("@/pages/services/saas-development"),
        () => import("@/pages/services/ai-automation-development"),
        () => import("@/pages/services/mobile-app-development"),
        () => import("@/pages/services/custom-software-development"),
        () => import("@/pages/services/web-development-company"),
        () => import("@/pages/services/mvp-development"),
        () => import("@/pages/services/startup-software-development"),
        () => import("@/pages/services/ui-ux-design"),
    ];
    const runPrefetch = () => {
        // Stagger/delay execution to guarantee main thread remains completely idle
        prefetchers.forEach((importer, index) => {
            setTimeout(() => {
                importer().catch(() => { });
            }, 600 + index * 120);
        });
    };
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => runPrefetch());
    }
    else {
        setTimeout(runPrefetch, 2500);
    }
};
